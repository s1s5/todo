from django.apps import AppConfig


class RemainderConfig(AppConfig):
    name = 'todo.apps.remainder'

    def ready(self):
        from . import signals  # NOQA
        from . import schema  # NOQA
