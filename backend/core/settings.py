"""
Django settings for core project.

Generated by 'django-admin startproject' using Django 4.2.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
from datetime import timedelta
import os
import dotenv

dotenv.load_dotenv()

SITE_NAME = "IELTS AI"
SERVER_IP = os.getenv("SERVER_IP")
SERVER_DOMAIN = os.getenv("SERVER_DOMAIN")
DOMAIN_SSL = os.getenv("DOMAIN_SSL")
DOMAIN_NO_SSL = os.getenv("DOMAIN_NO_SSL")
DOMAIN_WWW = os.getenv("DOMAIN_WWW")
DEBUG_BOOL = os.getenv("DEBUG")
SERVER_IP_HTTP= os.getenv("SERVER_IP_HTTP")
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = DEBUG_BOOL

ALLOWED_HOSTS = [
    "localhost",
    "http://127.0.0.1",
    "http://localhost",
    SERVER_IP,
    SERVER_DOMAIN,
    DOMAIN_SSL,
    DOMAIN_NO_SSL,
    DOMAIN_WWW,
    SERVER_IP_HTTP
]
CSRF_TRUSTED_ORIGINS = [
    DOMAIN_SSL,
    DOMAIN_NO_SSL,
    DOMAIN_WWW,
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1",
    SERVER_IP_HTTP
]

CORS_ALLOW_ALL_ORIGINS = True 

# CORS_ALLOWED_ORIGINS = [
#     DOMAIN_SSL,
#     DOMAIN_NO_SSL,
#     DOMAIN_WWW,
#   "http://localhost:8000",
#    "http://localhost:3000",
#     "http://127.0.0.1",
#     SERVER_IP, 
#     SERVER_IP_HTTP
# ]


# Application definition

INSTALLED_APPS = [
    "django.contrib.sites",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Authentication's (app name) apps
    "authentication.apps.AuthenticationConfig",
    # Mock test app
    "mocktest",
    "ai_integration",
    # Third-party apps
    "rest_framework",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "corsheaders",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    # Third party middlewares
    "corsheaders.middleware.CorsMiddleware",  # Add this
    "django.middleware.common.CommonMiddleware",  # Ensure this is below CorsMiddleware
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
       "ENGINE": "django.db.backends.sqlite3",
       "NAME": BASE_DIR / "db.sqlite3",
    },
    #  'default': {
    #      'ENGINE': 'django.db.backends.postgresql',
    #      'NAME': os.getenv('DB_NAME'),
    #      'USER': os.getenv('DB_USER'),
    #      'PASSWORD': os.getenv('DB_PASSWORD'),
    #      'HOST': os.getenv('DB_HOST'),
    #      'PORT': os.getenv('DB_PORT')
    #  }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = os.getenv("TIME_ZONE")

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

MEDIA_ROOT =os.getenv("MEDIA_ROOT")
MEDIA_URL = "/media/"

STATIC_URL = "/static/"
STATIC_ROOT = os.getenv("STATIC_ROOT")


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


AUTH_USER_MODEL = "authentication.User"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    # "DEFAULT_PERMISSION_CLASSES": [
    #     "rest_framework.permissions.IsAuthenticated",
    # ],
}

SITE_ID = 1

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=120),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_HEADER_TYPES": ("Bearer",),
}

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

DJOSER = {
    "PASSWORD_RESET_CONFIRM_URL": "auth/password/reset-password-confirmation/?uid={uid}&token={token}",
    "ACTIVATION_URL": "#/activate/{uid}/{token}",
    "SEND_ACTIVATION_EMAIL": False,
    "SERIALIZERS": {
        'user_create': 'authentication.serializers.UserCreateSerializer'
        },
}
