import functools
import json
import logging

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from django.conf import settings

from graphene_subscriptions.consumers import GraphqlSubscriptionConsumer, AttrDict
from graphene_django.settings import graphene_settings

logger = logging.getLogger(__name__)


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
                disposable = result.subscribe(functools.partial(self._send_result, _id))
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
            path('graphql/', CustomGraphqlSubscriptionConsumer),
        ])
    ),
})
