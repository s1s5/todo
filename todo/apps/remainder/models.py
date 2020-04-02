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
    completed = models.BooleanField('達成したらチェックを入れましょう')
    text = models.TextField(help_text='やりたいことを明記してください')

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at', ]


class TodoExtra(models.Model):
    todo = models.OneToOneField(Todo, on_delete=models.CASCADE, related_name="extra")
    description = models.TextField()


# from django.db.models.signals import post_save
# post_save.connect(lambda *args, **kwargs: print("FOO", args, kwargs), sender=TodoList, dispatch_uid="remainder_todolist_post_save")
# post_save.connect(lambda *args, **kwargs: print("HOGE", args, kwargs), sender=Todo, dispatch_uid="remainder_todo_post_save")


# from django.db.models.signals import post_save
# from django.dispatch import receiver

# @receiver(post_save, sender=Todo)
# def my_handler(sender, **kwargs):
#     print("FOO", sender, kwargs)
