import os
import json
import uuid
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Package, UserPackage, MockTest
from .serializers import PackageSerializer, UserPackageSerializer, MockTestSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.validators import ValidationError
from django.shortcuts import get_object_or_404
from django.http import JsonResponse


# class MockTestView(APIView):
#     permission_classes = (IsAuthenticated,)
#     def get(self, request, test_id, format=None):
#         json_file_path = os.path.join(os.path.dirname(__file__), 'json_data', f'{test_id}.json')
#         if not os.path.exists(json_file_path):
#             return Response({'error': 'File not found'}, status=status.HTTP_404_NOT_FOUND)
#         with open(json_file_path, 'r') as file:
#             data = json.load(file)
#         return Response(data, status=status.HTTP_200_OK)


def get_mock_test(request, pk):
    mock_test = get_object_or_404(MockTest, pk=pk)
    with mock_test.json_file.open('r') as f:
        data = json.load(f)
    return JsonResponse(data)

class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

class UserPackageViewSet(viewsets.ModelViewSet):
    queryset = UserPackage.objects.all()
    serializer_class = UserPackageSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'])
    def purchase(self, request):
        user_profile = request.user.profile
        package_id = request.data.get('package_id')
        
        # Validate package ID
        try:
            uuid.UUID(package_id)
        except ValueError:
            raise ValidationError({'error': 'Invalid package ID format. Please provide a valid package id.'})
        
        try:
            package = Package.objects.get(id=package_id)
        except Package.DoesNotExist:
            return Response({'error': 'Package not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check for existing active package (optional)
        existing_package = UserPackage.objects.filter(user_profile=user_profile).first()
        if existing_package:
            # Optional: handle existing package (e.g., upgrade, replace)
            existing_package.delete()

        # Create UserPackage entry
        user_package = UserPackage.objects.create(user_profile=user_profile, package=package)

        return Response({'status': 'package purchased', 'package': PackageSerializer(package).data}, status=201)

    @action(detail=False, methods=['get'])
    def get_user_package(self, request):
        user_profile = request.user.profile
        try:
            user_package = UserPackage.objects.get(user_profile=user_profile)
            serializer = UserPackageSerializer(user_package)
            return Response(serializer.data)
        except UserPackage.DoesNotExist:
            return Response({'error': 'No package found for this user'}, status=status.HTTP_404_NOT_FOUND)
