from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.exceptions import ValidationError



class UserDetailView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        # The request.user will be set to the authenticated user
        # by the JWTAuthentication middleware if the token is valid
        user = request.user
        if not user.is_anonymous:
            user_data = {
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                # You can add more fields as needed
            }
            return Response(user_data, status=status.HTTP_200_OK)
        return Response({"error": "Not authenticated"}, status=status.HTTP_400_BAD_REQUEST)



class SignUpView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            response_data = {
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            }
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):

        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise ValidationError('Token is invalid or expired')
        
        return Response(serializer.validated_data, status=status.HTTP_200_OK)