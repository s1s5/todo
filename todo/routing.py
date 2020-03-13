import logging

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from django.conf import settings

from graphene_subscriptions.consumers import GraphqlSubscriptionConsumer


logger = logging.getLogger(__name__)


class CustomGraphqlSubscriptionConsumer(GraphqlSubscriptionConsumer):
    def _send_result(self, id, result):
        if result.errors:
            for error in result.errors:
                logger.error('subscription error',
                             exc_info=(type(error), error,
                                       error.__traceback__))
        logger.debug('sending result %s', result.data)
        return super()._send_result(id, result)


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
