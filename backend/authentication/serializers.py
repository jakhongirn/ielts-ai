from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirmation = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password_confirmation']
        extra_kwargs = {
            'password': {'write_only': True},
            'password_confirmation': {'write_only': True},
        }
        
    def validate(self, data):
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError({"password_confirmation": "Password fields didn't match."})
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirmation', None) # Remove confirmation field which is not part of the User model
        return User.objects.create_user(**validated_data)
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        # The original validate method does not directly use model metadata,
        # so ensure any custom logic also avoids such usage.

        # Authenticate using 'email' instead of 'username'
        email = attrs.get(self.username_field)
        password = attrs.get('password')

        user = authenticate(request=self.context.get('request'), email=email, password=password)

        if not user:
            raise serializers.ValidationError('No active account found with the given credentials')

        # Successfully authenticated; let the base class handle token creation
        data = super().validate(attrs)

        # Add custom data to the response
        data.update({'username': user.username, 'first_name': user.first_name, 'email': user.email})

        return data