# ai_interface/serializers.py
from rest_framework import serializers

class EssayInputSerializer(serializers.Serializer):
    task_1 = serializers.CharField()
    task_2 = serializers.CharField()
    task_1_question = serializers.CharField()
    task_2_question = serializers.CharField()
    task_1_img = serializers.CharField(required=False)  # Assuming it's a base64-encoded image
