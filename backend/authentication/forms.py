from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User

class CustomUserCreationFrom(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('username', 'email')
        
