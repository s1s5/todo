from django.db import models


class Author(models.Model):
    name = models.CharField(max_length=255)


class Book(models.Model):
    title = models.CharField(max_length=255)
    abstract = models.TextField()
    author = models.ForeignKey(Author, on_delete=models.PROTECT)
