"""todo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path
from django.views import generic

from graphene_django.views import GraphQLView
# from graphene_file_upload.django import FileUploadGraphQLView as GraphQLView

urlpatterns = [
    path('admin/', admin.site.urls),
]


if settings.DEBUG:
    import logging
    logger = logging.getLogger(__name__)

    class LoggingGraphQLView(GraphQLView):
        def get_response(self, request, data, show_graphiql=False):
            logger.debug('query=%s, variables=%s, operation_name=%s, id=%s',
                         *self.get_graphql_params(request, data))
            return super().get_response(request, data, show_graphiql)

        # @staticmethod
        # def format_error(error):

        #     import six
        #     from graphql.error import format_error as format_graphql_error
        #     from graphql.error import GraphQLError

        #     if isinstance(error, GraphQLError):
        #         base = format_graphql_error(error)
        #         if getattr(error, 'original_error', None):
        #             oe = error.original_error

        #             def get_error_dict(m):
        #                 d = dict(**base)
        #                 d['message'] = six.text_type(m)
        #                 return d

        #             if hasattr(oe, '__iter__'):
        #                 return [get_error_dict(x) for x in oe]
        #             if getattr(oe, 'error_list', None):
        #                 logger.debug("BAR")
        #                 return [get_error_dict(x) for x in oe.error_list]
        #         return [base]
        #     return [{"message": six.text_type(error)}]

    from django.views.decorators.csrf import csrf_exempt
    urlpatterns += [
        path('graphql/', csrf_exempt(LoggingGraphQLView.as_view(graphiql=settings.DEBUG))),
    ]
else:
    # TODO: どうするのがいいのか・・・
    urlpatterns += [
        path('graphql/', GraphQLView.as_view(graphiql=settings.DEBUG)),
    ]


if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        path(r'__debug__/', include(debug_toolbar.urls)),
    ]

urlpatterns += [
    url('', generic.TemplateView.as_view(template_name='index.html'), name='index'),
]
