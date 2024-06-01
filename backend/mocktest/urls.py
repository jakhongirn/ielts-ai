from django.urls import path, re_path, include
from .views import PackageViewSet, UserPackageViewSet, get_mock_test
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path('mocktests/<uuid:pk>/', get_mock_test, name='get_mock_test'),
    path('user-packages/purchase/', UserPackageViewSet.as_view({'post': 'purchase'}), name='user-package-purchase'),
    path('user-packages/get_user_package/', UserPackageViewSet.as_view({'get': 'get_user_package'}), name='user-package-get')
]
