from django.urls import path, re_path, include
from .views import (
    MockTestListCreateView,
    UserMockTestListCreateView,
    UserMockTestDetailView,
    UserTestResultListCreateView,
    PackagePlanListCreateView,
    UserPackagePlanListCreateView,
    UserPackagePlanDetailView,
    PurchasePackagePlanView,
    UserMockTestRetrieveView
)
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path("mocktests/", MockTestListCreateView.as_view(), name="mocktest-list-create"),
    path(
        "user-mocktests/",
        UserMockTestListCreateView.as_view(),
        name="user-mocktest-list-create",
    ),
    path(
        "user-mocktests/<int:pk>/",
        UserMockTestRetrieveView.as_view(),
        name="user-mocktest-detail",
    ),
    path(
        "user-test-results/",
        UserTestResultListCreateView.as_view(),
        name="user-test-result-list-create",
    ),
    path(
        "package-plans/",
        PackagePlanListCreateView.as_view(),
        name="package-plan-list-create",
    ),
    path(
        "user-package-plans/",
        UserPackagePlanListCreateView.as_view(),
        name="user-package-plan-list-create",
    ),
    path(
        "user-package-plans/<uuid:pk>/",
        UserPackagePlanDetailView.as_view(),
        name="user-package-plan-detail",
    ),
    path(
        "purchase-package-plan/",
        PurchasePackagePlanView.as_view(),
        name="purchase-package-plan",
    ),
]
