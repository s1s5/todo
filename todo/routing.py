import functools
import json
import logging

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from django.conf import settings

from graphene_subscriptions.consumers import GraphqlSubscriptionConsumer, AttrDict
from graphene_django.settings import graphene_settings


from channels import DEFAULT_CHANNEL_LAYER
from channels.consumer import await_many_dispatch, get_handler_name, StopConsumer
from graphql.execution.executors.asyncio import AsyncioExecutor
from asgiref.sync import async_to_sync

logger = logging.getLogger(__name__)


class AsyncConsumer:
    channel_layer_alias = DEFAULT_CHANNEL_LAYER

    def __init__(self, scope):
        self.scope = scope

    async def __call__(self, receive, send):
        self.base_send = send
        try:
            await await_many_dispatch([receive], self.dispatch)
        except StopConsumer:
            pass

    async def dispatch(self, message):
        handler = getattr(self, get_handler_name(message), None)
        if handler:
            await handler(message)
        else:
            raise ValueError("No handler for message type %s" % message["type"])

    async def send(self, message):
        await self.base_send(message)


from asyncio import Future, get_event_loop, iscoroutine, wait
from asyncio import ensure_future
from promise import Promise
from inspect import isasyncgen
# from graphql.execution.executors.asyncio_utils import asyncgen_to_observable

from asyncio import ensure_future, CancelledError
from rx import AnonymousObservable

def asyncgen_to_observable(asyncgen, loop=None):
    def emit(observer):
        logger.info('observer => %s, %s', observer, loop)
        task = ensure_future(iterate_asyncgen(asyncgen, observer), loop=loop)
        logger.info('observer => %s', task)

        def dispose():
            async def await_task():
                await task

            task.cancel()
            ensure_future(await_task(), loop=loop)

        return dispose

    return AnonymousObservable(emit)


async def iterate_asyncgen(asyncgen, observer):
    try:
        async for item in asyncgen:
            observer.on_next(item)
        observer.on_completed()
    except CancelledError:
        pass
    except Exception as e:
        observer.on_error(e)


class MyAsyncioExecutor(object):
    def __init__(self, loop=None):
        # type: (Optional[_UnixSelectorEventLoop]) -> None
        if loop is None:
            loop = get_event_loop()
        self.loop = loop
        self.futures = []  # type: List[Future]

    def wait_until_finished(self):
        # type: () -> None
        # if there are futures to wait for
        while self.futures:
            # wait for the futures to finish
            futures = self.futures
            self.futures = []
            self.loop.run_until_complete(wait(futures))

    def clean(self):
        self.futures = []

    def execute(self, fn, *args, **kwargs):
        # type: (Callable, *Any, **Any) -> Any
        result = fn(*args, **kwargs)
        logger.info("result=%s", result)
        logger.info("isinstance(result, Future), iscoroutine(result) = %s, %s", isinstance(result, Future), iscoroutine(result))
        logger.info("isasyncgen(result) = %s", isasyncgen(result))
        if isinstance(result, Future) or iscoroutine(result):
            future = ensure_future(result, loop=self.loop)
            self.futures.append(future)
            return Promise.resolve(future)
        elif isasyncgen(result):
            return asyncgen_to_observable(result, loop=self.loop)
        return result


class AsyncWebsocketConsumer(AsyncConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.disposable_list = []

    async def websocket_connect(self, message):
        logger.debug('websocket_connect')
        await super().send({"type": "websocket.accept", "subprotocol": 'graphql-ws'})

    async def websocket_receive(self, message):
        request = json.loads(message["text"])
        logger.debug('websocket_receive %s', request)
        _id = request.get("id")

        if request["type"] == "connection_init":
            return

        elif request["type"] == "start":
            payload = request["payload"]
            context = AttrDict(self.scope)
            logger.debug('websocket_receive payload="%s", context="%s"', payload, context)

            schema = graphene_settings.SCHEMA

            result = schema.execute(
                payload["query"],
                operation_name=payload.get("operationName"),
                variables=payload.get("variables"),
                context=context,
                root=stream,
                allow_subscriptions=True,

                executor=MyAsyncioExecutor(),
            )
            logger.debug('result = "%s", %s', result, hasattr(result, "subscribe"))
            if hasattr(result, "subscribe"):
                logger.debug('subscribing result')
                from rx.core import AnonymousObserver
                def on_next(*args, **kwargs):
                    logger.info('on_next %s, %s', args, kwargs)
                    try:
                        ensure_future(self._send_result(*args, **kwargs))
                    except Exception as e:
                        logger.exception(e)
                    logger.info('sending resulton_next %s, %s', args, kwargs)

                def on_error(*args, **kwargs):
                    logger.info('on_error %s, %s', args, kwargs)
                def on_completed(*args, **kwargs):
                    logger.info('on_completed %s, %s', args, kwargs)
                observer = AnonymousObserver(functools.partial(on_next, _id), on_error, on_completed)
                # disposable = result.subscribe(functools.partial(self._send_result, _id))
                disposable = result.subscribe(observer)
                logger.debug('subscribing disposable => %s', disposable)
                self.disposable_list.append(disposable)
            else:
                self._send_result(_id, result)

        elif request["type"] == "stop":
            pass

    async def _send_result(self, _id, result, *args, **kwargs):
        logger.debug('_send_result: result="%s", args="%s", kwargs="%s"', result, args, kwargs)
        # async_to_sync(self.send)(result)
        await self.send(_id, result)

    async def send(self, _id, result):
        if result.errors:
            for error in result.errors:
                logger.error('subscription error',
                             exc_info=(type(error), error,
                                       error.__traceback__))
        errors = result.errors
        logger.debug('sending result(%s) %s', id(self), result.data)
        # create-subscription-wsに書いてある
    # MessageTypes.GQL_DATA = 'data';
    # MessageTypes.GQL_ERROR = 'error';[{name: '', message: '', originalError: <???>}]
    # MessageTypes.GQL_COMPLETE = 'complete'; payload不要

        await super().send(
            {
                "type": "websocket.send",
                "text": json.dumps(
                    {
                        "id": _id,
                        "type": "data",
                        "payload": {
                            "data": result.data,
                            "errors": list(map(str, errors)) if errors else None,
                        },
                    }
                ),
            }
        )

    async def websocket_disconnect(self, message):
        logger.debug('websocket_disconnect')
        await super().send({"type": "websocket.close", "code": 1000})
        try:
            for disposable in self.disposable_list:
                try:
                    disposable.dispose()
                except Exception as e:
                    logger.exception(e)
            self.disposable_list = []
        except Exception as e:
            logger.exception(e)
        finally:
            raise StopConsumer()


class CustomGraphqlSubscriptionConsumer(GraphqlSubscriptionConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.disposable_list = []

    def websocket_connect(self, message):
        logger.debug('websocket_connect(%s): %s', id(self), message)
        super().websocket_connect(message)

    def websocket_disconnect(self, message):
        logger.debug('websocket_disconnect(%s): %s', id(self), message)
        for disposable in self.disposable_list:
            disposable.dispose()
        self.disposable_list = []
        logger.debug('websocket_disconnect(%s): clear all disposable', id(self))
        super().websocket_disconnect(message)

    def websocket_receive(self, message):
        logger.debug('websocket_receive(%s): %s', id(self), message)

        request = json.loads(message["text"])
        _id = request.get("id")

        if request["type"] == "connection_init":
            return

        elif request["type"] == "start":
            payload = request["payload"]
            context = AttrDict(self.scope)

            schema = graphene_settings.SCHEMA

            result = schema.execute(
                payload["query"],
                operation_name=payload.get("operationName"),
                variables=payload.get("variables"),
                context=context,
                root=stream,
                allow_subscriptions=True,
            )

            if hasattr(result, "subscribe"):
                logger.debug('subscribing result')
                disposable = result.subscribe(functools.partial(self._send_result, _id))
                logger.debug('subscribing disposable => %s', disposable)
                self.disposable_list.append(disposable)
            else:
                self._send_result(_id, result)

        elif request["type"] == "stop":
            pass

    def _send_result(self, _id, result):
        if result.errors:
            for error in result.errors:
                logger.error('subscription error',
                             exc_info=(type(error), error,
                                       error.__traceback__))
        logger.debug('sending result(%s) %s', id(self), result.data)
        return super()._send_result(_id, result)


if settings.DEBUG:
    from graphene_subscriptions.consumers import stream
    stream.subscribe(lambda x: logger.debug('event %s', x.to_dict() if hasattr(x, 'to_dict') else x))


application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter([
            # path('graphql/', CustomGraphqlSubscriptionConsumer),
            path('graphql/', AsyncWebsocketConsumer),
        ])
    ),
})
