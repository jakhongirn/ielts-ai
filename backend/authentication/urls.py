from django.urls import path, include
from .views import LogoutView, SignUpView, UserProfileView
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
     path('token/', jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
     path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
     path('logout/', LogoutView.as_view()),
     path('signup/', SignUpView.as_view(), name="signup"),
     path('user/', UserProfileView.as_view(), name="user_detail")
     # path('login/', CustomTokenView.as_view(), name="login"),
     # path('user/', UserDetailView.as_view(), name="user_detail"),
]