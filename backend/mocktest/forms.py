from django import forms
from .models import MockTest

class MockTestForm(forms.ModelForm):
    class Meta:
        model = MockTest
        fields = ['id', 'name', 'json_file']  # Only show the json_file field in the form
