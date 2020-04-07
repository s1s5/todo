import graphene
from graphene_django.utils import merge_schema

# from django.conf import settings

from todo.apps.accounts import schema as accounts_schema
from todo.apps.hello import schema as hello_schema
from todo.apps.shelf import schema as shelf_schema
from todo.apps.remainder import schema as remainder_schema


# def check_attrs_override(types):
#     keys = set()
#     for t in types:
#         k = set(x for x in dir(t) if not (
#             x.startswith('__') and x.endswith('__')))
#         if keys & k:
#             raise Exception('{} found same key'.format(keys & k))
#         keys.update(k)


# def merge_schema(*schemas):
#     queries, mutations, subscriptions = [], [], []
#     for schema in schemas:
#         queries.append(getattr(schema, 'Query', None))
#         mutations.append(getattr(schema, 'Mutation', None))
#         subscriptions.append(getattr(schema, 'Subscription', None))
#     queries = [x for x in queries if x] + [graphene.ObjectType]
#     mutations = [x for x in mutations if x] + [graphene.ObjectType]
#     subscriptions = [x for x in subscriptions if x] + [graphene.ObjectType]

#     check_attrs_override(queries[:-1])
#     check_attrs_override(mutations[:-1])
#     check_attrs_override(subscriptions[:-1])

#     query_attrs = {}

#     if settings.DEBUG:
#         query_attrs['debug'] = graphene.Field(DjangoDebug, name='_debug')

#     return (
#         type('Query', tuple(queries), query_attrs),
#         type('Mutation', tuple(mutations), {}),
#         type('Subscription', tuple(subscriptions), {}),
#     )


# class Query(remainder_schema.Query, hello_schema.Query, shelf_schema.Query, accounts_schema.Query, graphene.ObjectType):
#     '''
#     _debug {
#         sql {
#             rawSql
#             duration
#         }
#     }
#     '''
#     debug = graphene.Field(DjangoDebug, name='_debug')


# class Mutation(remainder_schema.Mutation, hello_schema.Mutation, shelf_schema.Mutation,
#                accounts_schema.Mutation, graphene.ObjectType):
#     pass


# class Subscription(remainder_schema.Subscription, hello_schema.Subscription,
#                    shelf_schema.Subscription,
#                    accounts_schema.Subscription, graphene.ObjectType):
#     pass

Query, Mutation, Subscription = merge_schema(remainder_schema, hello_schema, shelf_schema, accounts_schema)


schema = graphene.Schema(
    query=Query,
    mutation=Mutation,
    subscription=Subscription
)
