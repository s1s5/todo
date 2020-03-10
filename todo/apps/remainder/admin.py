from django.contrib import admin

from . import models


@admin.register(models.TodoList)
class TodoListAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')


@admin.register(models.Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ('id', 'parent', 'completed', 'text')
