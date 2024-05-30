# tests/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
import json
from rest_framework.permissions import IsAuthenticated

class MockTestView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, test_id, format=None):
        json_file_path = os.path.join(os.path.dirname(__file__), 'json_data', f'{test_id}.json')
        if not os.path.exists(json_file_path):
            return Response({'error': 'File not found'}, status=status.HTTP_404_NOT_FOUND)
        with open(json_file_path, 'r') as file:
            data = json.load(file)
        return Response(data, status=status.HTTP_200_OK)
