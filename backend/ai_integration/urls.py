from django.urls import path
from .views import EssayPromptView

urlpatterns = [
    path('', EssayPromptView.as_view(), name='essay_prompt'),
]