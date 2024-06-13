from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from mocktest.models import UserMockTest, UserAnswer
from .serializers import EssayInputSerializer
from django.shortcuts import get_object_or_404
import anthropic
import os
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv
from .testInput import system_input

load_dotenv()

api_key = os.getenv("CLAUDE_API_KEY")
client = anthropic.Anthropic(api_key=api_key)

@method_decorator(csrf_exempt, name='dispatch')
class EssayPromptView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = EssayInputSerializer(data=request.data)
        
        if serializer.is_valid():
            data = serializer.validated_data
            tasks = [
                {"role": "user", "content": [{"type": "text", "text": data['task_1']},
                                             {"type": "text", "text": data['task_2']}]}
            ]
            
           
            
            try:
                response = client.messages.create(
                    model="claude-3-opus-20240229",
                    max_tokens=1024,
                    messages=tasks,
                    system=system_input
                )
                
                feedback_content = ''
                for block in response.content:
                    if block.type == 'text':
                        feedback_content += block.text + '\n'
                
                # Find or create UserAnswer
                mocktest_id = request.data.get('mocktest_id')
                user_profile = request.user.profile
                user_mocktest = UserMockTest.objects.filter(user_profile=user_profile, mocktest_id=mocktest_id).first()
                if user_mocktest is None:
                    return Response({"error": "UserMockTest not found."}, status=404)

                user_answer, created = UserAnswer.objects.get_or_create(user_mocktest=user_mocktest)
                user_answer.writing_feedback = feedback_content
                user_answer.save()

                return Response({"response": feedback_content})
            except Exception as e:
                import traceback
                print(traceback.format_exc())  # Print the full traceback
                return Response({"error": str(e)}, status=500)

        return Response(serializer.errors, status=400)
