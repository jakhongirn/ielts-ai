from rest_framework import serializers
from .models import MockTest, UserMockTest,  CorrectAnswers, PackagePlan, UserPackagePlan, UserAnswer
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
        fields = ['id', 'reading_answers', 'listening_answers', 'writing_answers', 'feedback', 'status', 'date', 'type', 'mocktest', 'mocktest_details', 'user_profile']
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

class UserAnswerListSerializer(serializers.ModelSerializer):
    mocktest_id = serializers.UUIDField(source='user_mocktest.mocktest.id')
    mocktest_title = serializers.CharField(source='user_mocktest.mocktest.title')
    class Meta:
        model = UserAnswer
        fields = ['id', 'mocktest_id', 'mocktest_title', 'passed_date', 'listening_band', 'listening_score', 'reading_band', 'reading_score']

class UserAnswerDetailSerializer(serializers.ModelSerializer):
    mocktest_title = serializers.CharField(source='user_mocktest.mocktest.title')
    class Meta:
        model = UserAnswer
        fields = ['id', 'user_mocktest', 'mocktest_title', 'listening_answers', 'reading_answers', 'listening_correct_answers', 'reading_correct_answers', 'listening_results', 'reading_results', 'passed_date', 'listening_band', 'listening_score', 'reading_score', 'reading_band', 'writing_answers', 'writing_feedback', 'writing_score']