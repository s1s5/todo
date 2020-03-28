from django.contrib import admin

from . import models


@admin.register(models.TodoList)
class TodoListAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'created_at', 'modified_at')


@admin.register(models.Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ('id', 'parent', 'completed', 'text', 'created_at', 'modified_at')


@admin.register(models.TodoExtra)
class TodoExtraAdmin(admin.ModelAdmin):
    list_display = ('id', 'todo', 'description')
