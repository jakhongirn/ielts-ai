from rest_framework import serializers
from .models import MockTest, UserMockTest, UserTestResult, CorrectAnswers, PackagePlan, UserPackagePlan
from django.contrib.auth import get_user_model

User = get_user_model()

class MockTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MockTest
        fields = ['id', 'title', 'description']
        read_only_fields = ['id']
class MockTestDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MockTest
        fields = '__all__' # you can set only data field here
        read_only_fields = ['id']
        
class CorrectAnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorrectAnswers
        fields = '__all__'

class UserMockTestSerializer(serializers.ModelSerializer):
    mocktest_details = MockTestSerializer(source='mocktest', read_only=True)
    class Meta:
        model = UserMockTest
        fields = ['id',  'reading_answers', 'listening_answers', 'writing_answers', 'feedback', 'status', 'date', 'type', 'mocktest', 'mocktest_details', 'user_profile']
        read_only_fields = ['id']

class UserMockTestDetailSerializer(serializers.ModelSerializer):
    mocktest_details = MockTestDataSerializer(source='mocktest', read_only=True)
    
    class Meta:
        model = UserMockTest
        fields = ['id', 'title', 'description', 'reading_answers', 'listening_answers', 'writing_answers', 'feedback', 'status', 'date', 'type', 'mocktest', 'mocktest_details', 'user_profile']
        read_only_fields = ['id']

class UserTestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTestResult
        fields = '__all__'
        read_only_fields = ['id']

class PackagePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackagePlan
        fields = '__all__'
        read_only_fields = ['id']

class UserPackagePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPackagePlan
        fields = '__all__'
        read_only_fields = ['id']
