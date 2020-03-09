import graphene
from graphql_relay import from_global_id
from graphene_django import DjangoObjectType
# from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene_django.filter import DjangoFilterConnectionField

from . import models


class TodoListNode(DjangoObjectType):
    class Meta:
        model = models.TodoList
        filter_fields = {
            'title': ['exact', 'icontains', 'istartswith'],
        }
        interfaces = (graphene.relay.Node, )


class TodoListCreateMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)

    todolist = graphene.Field(TodoListNode)

    def mutate(self, info, title):
        todolist = models.TodoList.objects.create(title=title, author=info.context.user)
        return TodoListCreateMutation(todolist=todolist)


class TodoListUpdateMutation(graphene.relay.mutation.ClientIDMutation):
    class Input:
        id = graphene.ID()
        title = graphene.String()

    todolist = graphene.Field(TodoListNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, id, title):
        todolist = models.TodoList.objects.get(pk=from_global_id(id)[1])
        todolist.title = title
        todolist.save()
        return TodoListUpdateMutation(todolist=todolist)


class Query(object):
    todolist = graphene.relay.Node.Field(TodoListNode)
    todolists = DjangoFilterConnectionField(TodoListNode)


class Mutation(object):
    todolist_create = TodoListCreateMutation.Field()
    todolist_update = TodoListUpdateMutation.Field()


class Subscription(object):
    todolist_created = graphene.Field(TodoListNode)
    todolist_updated = graphene.Field(TodoListNode)

    def resolve_todolist_created(root, info):
        from graphene_subscriptions.events import CREATED
        return root.filter(
            lambda event:
                event.operation == CREATED and
                isinstance(event.instance, models.TodoList)
        ).map(lambda event: event.instance)

    def resolve_todolist_updated(root, info):
        from graphene_subscriptions.events import UPDATED
        return root.filter(
            lambda event:
                event.operation == UPDATED and
                isinstance(event.instance, models.TodoList)
        ).map(lambda event: event.instance)
