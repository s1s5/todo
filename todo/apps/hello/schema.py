import logging
import asyncio

import graphene
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from graphene_django.consumers import ChannelGroupObservable

logger = logging.getLogger(__name__)


class InfoType(graphene.ObjectType):
    version = graphene.String()
    module_name = graphene.String()


class StaticDataType(graphene.ObjectType):
    name = graphene.String()
    bytes = graphene.Int()


class Query(object):
    info = graphene.Field(InfoType)
    some_static_datas = graphene.List(StaticDataType)

    def resolve_info(root, info):
        return InfoType(version="0.0.0", module_name="todo.apps.hello")

    def resolve_some_static_datas(root, info):
        return [
            StaticDataType(name="data1", bytes=1),
            StaticDataType(name="data2", bytes=2),
        ]


class Mutation(object):
    do_echo = graphene.Boolean(message=graphene.String())
    raise_exception = graphene.Boolean()

    def resolve_do_echo(root, info, message):
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)('hello-echo', {'message': message})
        return True

    def resolve_raise_exception(root, info):
        raise Exception('exception here!')


class Subscription(object):
    echo = graphene.String()
    count_seconds = graphene.Int(up_to=graphene.Int())
    some_heavy_operation = graphene.String()

    def resolve_echo(root, info):
        return ChannelGroupObservable('hello-echo').map(lambda event: event['message'])

    def resolve_count_seconds(root, info, up_to):
        class AsyncIterable:
            def __init__(self, up_to):
                logger.debug('AsyncIterable start!!')
                self.up_to = up_to
                self.counter = -1

            def __aiter__(self):
                logger.debug('AsyncIterable.__aiter__ iteration started!!!!!')
                return self

            def __del__(self):
                logger.debug('AsyncIterable deleted!!!!!')

            async def __anext__(self):
                data = await self.fetch_data()
                logger.debug('AsyncIterable %s', data)
                if data < self.up_to:
                    return data
                else:
                    logger.debug('AsyncIterable end!!')
                    raise StopAsyncIteration

            async def fetch_data(self):
                await asyncio.sleep(1)
                self.counter += 1
                return self.counter

            def start(self):
                logger.debug('AsynIterable.start() called!!!')

            def end(self):
                logger.debug('AsynIterable.end() called!!!')

        return AsyncIterable(up_to)

    async def resolve_some_heavy_operation(root, info):
        yield "start initialize"
        await asyncio.sleep(1)
        yield "end initialize"
        await asyncio.sleep(1)

        yield "start do something"
        await asyncio.sleep(1)
        yield "end do something"
        await asyncio.sleep(1)

        yield "finished"
