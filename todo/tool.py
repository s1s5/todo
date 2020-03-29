import functools
import asyncio
from asgiref.sync import async_to_sync
from channels import DEFAULT_CHANNEL_LAYER
from channels.layers import get_channel_layer
from channels.utils import await_many_dispatch


async def _get_new_channel(channel_layer_alias=DEFAULT_CHANNEL_LAYER):
    channel_layer = get_channel_layer(channel_layer_alias)
    return await channel_layer.new_channel()


def get_new_channel():
    return async_to_sync(_get_new_channel)()


async def _dispatch(message):
    print('@_dispatch', message)


async def _echo_server(group_name, callback=_dispatch, channel_layer_alias=DEFAULT_CHANNEL_LAYER):
    channel_layer = get_channel_layer(channel_layer_alias)
    channel_name = await channel_layer.new_channel()
    # add new channel to test group
    await channel_layer.group_add(group_name, channel_name)
    channel_receive = functools.partial(
        channel_layer.receive, channel_name
    )
    await await_many_dispatch(
        [channel_receive], callback
    )


class EchoServer(object):
    message_counter = -1

    def __init__(self, group_name):
        self.group_name = group_name
        self.channel_layer_alias = DEFAULT_CHANNEL_LAYER

    async def init_and_run(self):
        self.channel_layer = get_channel_layer(self.channel_layer_alias)
        self.channel_name = await self.channel_layer.new_channel()
        # add new channel to test group
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        channel_receive = functools.partial(
            self.channel_layer.receive, self.channel_name
        )
        await await_many_dispatch(
            [channel_receive], self.dispatch,
        )

    async def stop(self):
        raise asyncio.CancelledError

    async def dispatch(self, message):
        self.message_counter += 1
        print('@dispatch {} [{}]'.format(self.message_counter, message))
        if self.message_counter > 100:
            await self.channel_layer.group_discard(self.group_name, self.channel_name)
            await self.stop()

    def run(self):
        try:
            async_to_sync(self.init_and_run)()
        except asyncio.CancelledError:
            print("exit successfully??")


def send_message(group_name, channel_layer_alias=DEFAULT_CHANNEL_LAYER):
    channel_layer = get_channel_layer(channel_layer_alias)
    async_to_sync(channel_layer.group_send)(group_name, {"type": "signal.fired", "event": {'data': 'hello world!'}})


'''
$ docker exec -t -i todo_app_1 python manage.py shell
>>> from todo import tool
>>> tool.EchoServer().run("test2")

$ docker exec -t -i todo_app_1 python manage.py shell
>>> from todo import tool
>>> for i in range(100):
...   tool.send_message("test2")

'''
