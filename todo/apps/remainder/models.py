from django.db import models
from django.conf import settings


class TodoList(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at', ]


class Todo(models.Model):
    parent = models.ForeignKey(TodoList, on_delete=models.PROTECT)
    completed = models.BooleanField()
    text = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at', ]
