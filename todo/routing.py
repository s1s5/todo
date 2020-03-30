from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path

from graphene_django.consumers import AsyncWebsocketConsumer


application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path('graphql/', AsyncWebsocketConsumer),
        ])
    ),
})
