from django.urls import path, re_path, include
from .views import (
    MockTestListCreateView,
    UserMockTestListCreateView,
    PackagePlanListCreateView,
    UserPackagePlanListCreateView,
    UserPackagePlanDetailView,
    PurchasePackagePlanView,
    UserMockTestRetrieveView,
    CheckMockTestView,
    UserAnswerListView,
    UserAnswerDetailView,
    UserAnswerDetailByMocktestIdView
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
        "user-mocktests/<uuid:mocktest_id>/",
        UserMockTestRetrieveView.as_view(),
        name="user-mocktest-detail",
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
    path("check-mocktest/", CheckMockTestView.as_view(), name="check-mocktest"),
    path("user-answers/", UserAnswerListView.as_view(), name="user-answers"),
    path("user-answers/<uuid:mocktest_id>/", UserAnswerDetailByMocktestIdView.as_view(), name="user-answers-by-mocktest-id"),
]
