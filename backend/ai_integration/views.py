# ai_interface/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import EssayInputSerializer
import anthropic
import os
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from dotenv import load_dotenv
from .testInput import  system_input
from mocktest.models import UserAnswer, UserMockTest

load_dotenv()

api_key = os.getenv("CLAUDE_API_KEY")
client = anthropic.Anthropic(api_key=api_key)


@method_decorator(csrf_exempt, name="dispatch")
class EssayPromptView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = EssayInputSerializer(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data
            tasks = [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": data["task_1"]},
                        {"type": "text", "text": data["task_1_question"]},
                        {"type": "text", "text": data["task_2"]},
                        {"type": "text", "text": data["task_2_question"]},
                    ],
                }
            ]

            # if data.get('task_1_img'):
            #     image_content = {
            #         "type": "image",
            #         "source": {
            #             "type": "base64",
            #             "media_type": "image/jpeg",
            #             "data": base64_image
            #             }
            #     }
            #     tasks[0]['content'].append(image_content)

            try:
                response = client.messages.create(
                    model="claude-3-opus-20240229",
                    max_tokens=1024,
                    messages=tasks,
                    system=system_input,
                )

                feedback_content = ""
                for block in response.content:
                    if block.type == "text":
                        feedback_content += block.text + "\n"

                mocktest_id = request.data.get('mocktest_id')
                # Find or create UserAnswer
                user_mocktest = UserMockTest.objects.get(
                    user_profile=request.user.profile, mocktest=mocktest_id
                )
                user_answer, created = UserAnswer.objects.get_or_create(
                    user_mocktest=user_mocktest
                )
                user_answer.writing_feedback = feedback_content
                user_answer.save()

                return Response({"response": feedback_content})
            except Exception as e:
                return Response({"error": str(e)}, status=500)

        return Response(serializer.errors, status=400)
