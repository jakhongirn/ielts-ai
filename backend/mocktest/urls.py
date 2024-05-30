from django.urls import path, re_path
from .views import MockTestView

urlpatterns = [
    re_path(r'^mocktests/(?P<test_id>[a-zA-Z0-9]+)/$', MockTestView.as_view(), name='mocktest'),
]
