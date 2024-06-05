from django.urls import path, include
from .views import LogoutView
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
     # path('signup/', SignUpView.as_view(), name="signup"),
     # path('login/', CustomTokenView.as_view(), name="login"),
     # path('logout/', LogoutView.as_view(), name="logout"),
     # path('token/', jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
     # path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
     # path('user/', UserDetailView.as_view(), name="user_detail"),
     
     path('', include("djoser.urls")),
     path('', include("djoser.urls.jwt")),
     path('logout/', LogoutView.as_view()),
]