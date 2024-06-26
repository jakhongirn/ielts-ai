# ai_interface/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import EssayInputSerializer
import anthropic
import os
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from dotenv import load_dotenv
from .testInput import base64_image, system_input

load_dotenv()

api_key = os.getenv("CLAUDE_API_KEY")
client = anthropic.Anthropic(api_key=api_key)

@method_decorator(csrf_exempt, name='dispatch') 
class EssayPromptView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = EssayInputSerializer(data=request.data)
        
        if serializer.is_valid():
            data = serializer.validated_data
            print(request.data)
            tasks = [
                {"role": "user", "content": [{"type": "text", "text": data['task_1']},
                                             {"type": "text", "text": data['task_2']},
                                             ]},
            ]
            
            if data.get('task_1_img'):
                # Ensure image content is structured correctly:
                image_content = {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": "image/jpeg",
                        "data": base64_image                    
                        }
                }
                tasks[0]['content'].append(image_content)
            
            print(tasks)
            try:
                response = client.messages.create(
                    model="claude-3-opus-20240229",
                    max_tokens=1024,
                    messages=tasks,
                    system=system_input
                )
                print(response)
                return Response({"response": response.content})
            except Exception as e:
                print("Error from API:", e)
                return Response({"error": str(e)}, status=500)

        return Response(serializer.errors, status=400)
