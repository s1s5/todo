import io
import pickle
import logging
import itertools
from base64 import b64encode, b64decode

import django_filters
from django.db.models import Q

from graphql_relay.utils import base64, unbase64
from graphql_relay.connection.connectiontypes import Connection, Edge
from graphene.relay import PageInfo
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.utils import maybe_queryset


logger = logging.getLogger(__name__)


def cursor_to_condition(cursor, order_by):
    try:
        bio = io.BytesIO(b64decode(cursor.encode('utf-8')))
        m = {}
        for order in order_by:
            loaded_order = pickle.load(bio)
            if order != loaded_order:
                return
            value = pickle.load(bio)
            m[loaded_order] = value
        return m
    except Exception as e:
        logger.exception(e)


def instance_to_cursor(obj, order_by):
    bio = io.BytesIO()
    for order in order_by:
        pickle.dump(order, file=bio)
        if order.startswith('-'):
            field = order[1:]
        else:
            field = order
        pickle.dump(getattr(obj, field), file=bio)
    return b64encode(bio.getvalue()).decode('utf-8')


def connection_from_queryset(queryset, args, connection_type,
                             edge_type, pageinfo_type):
    order_by = args['order_by'].split(',')

    connection_type = connection_type
    edge_type = edge_type
    pageinfo_type = pageinfo_type

    args = args or {}

    before = args.get('before')
    after = args.get('after')
    first = args.get('first')
    last = args.get('last')

    next_qs, prev_qs = None, None
    if before:
        cond = cursor_to_condition(before, order_by)
        print(cond)
        if cond:
            sumq, q = None, None
            for order in order_by:
                if order.startswith('-'):
                    field = order[1:]
                    expr = '{}__gt'.format(field)
                else:
                    field = order
                    expr = '{}__lt'.format(field)
                print(field, cond[order])
                if q is None:
                    # queryset = queryset.filter(**{
                    #     expr: cond[order]
                    # })
                    cq = Q(**{expr: cond[order]})
                    q = Q(field=cond[order])
                    sumq = cq
                else:
                    # queryset = queryset.filter(q and Q(**{expr: cond[order]}))
                    cq = q and Q(**{expr: cond[order]})
                    q = q and Q(field=cond[order])
                    sumq = sumq or cq
            queryset = queryset.filter(sumq)

    if after:
        cond = cursor_to_condition(after, order_by)
        if cond:
            for order in order_by:
                if order.startswith('-'):
                    field = '{}__lt'.format(order[1:])
                else:
                    field = '{}__gt'.format(order)
                queryset = queryset.filter(**{
                    field: cond[order]
                })

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
            cursor=instance_to_cursor(node, order_by)
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


class CustomDjangoFilterConnectionField(DjangoFilterConnectionField):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @classmethod
    def resolve_connection(cls, connection, args, iterable):
        try:
            iterable = maybe_queryset(iterable)
            connection = connection_from_queryset(
                iterable, args,
                connection_type=connection,
                edge_type=connection.Edge,
                pageinfo_type=PageInfo)
            # connection.iterable = iterable
            # connection.length = iterable.count()
            return connection
        except Exception as e:
            logger.exception(e)


class CustomOrderingFilter(django_filters.OrderingFilter):
    max_conbination = 3

    def filter(self, qs, value):
        value = sum((y for y in (x.split(',') for x in value) if y), [])
        return super().filter(qs, value)

    def build_choices(self, fields, labels):
        choices = super().build_choices(fields, labels)
        multiple_choices = []
        for i in range(2, min(len(choices) + 1, self.max_conbination)):
            for j in itertools.permutations(choices, i):
                s = set()
                ok = True
                for field, disp in j:
                    if field.startswith('-'):
                        field = field[1:]
                    if field in s:
                        ok = False
                        break
                    s.add(field)

                if ok:
                    multiple_choices.append((
                        ','.join([field for field, _ in j]),
                        ','.join([str(disp) for _, disp in j])))
        print(multiple_choices)
        return choices + multiple_choices
