"""
Django settings for todo project.

Generated by 'django-admin startproject' using Django 3.0.4.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os
import datetime
import environ

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_DIR = os.path.dirname(__file__)
PROJECT_NAME = os.path.basename(PROJECT_DIR)

env = environ.Env(
    STATIC_ROOT=(str, os.path.join(BASE_DIR, "static")),
    MEDIA_ROOT=(str, os.path.join(BASE_DIR, 'media')),
    # tr -dc 'a-z0-9!@#$%^&*(-_=+)' < /dev/urandom | head -c50
    SECRET_KEY=(str, 'gu^urnk#7zj2%o13c7)mi!uxi0n^ai#8j07r3+pbbv%nd1za(9'),
)
if 'ENV_PATH' in os.environ:
    environ.Env.read_env(os.environ['ENV_PATH'])

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool('DEBUG', default=False)

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=[])


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
if DEBUG:
    MIDDLEWARE.insert(1, 'debug_toolbar.middleware.DebugToolbarMiddleware')

ROOT_URLCONF = 'todo.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(PROJECT_DIR, 'templates'), ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'todo.wsgi.application'

############################################
# log
############################################
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format':
            '%(levelname)s|%(asctime)s|%(name)s>> %(message)s',
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        }
    },
    'loggers': {
        os.path.basename(PROJECT_NAME): {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG'
    },
}

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': env.db(default="sqlite://:memory:")
}


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'ja'
TIME_ZONE = 'Asia/Tokyo'
TZ_INFO = datetime.timezone(datetime.timedelta(hours=9))

USE_I18N = True

USE_L10N = True

USE_TZ = True


############################################
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/
############################################

STATIC_URL = '/static/'
STATIC_ROOT = env('STATIC_ROOT')

STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, PROJECT_DIR, "static"),
)

############################################
# use whitenoise
# MIDDLEWARE.insert(
#     MIDDLEWARE.index('django.middleware.security.SecurityMiddleware'),
#     'whitenoise.middleware.WhiteNoiseMiddleware')
# STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


############################################
# media files
############################################
MEDIA_ROOT = env('MEDIA_ROOT')
MEDIA_URL = '/media/'

############################################
# debug-toolbar
############################################
if DEBUG:
    INSTALLED_APPS += [
        'debug_toolbar',
        'template_timings_panel'
    ]

DEBUG_TOOLBAR_CONFIG = {
    'SHOW_TEMPLATE_CONTEXT': True,
    "SHOW_TOOLBAR_CALLBACK": lambda request: True,
}

DEBUG_TOOLBAR_PANELS = [
    'debug_toolbar.panels.versions.VersionsPanel',
    'debug_toolbar.panels.timer.TimerPanel',
    'debug_toolbar.panels.settings.SettingsPanel',
    'debug_toolbar.panels.headers.HeadersPanel',
    'debug_toolbar.panels.request.RequestPanel',
    'debug_toolbar.panels.sql.SQLPanel',
    'debug_toolbar.panels.staticfiles.StaticFilesPanel',
    'debug_toolbar.panels.templates.TemplatesPanel',
    'debug_toolbar.panels.cache.CachePanel',
    'debug_toolbar.panels.signals.SignalsPanel',
    'debug_toolbar.panels.logging.LoggingPanel',
    'debug_toolbar.panels.redirects.RedirectsPanel',
    'template_timings_panel.panels.TemplateTimings.TemplateTimings',
]

############################################
# graphql
############################################

GRAPHENE = {
    # # firstかlastが有効なときにしか聞かない・・・バグだろこれ
    # 'RELAY_CONNECTION_MAX_LIMIT': 100,

    # # DjangoFilterConnectionField用、大量のデータを一気にフェッチするのを防ぐ
    # # 下のような感じでfirstのデフォルト値を指定しておく
    # # books = DjangoFilterConnectionField(BookNode, first=graphene.Int(100))
    # 'RELAY_CONNECTION_ENFORCE_FIRST_OR_LAST': True,

    'SCHEMA': 'todo.schema.schema',
    'MIDDLEWARE': [
    ] + ['graphene_django.debug.DjangoDebugMiddleware'] if DEBUG else [],
    # manage.py graphql_schema  でdumpできるみたい
    'SCHEMA_OUTPUT': 'data/schema.json',  # defaults to schema.json,
    'SCHEMA_INDENT': 2,
}

ASGI_APPLICATION = "todo.routing.application"
CHANNELS_WS_PROTOCOLS = ["graphql-ws", ]
CHANNEL_LAYERS = {
    "default": {
        # "BACKEND": "channels.layers.InMemoryChannelLayer"
        # "ROUTING": "django_subscriptions.urls.channel_routing",
        # multi processならこっち使わないとだめ
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("redis", 6379)],
        },
    }
}

INSTALLED_APPS += [
    'graphene_django',
    'channels',
    'graphene_subscriptions',
]

############################################
# cors
############################################
INSTALLED_APPS += [
    'corsheaders',
]
MIDDLEWARE.insert(
    MIDDLEWARE.index('django.middleware.common.CommonMiddleware'),
    'corsheaders.middleware.CorsMiddleware',
)

CORS_ORIGIN_REGEX_WHITELIST = [
    r"^http://localhost:.*$",
]
#CORS_ORIGIN_WHITELIST = [
#    "https://example.com",
#    "https://sub.example.com",
#    "http://localhost:8080",
#    "http://127.0.0.1:42100",
#]


############################################
# current project
############################################
MIDDLEWARE += [
]

INSTALLED_APPS = [
    'todo.apps.remainder',
] + INSTALLED_APPS
