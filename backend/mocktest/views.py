import os
import json
import uuid
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Package, UserPackage, MockTest
from .serializers import PackageSerializer, UserPackageSerializer, MockTestSerializer
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework.validators import ValidationError
from django.shortcuts import get_object_or_404
from django.http import JsonResponse


class MockTestView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        mock_test = get_object_or_404(MockTest, pk=pk)
        try:
            with mock_test.json_file.open('r') as file:
                data = json.load(file)
            return Response(data, status=status.HTTP_200_OK)
        except FileNotFoundError:
            return Response({'error': 'File not found'}, status=status.HTTP_404_NOT_FOUND)
        except json.JSONDecodeError:
            return Response({'error': 'Invalid JSON file'}, status=status.HTTP_400_BAD_REQUEST)

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
