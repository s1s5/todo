import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model


class UserNode(DjangoObjectType):
    class Meta:
        model = get_user_model()
        fields = ['username']  # これ指定しておかないと全フィールドfetch可能, fieldsかexcludeを使う
        filter_fields = ['username']
        interfaces = (graphene.relay.Node, )


class Query(object):
    user = graphene.Field(UserNode)  # look upさせない


class Mutation(object):
    pass


class Subscription(object):
    pass
