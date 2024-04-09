from django.contrib import admin
from .models import Assesments, Part, Question, Result

# Register your models here.

class AssessmentAdmin(admin.ModelAdmin):
    
    list_display = ('name', 'total_questions', 'duration', 'is_public', 'section_type', 'created_at', 'updated_at')
    search_fields = ('name', 'section_type')
    list_filter = ('section_type', 'is_public')
    
class PartAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'order', 'created_at', 'updated_at')
    search_fields = ('title', 'description')
    list_filter = ('order', 'created_at')

class QuestionAdmin(admin.ModelAdmin):
                
    list_display = ('question_text', 'created_at', 'updated_at')
    search_fields = ('question_text',)
    list_filter = ('created_at', 'updated_at')

class ResultAdmin(admin.ModelAdmin):
                    
    list_display = ('total_correct_answers', 'score', 'time_spent', 'created_at', 'updated_at')
    search_fields = ('total_correct_answers', 'score')
    list_filter = ('created_at', 'updated_at')
    
admin.site.register(Assesments, AssessmentAdmin)
admin.site.register(Part, PartAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Result, ResultAdmin)
