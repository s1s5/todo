from graphene_django import DjangoObjectType
import django_filters

from graphene_django.forms import (
    DjangoUpdateModelMutation,
    DjangoCreateModelMutation,
    DjangoDeleteModelMutation
)

from graphene_django.filter import MultipleOrderingFilter

from . import models


class AuthorFilterSet(django_filters.FilterSet):
    class Meta:
        model = models.Author
        fields = {
            'name': ['exact', 'icontains', 'istartswith'],
        }

    order_by = MultipleOrderingFilter(
        fields=(
            ('name', 'name'),
            ('pk', 'pk'),
        )
    )


class AuthorNode(DjangoObjectType):
    class Meta:
        model = models.Author
        fields = ('name', 'book_set')
        filterset_class = AuthorFilterSet


class AuthorCreate(DjangoCreateModelMutation):
    class Meta:
        model = models.Author
        fields = ('name', )


class AuthorUpdate(DjangoUpdateModelMutation):
    class Meta:
        model = models.Author
        fields = ('name', )


class BookFilterSet(django_filters.FilterSet):
    class Meta:
        model = models.Book
        fields = {
            'title': ['exact', 'icontains', 'istartswith'],
            'abstract': ['icontains'],
        }

    order_by = MultipleOrderingFilter(
        fields=(
            ('title', 'title'),
            ('author__name', 'author__name'),
            ('pk', 'pk'),
        )
    )


class BookNode(DjangoObjectType):
    class Meta:
        model = models.Book
        fields = ('title', 'abstract', 'author')


class BookCreate(DjangoCreateModelMutation):
    class Meta:
        model = models.Book
        fields = ('title', 'abstract', 'author')


class BookUpdate(DjangoUpdateModelMutation):
    class Meta:
        model = models.Book
        fields = ('title', 'abstract', 'author')


class BookDelete(DjangoDeleteModelMutation):
    class Meta:
        model = models.Book


class Query(object):
    authors = AuthorNode.Connection()
    books = BookNode.Connection()
    author = AuthorNode.Field()
    book = BookNode.Field()


class Mutation(object):
    author_create = AuthorCreate.Field()
    author_update = AuthorUpdate.Field()
    book_create = BookCreate.Field()
    book_update = BookUpdate.Field()
    book_delete = BookDelete.Field()


class Subscription(object):
    pass
