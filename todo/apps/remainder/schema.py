import logging
import collections
import graphene
from natsort import natsorted
import asyncio

from django import forms
from django.contrib.auth import get_user_model

from graphql_relay import from_global_id
from graphene_django import DjangoObjectType, DjangoConnectionField
from graphene_django.consumers import ChannelGroupObservable
# from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.events import SubscriptionEvent

import django_filters
# from django_filters import FilterSet, OrderingFilter
# from graphene_django.forms.mutation import DjangoFormMutation
from rx import Observable


from . import models
from .connection import CustomDjangoFilterConnectionField, CustomOrderingFilter # , DjangoUpdateModelFormMutation, DjangoFormMutation
from graphene_django.forms import DjangoUpdateModelMutation, DjangoFormMutation
from graphene_django.forms import DjangoCreateModelMutation, DjangoDeleteModelMutation

# from .mutation import CustomDjangoCreateModelFormMutation, CustomDjangoUpdateModelFormMutation, CustomDjangoDeleteModelFormMutation

from ..accounts.schema import UserNode

# from graphene_file_upload.scalars import Upload
# from graphene_django.forms.converter import convert_form_field


# @convert_form_field.register(forms.FileField)
# @convert_form_field.register(forms.ImageField)
# def convert_form_field_to_upload(field):
#     return Upload(description=field.help_text, required=field.required)


logger = logging.getLogger(__name__)


def injection(func):
    def f(*args, **kwargs):
        print('calling : ', func, args, kwargs)
        return func(*args, **kwargs)
    return f


def decorator(wrapper):
    # これはQueryとかにしかつけられない。。。
    def f(klass):
        print(klass)
        print(klass.__dict__)
        print(graphene.types.utils.yank_fields_from_attrs(klass.__dict__))

        get_resolver_for_type = (
            graphene.utils.get_unbound_function.get_unbound_function(
                graphene.types.typemap.TypeMap.get_resolver_for_type))
        # print(get_resolver_for_type)
        for name, field in graphene.types.utils.yank_fields_from_attrs(klass.__dict__).items():
            # resolver = getattr(klass, "resolve_{}".format(field_name), None)
            # print(klass, name, field.default_value)
            resolver = get_resolver_for_type(None, type('', (klass, graphene.ObjectType), {}),
                                             name, field.default_value)
            setattr(klass, 'resolve_{}'.format(name), wrapper(resolver))
            print(name, field, 'resolver = ', resolver)
        return klass
    return f


def decorator2(wrapper):
    # こっちはDjangoObjectTypeのノードに対するデコレータ
    # loginが必要だったり、権限チェックはこっちか・・
    def f(klass):
        print(klass, DjangoObjectType)
        assert issubclass(klass, DjangoObjectType)
        setattr(klass, 'get_queryset', wrapper(klass.get_queryset))
        return klass
    return f


test_dec = decorator(injection)
test_dec2 = decorator2(injection)


class TodoFilterSet(django_filters.FilterSet):
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

    order_by = CustomOrderingFilter(
        fields=(
            ('created_at', 'created_at'),
            ('modified_at', 'modified_at'),
            ('pk', 'pk'),
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


# pageInfoに追加の情報を入れることができる
# class ConnectionClass(graphene.relay.Connection):
#     extra = graphene.String()
#     class Meta:
#         abstract = True
#     class Edge:
#         def __init__(self, *args, **kwargs):
#             print('ConnectionClass.Edge : ', args, kwargs)
#             super().__init__(*args, **kwargs)
#         other = graphene.String()

from promise import Promise
from promise.dataloader import DataLoader


def article_batch_load_fn(keys):
    queryset = models.TodoExtra.objects.filter(pk__in=keys)
    return Promise.resolve(
        [
            [article for article in queryset if article.reporter_id == id]
            for id in keys
        ]
    )

article_loader = DataLoader(article_batch_load_fn)


@test_dec2
class TodoExtraNode(DjangoObjectType):
    class Meta:
        model = models.TodoExtra
        exclude = ()
        # fields = ['description']
        filter_fields = {
        }
        interfaces = (graphene.relay.Node, )

    @classmethod
    def get_queryset(cls, queryset, info):
        # TodoNode.extraからアクセスするときに呼び出されないのはなぜ・・・？？
        # manyの場合にしかconnectionは張られない・・・
        print("HOGE TodoExtra get_queryset called!!!", queryset, info)
        return super().get_queryset(queryset, info)

    @classmethod
    def get_from_parent(cls, parent, info):
        print("HOGE", parent, info.field_name, dir(parent))
        return getattr(parent, info.field_name, None)


@test_dec2
class TodoNode(DjangoObjectType):
    # on = 'objects' 以外を指定すれば、default_manager以外を使用することができる
    class Meta:
        model = models.Todo
        # fieldsかexcludeを必ず指定
        # fields = ['text']
        exclude = ['parent']
        interfaces = (graphene.relay.Node, )
        filterset_class = TodoFilterSet
        # connection_class = ConnectionClass

    # extra = CustomDjangoFilterConnectionField(TodoExtraNode)

    def resolve_extra(instance, info):
        # 現状ここで権限チェックするしかなさそう
        print('TodoNode.resolve_extra', 'instance =', instance, 'info =', info)
        return getattr(instance, 'extra', None)

    @classmethod
    def get_queryset(cls, queryset, info):
        # print(cls, queryset, info)
        # print('info: ', dir(info))
        # for key in dir(info):
        #     if key.startswith('__'):
        #         continue
        #     if key == 'schema':
        #         continue
        #     print(key, '==>', getattr(info, key))
        # こうしたりしておかないとextraごとにquery発行が行われるが、
        # 必要ないケースにおいてもselect_relatedが呼ばれる。。。

        # info.field_astsから判断する必要がありそう
        # connection経由かそうじゃないかの2パターンだけか？
        # 複数クエリ同時だとどうなる？？
        print("FOO")
        print(info.field_asts)
        print(info.field_asts[0], type(info.field_asts[0]))
        print(dir(info.field_asts[0]))
        # print(queryset.values('id', 'text'))
        # return queryset.select_related('extra')
        return queryset # .select_related('extra')
    # extra = DjangoConnectionField(TodoExtraNode)
    #    extra = DjangoFilterConnectionField(TodoExtraNode)


# 同じモデルは登録しないほうがいい。他のノードからリンクを辿って参照するときに、後のものが使われる
# @test_dec2
# class TodoNode2(DjangoObjectType):
#     # on = 'objects' 以外を指定すれば、default_manager以外を使用することができる
#     class Meta:
#         model = models.Todo
#         # fieldsかexcludeを必ず指定
#         fields = ['text']
#         # exclude = ['parent']
#         interfaces = (graphene.relay.Node, )
#         filterset_class = TodoFilterSet
#         # connection_class = ConnectionClass


class TodoUpdateForm(forms.ModelForm):
    class Meta:
        model = models.Todo
        fields = ('completed', 'text')
        # gid  = forms.CharField()
        # completed = forms.BooleanField(required=False)
        # text = forms.CharField(help_text='ここにtodoの詳細')

    def clean_completed(self):
        completed = self.cleaned_data.get('completed')
        if completed:
            raise forms.ValidationError('そんな簡単に達成できません！')
        return completed

    def clean_text(self):
        text = self.cleaned_data.get('text')
        if text:
            raise forms.ValidationError('修正したくありません！')
        return text

    def save(self):
        print('TodoUpdateForm >> files => ', self.files)
        super().save()


class TodoUpdateFormMutation(DjangoUpdateModelMutation):
    '''
    mutation($input: TodoUpdateFormMutationInput!) {
  todoUpdateForm(input: $input){
    errors{
      field
      messages
    }
todo {
  completed
  text
}
  }
}

---- variables
{
  "input": {
    "id": "VG9kb05vZGU6MQ==",
    "completed": false,
    "text": "todo-001(todolist-001)"
  }
}
    '''
    class Meta:
        form_class = TodoUpdateForm

    # todo = graphene.Field(TodoNode)

    # @classmethod
    # def perform_mutate(cls, form, info):
    #     print('TodoUpdateFormMutation.perform_mutate', cls, form, info)
    #     obj = form.save()
    #     kwargs = {cls._meta.return_field_name: obj}
    #     return cls(errors=[], **kwargs)


class SingleFileUploadForm(forms.Form):
    file = forms.FileField(required=False)

    def clean_file(self):
        print(self.cleaned_data)
        print(self.files)
        print(self.files.getlist('file'))
        return self.cleaned_data['file']

    def save(self):
        # print("HOGEHOGE")
        # print(dir(self))
        print('prefix', self.prefix)
        print('files', self.files)
        print('cleaned_data', self.cleaned_data)

        # 複数ファイルがアップロードされたときの扱い
        # https://stackoverflow.com/questions/11529216/django-multiple-file-field
        file_list = natsorted(
            self.files.getlist('{}-file'.format(self.prefix))
            if self.prefix else
            self.files.getlist('file'),
            key=lambda file: file.name)
        print('=' * 30, len(file_list), '=' * 30)
        for f in file_list:
            # print(f)
            # print(dir(f))
            f.seek(0)
            data = f.read()
            print("name='{}', data='{}', type='{}'".format(f.name, data[:10], f.content_type))
        # print('{}-file'.format(self.prefix))


class SingleFileUploadFormMutation(DjangoFormMutation):
    class Meta:
        form_class = SingleFileUploadForm

    success = graphene.Boolean()

    # @classmethod
    # def get_form_kwargs(cls, root, info, **input):
    #     if info and info.path:
    #         prefix = info.path[0]
    #         kwargs = {
    #             "prefix": prefix,
    #             "data": {'{}-{}'.format(prefix, key): value for key, value in input.items()},
    #         }
    #     else:
    #         kwargs = {
    #             "data": input
    #         }

    #     pk = input.pop("id", None)
    #     if pk:
    #         try:
    #             pk = from_global_id(pk)[1]
    #         except Exception:
    #             raise forms.ValidationError('invalid id format')
    #         instance = cls._meta.model._default_manager.get(pk=pk)
    #         kwargs["instance"] = instance

    #     if info and hasattr(info.context, 'FILES'):
    #         kwargs["files"] = info.context.FILES

    #     return kwargs

    # @classmethod
    # def mutate_and_get_payload(cls, root, info, file=None, **kwargs):
    #     # do something with your file
    #     print("HOGEHOGE")
    #     print(file)  # <= filename
    #     print(info.context.FILES['file'].read())
    #     # print(file.read())
    #     return SingleFileUploadFormMutation(success=True)


# def _resolver(parent, info):
#     print(dir(info))
#     print(info.field_name, info.path)
#     author = getattr(parent, info.field_name)
#     print("_resolver", parent, info)
#     resolve = getattr(info.return_type, 'resolve', None)
#     print("resolve", info.return_type.graphene_type)
#     print(dir(info.return_type.graphene_type))

#     from graphene_django.registry import Registry, get_global_registry
#     registry = get_global_registry()
#     _type = registry.get_type_for_model(model)
#     if resolve:
#         author = resolve(parent, info, author)
#     return author

# from graphene_django.registry import Registry, get_global_registry
# class _DefaultDjangoField(graphene.Field):
#     def __init__(self, _type, *args, **kwargs):
#         self._model = _type._meta.model
#         registry = get_global_registry()
#         self._type = registry.get_type_for_model(self._model)
#         self.__resolve = getattr(self._type, 'resolve', None)
#         super().__init__(_type, *args, resolver=self._resolve, **kwargs)

#     def _resolve(self, parent, info):
#         resolved = getattr(parent, info.field_name, None)
#         if self._resolve:
#             resolved = self.__resolve(parent, info, resolved)
#         return resolved



class TodoListNode(DjangoObjectType):
    class Meta:
        model = models.TodoList
        filter_fields = {
            'title': ['exact', 'icontains', 'istartswith'],
        }
        fields = [
            'title', 'author', 'created_at', 'modified_at',
            'todo_set',
        ]
        interfaces = (graphene.relay.Node, )

    # author = _DefaultDjangoField(UserNode)

    # fieldsには書いてもかかなくてもいい
    # ForeignKeyとかで参照されている場合にはこうやって指定しないと駄目
    # なんでかちゃんとリンクしているやつだけfilterされている。。不思議！
    # todo_set = CustomDjangoFilterConnectionField(TodoNode)


class TodoListCreateMutation(DjangoCreateModelMutation):
    """
mutation{
todolistCreate(input: {title: "hello"}) {
  edge{
      node{
        id
        title
        author {
          id
          username
        }
      }
    }
  }
}
"""

    class Meta:
        model = models.TodoList
        fields = ['title']

    @classmethod
    def perform_mutate(cls, form, info):
        if info.context.user.is_anonymous:
            raise forms.ValidationError('not logged in')
            user = get_user_model().objects.all()[0]
        else:
            user = info.context.user
        form.instance.author = user
        return super().perform_mutate(form, info)


class TodoListUpdateMutation(DjangoUpdateModelMutation):
    """
mutation{
  todolistUpdate(input: {id: "VG9kb0xpc3ROb2RlOjc=", title: "hello2"}){
    node {
      id
      title
      author{
        id
        username
      }
    }
  }
}
"""
    class Meta:
        model = models.TodoList
        fields = ['title']


class TodoListDeleteMutation(DjangoDeleteModelMutation):
    """
mutation{
  todolistDelete(input: {id: "VG9kb0xpc3ROb2RlOjc="}) {
    deletedId
  }
}
"""
    class Meta:
        model = models.TodoList


TodoEdge = TodoNode._meta.connection.Edge


class TodoCreateMutation(graphene.relay.mutation.ClientIDMutation):
    class Input:
        todolist = graphene.ID(required=True)
        text = graphene.String()

    todo = graphene.Field(TodoNode)
    edge = graphene.Field(CustomDjangoFilterConnectionField(TodoNode).type.Edge)  # TodoEdge

    @classmethod
    def mutate_and_get_payload(cls, root, info, todolist, text=""):
        todolist = models.TodoList.objects.get(pk=from_global_id(todolist)[1])
        print(info, todolist, text)
        todo = models.Todo.objects.create(parent=todolist, completed=False, text=text)
        if not text:
            todo.text = 'todo({})'.format(todo.pk)
            todo.save()

        connection_type = CustomDjangoFilterConnectionField(TodoNode).type
        edge_type = connection_type.Edge
        print(connection_type, edge_type, todo)
        # return TodoCreateMutation(todo=todo, todoEdge=connection_type([
        #     edge_type(node=todo),
        # ]))
        # return TodoCreateMutation(todo=todo, todoSet=models.Todo.objects.filter(pk=todo.pk))
        return TodoCreateMutation(todo=todo, edge=edge_type(node=todo, cursor=""))


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


class TodoDeleteMutation(graphene.relay.mutation.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)

    # id = graphene.ID()  # 名前被りするからidはつかっちゃだめ
    deleted_todo_id = graphene.ID()

    @classmethod
    def mutate_and_get_payload(cls, root, info, id):
        todo = models.Todo.objects.get(pk=from_global_id(id)[1])
        todo.delete()
        return TodoDeleteMutation(deleted_todo_id=id)


TodoListMutationValueObject = collections.namedtuple("TodoListMutation", ["operation", "todolist", "todo"])


class TodoListMutation(graphene.ObjectType):
    operation = graphene.String()
    todolist = graphene.Field(TodoListNode)
    todo = graphene.Field(TodoNode)


class Query(object):
    todo = graphene.Field(TodoNode)  # こっちはアクセスできない、そもそもいれなければいいだけ？
    todo2 = graphene.relay.Node.Field(TodoNode)  # こっちはglobal_idで引ける
    # todoextra = graphene.Field(TodoExtraNode)
    todolist = graphene.relay.Node.Field(TodoListNode)
    todolists = DjangoFilterConnectionField(TodoListNode)
    todos = CustomDjangoFilterConnectionField(TodoNode,
                                              filterset_class=TodoFilterSet)

    # def resolve_todos(root, info, parent_id, *args, **kwargs):
    #     return models.Todo.objects.filter(parent_id=parent_id)


class Mutation(object):
    todolist_create = TodoListCreateMutation.Field()
    todolist_update = TodoListUpdateMutation.Field()
    todolist_delete = TodoListDeleteMutation.Field()
    todo_create = TodoCreateMutation.Field()
    todo_update = TodoUpdateMutation.Field()
    todo_update_form = TodoUpdateFormMutation.Field()
    single_file_upload = SingleFileUploadFormMutation.Field()

    todo_delete = TodoDeleteMutation.Field()


class Subscription(object):
    todolist_created = graphene.Field(TodoListNode)
    todolist_updated = graphene.Field(TodoListNode)

    todo_created = graphene.Field(TodoNode, parent_id=graphene.ID())
    todo_updated = graphene.Field(TodoNode, parent_id=graphene.ID())
    # todo_updated = graphene.relay.Node.Field(TodoNode, parent_id=graphene.ID())

    todolist_mutation = graphene.Field(TodoListMutation, id=graphene.ID())

    # count_seconds = graphene.Float(up_to=graphene.Int())

    def resolve_todolist_created(root, info):
        return ChannelGroupObservable('todolist').map(
            lambda event: SubscriptionEvent.from_dict(event)
        ).filter(
            lambda event:
            event.created and
            isinstance(event.instance, models.TodoList)
        ).map(lambda event: event.instance)

    def resolve_todolist_updated(root, info):
        return ChannelGroupObservable('todolist').map(
            lambda event: SubscriptionEvent.from_dict(event)
        ).filter(
            lambda event:
                (not event.created) and
                isinstance(event.instance, models.TodoList)
        ).map(lambda event: event.instance)

    def resolve_todo_created(root, info, parent_id):
        logger.info("resolve_todo_created called")
        parent_id = int(from_global_id(parent_id)[1])
        return ChannelGroupObservable('todo').map(
            lambda event: SubscriptionEvent.from_dict(event)
        ).filter(
            lambda event: (
                event.created and
                isinstance(event.instance, models.Todo) and
                event.instance.parent_id == parent_id)
        ).map(lambda event: event.instance)

    def resolve_todo_updated(root, info, parent_id):
        logger.info("resolve_todo_updated called")
        logger.info("root=%s, info=%s, parent_id=%s", root, info, parent_id)
        # print(dir(info))
        # print(info.path)
        # print(info.context)
        # for key in dir(info.context):
        #     print(key, '=>', getattr(info.context, key))
        # print(info.context.data['session'])
        # print(info.context.data['user'])
        # user = info.context.data['user']
        # print(user.is_authenticated)

        parent_id = int(from_global_id(parent_id)[1])
        return ChannelGroupObservable('todo').map(
            lambda event: SubscriptionEvent.from_dict(event)
        ).filter(
            lambda event: (
                (not event.created) and
                isinstance(event.instance, models.Todo) and
                event.instance.parent_id == parent_id)
        ).map(lambda event: event.instance)

    def resolve_todolist_mutation(root, info, id):
        _id = int(from_global_id(id)[1])
        observable = Observable.merge(
            ChannelGroupObservable('todolist'),
            ChannelGroupObservable('todo'))
        return observable.map(
            lambda event: SubscriptionEvent.from_dict(event)
        ).filter(
            lambda event: (
                (isinstance(event.instance, models.TodoList) and event.instance.id == _id) or
                (isinstance(event.instance, models.Todo) and event.instance.parent_id == _id))
        ).map(lambda event: TodoListMutationValueObject(
            operation=event.operation,
            todolist=event.instance if isinstance(event.instance, models.TodoList) else None,
            todo=event.instance if isinstance(event.instance, models.Todo) else None)
        )

    # def resolve_count_seconds(root, info, up_to):
    #     # import asyncio
    #     # return from_aiter(AsyncIterable(up_to), None)
    #     # from graphql.execution.executors.asyncio_utils import asyncgen_to_observable
    #     # return asyncgen_to_observable(AsyncIterable(up_to))
    #     # return AsyncIterable(up_to)
    #     # return async_to_observable(AsyncIterable(up_to))
    #     import time
    #     return ChannelGroupObservable('custom-group').map(lambda event: time.time())

    # async def resolve_count_seconds(root, info, up_to):
    #     import asyncio
    #     logger.info("!!! count_seconds start !!!")
    #     for i in range(up_to):
    #         logger.info("!!! count_seconds {} !!!".format(i))
    #         yield i
    #         await asyncio.sleep(1.)
    #     yield up_to
    #     logger.info("!!! count_seconds end !!!")
