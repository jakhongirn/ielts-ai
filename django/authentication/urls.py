from django.urls import path
from .views import SignUpView, DemoView
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
     path('signup/', SignUpView.as_view(), name="signup"),
     path('token/', jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
     path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
     
     path('demo/', DemoView.as_view(), name="demo"),
]