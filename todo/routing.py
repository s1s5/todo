from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path

from graphene_django.consumers import AsyncWebsocketConsumer

# import logging
# import json
# import six
# from graphene_django.settings import graphene_settings


# class AttrDict:
#     def __init__(self, data):
#         self.data = data or {}

#     def __getattr__(self, item):
#         return self.get(item)

#     def get(self, item):
#         return self.data.get(item)


# logger = logging.getLogger(__name__)


# class MyAsyncWebsocketConsumer(AsyncWebsocketConsumer):
#     async def websocket_receive(self, message):
#         logger.debug('websocket_receive %s', message)
#         request = json.loads(message["text"])
#         _id = request.get("id")

#         if request["type"] == "connection_init":
#             return

#         elif request["type"] == "start":
#             payload = request["payload"]
#             context = AttrDict(self.scope)

#             schema = graphene_settings.SCHEMA

#             result = schema.execute(
#                 payload["query"],
#                 operation_name=payload.get("operationName"),
#                 variables=payload.get("variables"),
#                 context=context,
#                 root=None,
#                 allow_subscriptions=True,

#                 executor=AsyncWebsocketConsumer.Executor(),
#                 # return_promise=True,
#             )

#             logger.debug('result %s, %s', result, hasattr(result, "subscribe"))
#             if hasattr(result, "subscribe"):
#                 observer = AsyncWebsocketConsumer.Observer(self._send, _id)
#                 disposable = result.subscribe(observer)
#                 self.disposable_list.append(disposable)
#             else:
#                 result.then(
#                     lambda result: self._send(_id, 'data', dict(
#                         data=result.data,
#                         errors=[six.text_type(x) for x in result.errors],
#                         extensions=result.extensions))
#                 ).catch(
#                     lambda error: logger.error('error : %s', error)
#                 )

#         elif request["type"] == "stop":
#             pass


application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path('graphql/', AsyncWebsocketConsumer),
        ])
    ),
})
