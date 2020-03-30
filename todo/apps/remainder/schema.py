import logging
import collections
import graphene
from natsort import natsorted

from django import forms


from graphql_relay import from_global_id
from graphene_django import DjangoObjectType, DjangoConnectionField
# from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene_django.filter import DjangoFilterConnectionField
import django_filters
# from django_filters import FilterSet, OrderingFilter
# from graphene_django.forms.mutation import DjangoFormMutation


from . import models
from .connection import CustomDjangoFilterConnectionField, CustomOrderingFilter # , DjangoUpdateModelFormMutation, DjangoFormMutation
from graphene_django.forms.mutation import DjangoUpdateModelFormMutation, DjangoFormMutation

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

@test_dec2
class TodoExtraNode(DjangoObjectType):
    class Meta:
        model = models.TodoExtra
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
        return queryset.select_related('extra')
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

    # def clean_completed(self):
    #     completed = self.cleaned_data.get('completed')
    #     if completed:
    #         raise forms.ValidationError('そんな簡単に達成できません！')
    #     return completed

    # def clean_text(self):
    #     text = self.cleaned_data.get('text')
    #     if text:
    #         raise forms.ValidationError('修正したくありません！')
    #     return text

    def save(self):
        print('TodoUpdateForm >> files => ', self.files)
        super().save()


class TodoUpdateFormMutation(DjangoUpdateModelFormMutation):
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

    def save(self):
        # print("HOGEHOGE")
        # print(dir(self))
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


class TodoListNode(DjangoObjectType):
    class Meta:
        model = models.TodoList
        filter_fields = {
            'title': ['exact', 'icontains', 'istartswith'],
        }
        fields = [
            'title', 'author', 'created_at', 'modified_at',
            # 'todo_set',
        ]
        interfaces = (graphene.relay.Node, )

    # fieldsには書いてもかかなくてもいい
    # ForeignKeyとかで参照されている場合にはこうやって指定しないと駄目
    # なんでかちゃんとリンクしているやつだけfilterされている。。不思議！
    todo_set = CustomDjangoFilterConnectionField(TodoNode)


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
    todo = graphene.Field(TodoNode)  # こっちはアクセスできない
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
    todo_create = TodoCreateMutation.Field()
    todo_update = TodoUpdateMutation.Field()
    todo_update_form = TodoUpdateFormMutation.Field()
    single_file_upload = SingleFileUploadFormMutation.Field()


class AsyncIterable:
    def __init__(self, up_to):
        print('AsyncIterable start!!')
        self.up_to = up_to
        self.counter = 0

    def __aiter__(self):
        return self

    async def __anext__(self):
        data = await self.fetch_data()
        print('AsyncIterable', data)
        if data < self.up_to:
            return data
        else:
            print('AsyncIterable end!!')
            raise StopAsyncIteration

    async def fetch_data(self):
        import asyncio
        await asyncio.sleep(1.)
        self.counter += 1
        return self.counter


def from_aiter(iter, loop):
    import asyncio
    import rx
    import functools
    from rx.core import Disposable

    def on_subscribe(observer, scheduler):
        async def _aio_sub():
            try:
                async for i in iter:
                    observer.on_next(i)
                print("on_completed")
                loop.call_soon(
                    observer.on_completed)
            except Exception as e:
                print("on_error")
                loop.call_soon(
                    functools.partial(observer.on_error, e))

        task = asyncio.ensure_future(_aio_sub(), loop=loop)
        return Disposable(lambda: task.cancel())

    return rx.create(on_subscribe)


def from_aiter2(iter):
    from rx.subjects import Subject
    s = Subject()
    return s


class Subscription(object):
    todolist_created = graphene.Field(TodoListNode)
    todolist_updated = graphene.Field(TodoListNode)

    todo_created = graphene.Field(TodoNode, parent_id=graphene.ID())
    todo_updated = graphene.Field(TodoNode, parent_id=graphene.ID())
    # todo_updated = graphene.relay.Node.Field(TodoNode, parent_id=graphene.ID())

    todolist_mutation = graphene.Field(TodoListMutation, id=graphene.ID())

    count_seconds = graphene.Float(up_to=graphene.Int())

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

    def resolve_count_seconds(root, info, up_to):
        # import asyncio
        # return from_aiter(AsyncIterable(up_to), None)
        from graphql.execution.executors.asyncio_utils import asyncgen_to_observable
        return asyncgen_to_observable(AsyncIterable(up_to))

    # async def resolve_count_seconds(root, info, up_to):
    #     import asyncio
    #     print("!!! count_seconds start !!!")
    #     for i in range(up_to):
    #         print("!!! count_seconds {} !!!".format(i))
    #         yield i
    #         await asyncio.sleep(1.)
    #     yield up_to
    #     print("!!! count_seconds end !!!")
