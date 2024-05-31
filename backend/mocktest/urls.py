from django.urls import path, re_path, include
from .views import MockTestView, PackageViewSet, UserPackageViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'packages', PackageViewSet)
router.register(r'user_packages', UserPackageViewSet)

urlpatterns = [
    re_path(r'^mocktests/(?P<test_id>[a-zA-Z0-9]+)/$', MockTestView.as_view(), name='mocktest'),
    path('user-packages/purchase/', UserPackageViewSet.as_view({'post': 'purchase'}), name='user-package-purchase'),
    path('user-packages/get_user_package/', UserPackageViewSet.as_view({'get': 'get_user_package'}), name='user-package-get')
]
