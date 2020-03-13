import logging

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path

from graphene_subscriptions.consumers import GraphqlSubscriptionConsumer


logger = logging.getLogger(__name__)


class CustomGraphqlSubscriptionConsumer(GraphqlSubscriptionConsumer):
    def _send_result(self, id, result):
        if result.errors:
            for error in result.errors:
                logger.error('subscription error',
                             exc_info=(type(error), error,
                                       error.__traceback__))
        logger.debug('sending result %s', result)
        return super()._send_result(id, result)


application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path('graphql/', CustomGraphqlSubscriptionConsumer),
        ])
    ),
})
