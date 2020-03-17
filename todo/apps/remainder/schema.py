import logging
import collections
import graphene
from graphql_relay import from_global_id
from graphene_django import DjangoObjectType, DjangoConnectionField
# from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene_django.filter import DjangoFilterConnectionField
import django_filters
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
    parent_id = django_filters.CharFilter(method='filter_with_parent_id')
    class Meta:
        model = models.Todo
        # excludeは使えない？ <- Nodeに書く
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

    def filter_with_parent_id(self, queryset, name, value):
        parent_id = int(from_global_id(value)[1])
        return queryset.filter(parent_id=parent_id)

    def filter_queryset(self, queryset):
        """
        Filter the queryset with the underlying form s `cleaned_data`. You must
        call `is_valid()` or `errors` before calling this method.
        This method should be overridden if additional filtering needs to be
        applied to the queryset before it is cached.
        """
        # use self.request.user or something
        return super().filter_queryset(queryset)



from graphql_relay.utils import base64, unbase64, is_str
from graphql_relay.connection.connectiontypes import Connection, PageInfo, Edge


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


from django.db.models.query import QuerySet
from graphene_django.utils import maybe_queryset
from graphene.relay import PageInfo

def resolve_connection(connection, args, iterable):
    print("HOGEE")
    try:
        iterable = maybe_queryset(iterable)
        print(iterable)
        print(dir(iterable))
        print(iterable.order_by())
        print(args)
        print("FOOO")
        connection = connection_from_queryset(
            iterable, args,
            connection_type=connection,
            edge_type=connection.Edge,
            pageinfo_type=PageInfo)
        return connection
    except Exception:
        print("error...")
        logger.exception('resolve_connection failed')


DjangoConnectionField.resolve_connection = resolve_connection


class FilterMixin(object):
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


class CustomDjangoFilterConnectionField(FilterMixin, DjangoFilterConnectionField):
    pass



class ConnectionClass(graphene.relay.Connection):
    extra = graphene.String()

    class Meta:
        abstract = True

    class Edge:
        def __init__(self, *args, **kwargs):
            print('ConnectionClass.Edge : ', args, kwargs)
            super().__init__(*args, **kwargs)
        other = graphene.String()


class TodoNode(DjangoObjectType):
    class Meta:
        model = models.Todo
        exclude = ['parent']
        interfaces = (graphene.relay.Node, )
        filterset_class = TodoFilterSet
        connection_class = ConnectionClass


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
    todos = CustomDjangoFilterConnectionField(TodoNode,
                                              filterset_class=TodoFilterSet)

    # def resolve_todos(root, info, parent_id, *args, **kwargs):
    #     return models.Todo.objects.filter(parent_id=parent_id)


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
