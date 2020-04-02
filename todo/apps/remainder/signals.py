from . import models
from django.db.models.signals import post_save
from graphene_django.events import post_save_subscription

post_save.connect(post_save_subscription("todolist"), sender=models.TodoList,
                  dispatch_uid="remainder_todolist_post_save")
post_save.connect(post_save_subscription("todo"), sender=models.Todo, dispatch_uid="remainder_todo_post_save")
