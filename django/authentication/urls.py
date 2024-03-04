from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
     path('hello/', views.DemoView.as_view(), name="demo"),
     path('token-auth/', obtain_auth_token, name="api_token_auth"),
]