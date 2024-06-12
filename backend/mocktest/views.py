from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import MockTest, UserMockTest, CorrectAnswers, PackagePlan, UserPackagePlan
from .serializers import (
    MockTestSerializer,
    UserMockTestSerializer,
    UserMockTestDetailSerializer,
    PackagePlanSerializer,
    UserPackagePlanSerializer
)
from django.shortcuts import get_object_or_404
import json
from rest_framework import serializers
import random
from django.utils import timezone
from .utils import check_answers

class MockTestListCreateView(generics.ListCreateAPIView):
    queryset = MockTest.objects.all()
    serializer_class = MockTestSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserMockTestListCreateView(generics.ListCreateAPIView):
    queryset = UserMockTest.objects.all()
    serializer_class = UserMockTestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_profile = self.request.user.profile
        return UserMockTest.objects.filter(user_profile=user_profile)

    def create(self, request, *args, **kwargs):
        user_profile = request.user.profile
        user_package_plans = UserPackagePlan.objects.filter(user_profile=user_profile)
        if not user_package_plans.exists():
            return Response({"detail": "No active package plans found."}, status=status.HTTP_403_FORBIDDEN)
        
        user_package_plan = user_package_plans.first()
        if user_package_plan.remaining_mocktests <= 0:
            return Response({"detail": "No remaining mock tests in the package plan."}, status=status.HTTP_403_FORBIDDEN)
        
        user_package_plan.remaining_mocktests -= 1
        user_package_plan.save()

        mocktest_id = request.data.get('mocktest_id')
        mocktest = MockTest.objects.get(id=mocktest_id)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(
            user_profile=user_profile, 
            date=timezone.now(),
            )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
class UserMockTestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserMockTest.objects.all()
    serializer_class = UserMockTestDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserMockTestRetrieveView(generics.RetrieveAPIView):
    queryset = UserMockTest.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk, format=None):
        user_mock_test = get_object_or_404(UserMockTest, pk=pk)

        if user_mock_test.status == "PASSED":
            return Response({"detail": "The mock test has already been passed."}, status=status.HTTP_403_FORBIDDEN)

        mock_test = user_mock_test.mocktest
        try:
            with mock_test.json_file.open('r') as file:
                data = json.load(file)
            return Response(data, status=status.HTTP_200_OK)
        except FileNotFoundError:
            return Response({'error': 'File not found'}, status=status.HTTP_404_NOT_FOUND)
        except json.JSONDecodeError:
            return Response({'error': 'Invalid JSON file'}, status=status.HTTP_400_BAD_REQUEST)

class PackagePlanListCreateView(generics.ListCreateAPIView):
    queryset = PackagePlan.objects.all()
    serializer_class = PackagePlanSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserPackagePlanListCreateView(generics.ListCreateAPIView):
    queryset = UserPackagePlan.objects.all()
    serializer_class = UserPackagePlanSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserPackagePlanDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserPackagePlan.objects.all()
    serializer_class = UserPackagePlanSerializer
    permission_classes = [permissions.IsAuthenticated]

class PurchasePackagePlanView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        package_plan_id = request.data.get('package_plan_id')
        package_plan = get_object_or_404(PackagePlan, id=package_plan_id)
        user_profile = request.user.profile

        # Get the number of mock tests to assign from the package plan
        mock_tests_limit = package_plan.num_mock_tests

        # Get a list of mock tests that the user has already used
        used_mocktests = UserMockTest.objects.filter(user_profile=user_profile).values_list('mocktest_id', flat=True)

        # Filter out the used mock tests from the available ones in the package plan
        available_mocktests = package_plan.mocktests_included.exclude(id__in=used_mocktests)

        # Ensure there are enough available mock tests to assign
        if available_mocktests.count() < mock_tests_limit:
            return Response({"detail": "Not enough available mock tests to assign in this package plan."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the UserPackagePlan instance
        user_package_plan = UserPackagePlan.objects.create(
            user_profile=user_profile,
            package_plan=package_plan,
            remaining_mocktests=mock_tests_limit
        )

        # Randomly select and assign the limited number of mock tests from the available ones in the package plan to the user
        mocktests = random.sample(list(available_mocktests), mock_tests_limit)
        for mocktest in mocktests:
            UserMockTest.objects.create(
                mocktest=mocktest,
                user_profile=user_profile,
                status="NEW",
                type="PAID"
            )

        serializer = UserPackagePlanSerializer(user_package_plan)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

def assign_free_mock_test(user_profile):
    # Replace 'specific-mocktest-id' with the actual ID of the preselected mock test
    preselected_mocktest_id = '4e06bd4b-ce30-499e-aad6-90f0fcf98a03'
    try:
        free_mock_test = MockTest.objects.get(id=preselected_mocktest_id)
        UserMockTest.objects.create(
            mocktest=free_mock_test,
            user_profile=user_profile,
            status="NEW",
            type="FREE"
        )
    except MockTest.DoesNotExist:
        # Handle the case where the preselected mock test does not exist
        pass
    
    
class CheckMockTestView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, *args, **kwargs):
        user_profile = request.user.profile
        mocktest_id = request.data.get('mocktest_id')
        user_answers = request.data.get('user_answers')
        
        try:
            user_mocktest = UserMockTest.objects.get(mocktest_id=mocktest_id, user_profile=user_profile)
            correct_answer = CorrectAnswers.objects.get(mocktest_id=mocktest_id)
        except (UserMockTest.DoesNotExist, CorrectAnswers.DoesNotExist):
            return Response({"detail": "Mocktest or Correct answers not found."}, status=status.HTTP_404_NOT_FOUND)
        
        correct_answers_data = {
            "listening_answers": correct_answer.listening_answers,
            "reading_answers": correct_answer.reading_answers
        }
        
        reading_results, reading_score, reading_band, listening_results, listening_score, listening_band = check_answers(user_answers, correct_answers_data, user_mocktest)
        
        return Response({"reading_results": reading_results, "reading_score": reading_score, "reading_band": reading_band, "listening_results": listening_results, "listening_score": listening_score, "listening_band": listening_band}, status=status.HTTP_200_OK)