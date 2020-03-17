import io
import pickle
import logging
import itertools
from base64 import b64encode, b64decode

import django_filters
from django.db.models import Q

# from graphql_relay.utils import base64, unbase64
# from graphql_relay.connection.connectiontypes import Connection, Edge
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


def filter_with_cond(queryset, order_by, cond, flag):
    if not cond:
        return queryset
    sumq, q = None, None
    for order in order_by:
        if order.startswith('-'):
            field = order[1:]
            expr = '{}__{}t'.format(field, flag[0])
        else:
            field = order
            expr = '{}__{}t'.format(field, flag[1])
        # print(field, cond[order])
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
    return queryset.filter(sumq), queryset.exclude(sumq)


def connection_from_queryset(queryset, args, connection_type,
                             edge_type, pageinfo_type):
    if 'order_by' in args:  # TODO: order_byは固定・・・
        order_by = args['order_by'].split(',')
    else:
        assert hasattr(queryset.model._meta, 'ordering'), 'must specify order_by or ordering in models'
        order_by = queryset.model._meta.ordering

    connection_type = connection_type
    edge_type = edge_type
    pageinfo_type = pageinfo_type

    args = args or {}

    before = args.get('before')
    after = args.get('after')
    first = args.get('first')
    last = args.get('last')

    has_next_page, has_previous_page = False, False
    if before:
        cond = cursor_to_condition(before, order_by)
        queryset, qs_qx = filter_with_cond(queryset, order_by, cond, ['g', 'l'])
        has_next_page = qs_qx.exists()

    if after:
        cond = cursor_to_condition(after, order_by)
        queryset, qs_qx = filter_with_cond(queryset, order_by, cond, ['l', 'g'])
        has_previous_page = qs_qx.exists()

    if isinstance(first, int):
        has_next_page = queryset[first:].exists()
        queryset = queryset[:first]

    if isinstance(last, int):
        logger.warning('performance warning queryset.count called')
        index = max(0, queryset.count() - last)
        has_next_page = queryset[:index].exists()
        queryset = queryset[index:]

    edges = [
        edge_type(
            node=node,
            cursor=instance_to_cursor(node, order_by)
        )
        for node in queryset
    ]

    first_edge_cursor = edges[0].cursor if edges else None
    last_edge_cursor = edges[-1].cursor if edges else None

    return connection_type(
        edges=edges,
        page_info=pageinfo_type(
            start_cursor=first_edge_cursor,
            end_cursor=last_edge_cursor,
            has_previous_page=has_previous_page,
            has_next_page=has_next_page,
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
            # TODO: DjangoConnectionFieldでは下記を代入してるけど必要なのか？
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
        # print(multiple_choices)
        return choices + multiple_choices
