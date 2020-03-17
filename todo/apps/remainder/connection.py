import logging
import django_filters

from graphql_relay.utils import base64, unbase64
from graphql_relay.connection.connectiontypes import Connection, Edge
from graphene.relay import PageInfo
from graphene_django.utils import maybe_queryset


logger = logging.getLogger(__name__)


def connection_from_queryset(queryset, args=None, connection_type=None,
                             edge_type=None, pageinfo_type=None):
    print("connection_from_queryset")
    PREFIX = 'connection_from_queryset:'

    def cursor_to_pk(cursor):
        try:
            return int(unbase64(cursor)[len(PREFIX):])
        except TypeError:
            return 0

    def pk_to_cursor(pk):
        return base64(PREFIX + str(pk))

    connection_type = connection_type or Connection
    edge_type = edge_type or Edge
    pageinfo_type = pageinfo_type or PageInfo

    args = args or {}

    before = args.get('before')
    after = args.get('after')
    first = args.get('first')
    last = args.get('last')

    next_qs, prev_qs = None, None
    if before:
        pk = cursor_to_pk(before)
        if pk:
            before_qs = queryset.filter(pk__lte=pk)
            queryset = queryset.filter(pk__gt=pk)

    if after:
        pk = cursor_to_pk(after)
        if pk:
            after_qs = queryset.filter(pk__gte=pk)
            queryset = queryset.filter(pk__lt=pk)
    print("HOGE")
    print(queryset)
    if isinstance(first, int):
        
        queryset = queryset[:first]

    if isinstance(last, int):
        logger.warning('performance warning queryset.count called')
        queryset = queryset[max(0, queryset.count() - last):]

    edges = [
        edge_type(
            node=node,
            cursor=pk_to_cursor(node.pk)
        )
        for node in queryset
    ]

    first_edge_cursor = edges[0].cursor if edges else None
    last_edge_cursor = edges[-1].cursor if edges else None
    # lower_bound = after_offset + 1 if after else 0
    # upper_bound = before_offset if before else list_length

    return connection_type(
        edges=edges,
        page_info=pageinfo_type(
            start_cursor=first_edge_cursor,
            end_cursor=last_edge_cursor,
            has_previous_page=False,  # TODO
            has_next_page=False,
        )
    )


class CustomDjangoFilterConnectionField(django_filters.DjangoFilterConnectionField):
    def __init__(self, order_by=[], *args, **kwargs):
        super().__init__(*args, **kwargs)

    @classmethod
    def resolve_connection(cls, connection, args, iterable):
        print("HOGE!", iterable[:3])
        iterable = maybe_queryset(iterable)
        connection = connection_from_queryset(
            iterable, args,
            connection_type=connection,
            edge_type=connection.Edge,
            pageinfo_type=PageInfo)
        # connection.iterable = iterable
        # connection.length = iterable.count()
        return connection
