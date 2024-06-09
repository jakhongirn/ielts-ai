from rest_framework import serializers
from .models import MockTest, UserMockTest, UserTestResult, CorrectAnswers, PackagePlan, UserPackagePlan
from django.contrib.auth import get_user_model

User = get_user_model()

class MockTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MockTest
        fields = '__all__'

class CorrectAnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorrectAnswers
        fields = '__all__'

class UserMockTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMockTest
        fields = '__all__'

class UserTestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTestResult
        fields = '__all__'

class PackagePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackagePlan
        fields = '__all__'

class UserPackagePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPackagePlan
        fields = '__all__'
