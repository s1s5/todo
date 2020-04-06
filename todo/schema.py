import graphene
from graphene_django.debug import DjangoDebug

from todo.apps.accounts import schema as accounts_schema
from todo.apps.hello import schema as hello_schema
from todo.apps.shelf import schema as shelf_schema
from todo.apps.remainder import schema as remainder_schema


class Query(remainder_schema.Query, hello_schema.Query, shelf_schema.Query, accounts_schema.Query, graphene.ObjectType):
    '''
    _debug {
        sql {
            rawSql
            duration
        }
    }
    '''
    debug = graphene.Field(DjangoDebug, name='_debug')


class Mutation(remainder_schema.Mutation, hello_schema.Mutation, shelf_schema.Mutation,
               accounts_schema.Mutation, graphene.ObjectType):
    pass


class Subscription(remainder_schema.Subscription, hello_schema.Subscription,
                   shelf_schema.Subscription,
                   accounts_schema.Subscription, graphene.ObjectType):
    pass


schema = graphene.Schema(
    query=Query,
    mutation=Mutation,
    subscription=Subscription
)
