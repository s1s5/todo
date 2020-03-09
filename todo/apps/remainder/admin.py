from django.contrib import admin

from . import models


@admin.register(models.TodoList)
class TodoListAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
