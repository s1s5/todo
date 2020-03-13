import logging
import collections
import graphene
from graphql_relay import from_global_id
from graphene_django import DjangoObjectType
# from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene_django.filter import DjangoFilterConnectionField
from django_filters import FilterSet, OrderingFilter

from . import models

logger = logging.getLogger(__name__)


class TodoListNode(DjangoObjectType):
    class Meta:
        model = models.TodoList
        filter_fields = {
            'title': ['exact', 'icontains', 'istartswith'],
        }
        interfaces = (graphene.relay.Node, )


class TodoFilterSet(FilterSet):
    # see https://django-filter.readthedocs.io/en/master/guide/usage.html
    class Meta:
        model = models.Todo
        # excludeは使えない？
        # exclude = ['parent']
        fields = {
            'text': ['exact', 'icontains', 'istartswith'],
            'completed': ['exact'],
        }

    order_by = OrderingFilter(
        fields=(
            ('created_at', 'created_at'),
            ('modified_at', 'modified_at'),
        )
    )

    # TODO
    # def filter_queryset(self, queryset):
    #     """
    #     Filter the queryset with the underlying form's `cleaned_data`. You must
    #     call `is_valid()` or `errors` before calling this method.
    #     This method should be overridden if additional filtering needs to be
    #     applied to the queryset before it is cached.
    #     """
    #     for name, value in self.form.cleaned_data.items():
    #         queryset = self.filters[name].filter(queryset, value)
    #         assert isinstance(queryset, models.QuerySet), \
    #             "Expected '%s.%s' to return a QuerySet, but got a %s instead." \
    #             % (type(self).__name__, name, type(queryset).__name__)
    #     return queryset


class TodoNode(DjangoObjectType):
    class Meta:
        model = models.Todo
        interfaces = (graphene.relay.Node, )
        filterset_class = TodoFilterSet


class TodoListCreateMutation(graphene.relay.mutation.ClientIDMutation):
    class Input:
        title = graphene.String(required=True)

    todolist = graphene.Field(TodoListNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, title):
        todolist = models.TodoList.objects.create(title=title, author=info.context.user)
        return TodoListCreateMutation(todolist=todolist)


class TodoListUpdateMutation(graphene.relay.mutation.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        title = graphene.String()

    todolist = graphene.Field(TodoListNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, id, title):
        todolist = models.TodoList.objects.get(pk=from_global_id(id)[1])
        todolist.title = title
        todolist.save()
        return TodoListUpdateMutation(todolist=todolist)


class TodoCreateMutation(graphene.relay.mutation.ClientIDMutation):
    class Input:
        todolist = graphene.ID(required=True)
        text = graphene.String()

    todo = graphene.Field(TodoNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, todolist, text=""):
        todolist = models.TodoList.objects.get(pk=from_global_id(todolist)[1])
        print(info, todolist, text)
        todo = models.Todo.objects.create(parent=todolist, completed=False, text=text)
        return TodoCreateMutation(todo=todo)


class TodoUpdateMutation(graphene.relay.mutation.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        completed = graphene.Boolean()
        text = graphene.String()

    todo = graphene.Field(TodoNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, id, completed=None, text=None):
        todo = models.Todo.objects.get(pk=from_global_id(id)[1])
        if completed is not None:
            todo.completed = completed
        if text is not None:
            todo.text = text
        todo.save()
        return TodoUpdateMutation(todo)


TodoListMutationValueObject = collections.namedtuple("TodoListMutation", ["operation", "todolist", "todo"])


class TodoListMutation(graphene.ObjectType):
    operation = graphene.String()
    todolist = graphene.Field(TodoListNode)
    todo = graphene.Field(TodoNode)


class Query(object):
    todo = graphene.Field(TodoNode)
    todolist = graphene.relay.Node.Field(TodoListNode)
    todolists = DjangoFilterConnectionField(TodoListNode)


class Mutation(object):
    todolist_create = TodoListCreateMutation.Field()
    todolist_update = TodoListUpdateMutation.Field()
    todo_create = TodoCreateMutation.Field()
    todo_update = TodoUpdateMutation.Field()


class Subscription(object):
    todolist_created = graphene.Field(TodoListNode)
    todolist_updated = graphene.Field(TodoListNode)

    todo_created = graphene.Field(TodoNode, parent_id=graphene.ID())
    todo_updated = graphene.Field(TodoNode, parent_id=graphene.ID())
    # todo_updated = graphene.relay.Node.Field(TodoNode, parent_id=graphene.ID())

    todolist_mutation = graphene.Field(TodoListMutation, id=graphene.ID())

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

    def resolve_todo_created(root, info, parent_id):
        from graphene_subscriptions.events import CREATED
        parent_id = int(from_global_id(parent_id)[1])
        return root.filter(
            lambda event: (
                event.operation == CREATED and
                isinstance(event.instance, models.Todo) and
                event.instance.parent_id == parent_id)
        ).map(lambda event: event.instance)

    def resolve_todo_updated(root, info, parent_id):
        from graphene_subscriptions.events import UPDATED
        parent_id = int(from_global_id(parent_id)[1])
        return root.filter(
            lambda event: (
                event.operation == UPDATED and
                isinstance(event.instance, models.Todo) and
                event.instance.parent_id == parent_id)
        ).map(lambda event: event.instance)

    def resolve_todolist_mutation(root, info, id):
        _id = int(from_global_id(id)[1])

        return root.filter(
            lambda event: (
                (isinstance(event.instance, models.TodoList) and event.instance.id == _id) or
                (isinstance(event.instance, models.Todo) and event.instance.parent_id == _id))
        ).map(lambda event: TodoListMutationValueObject(
            operation=event.operation,
            todolist=event.instance if isinstance(event.instance, models.TodoList) else None,
            todo=event.instance if isinstance(event.instance, models.Todo) else None)
        )
