from django.db import models

# Create your models here.

class Assesments(models.Model):
    SECTIONS = [
        ('READING', "Reading"),
        ('LISTENING', "Listening"),
        ('WRITING', "Writing"),
        ('SPEAKING', "Speaking")
    ]
    
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    total_questions = models.IntegerField()
    duration = models.IntegerField()
    is_public = models.BooleanField()
    section_type = models.CharField(choices=SECTIONS, max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    cover_image = models.ImageField(upload_to='assesment_images/', null=True, blank=True)
    book_name = models.CharField(max_length=100, null=True, blank=True)


class Result(models.Model):
    id = models.AutoField(primary_key=True)
    total_correct_answers = models.IntegerField()
    score = models.IntegerField()
    time_spent = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    assesment = models.OneToOneField(Assesments, on_delete=models.CASCADE, related_name='results')
    

class Part(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    order = models.IntegerField()
    assessment = models.ForeignKey(Assesments, on_delete=models.CASCADE, related_name='parts')
    
    
class Question(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    question_text = models.TextField()
    question_group = models.ForeignKey('QuestionGroup', on_delete=models.CASCADE, related_name='questions')
    correct_answer = models.TextField()
    

from django.db import models

class QuestionGroup(models.Model):
    QUESTION_TYPES = [
        ("MULTIPLE_CHOICE_ONE_ANSWER", "Multiple Choice Question"),
        ("MULTIPLE_CHOICE_MORE_ANSWER", "Multiple Choice More Answers"),
        ("IDENTIFYING_INFORMATION", "Identifying Information"),
        ("COMPLETION", "Completion"),
        ("TABLE_COMPLETION", "Table Completion"),
        ("MATCHING", "Matching"),
        ("MATCHING_HEADINGS", "Matching Headings"),
    ]
    id = models.CharField(primary_key=True, max_length=255, default="")  # Assuming a method for CUID generation
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")
    title = models.CharField(max_length=255, verbose_name="Title")
    description = models.TextField(null=True, blank=True, verbose_name="Description")
    start_question_num = models.IntegerField(verbose_name="Start Question Number")
    end_question_num = models.IntegerField(verbose_name="End Question Number")
    question_type = models.CharField(QUESTION_TYPES, max_length=50)  # This should be adjusted based on your QuestionType enum
    part = models.ForeignKey('Part', on_delete=models.CASCADE, related_name='questionGroups', verbose_name="Part")

    class Meta:
        verbose_name = "Question Group"
        verbose_name_plural = "Question Groups"


class Passage(models.Model):
    PASSAGE_TYPES = [
        ("PASSAGE_SIMPLE", "Simple Passage"),
        ("PASSAGE_MULTI_HEADING", "Multi heading Passages")
    ]
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    title = models.CharField(max_length=255)
    description=models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    type = models.CharField(choices=PASSAGE_TYPES, max_length=50)
    part = models.ForeignKey("Part", verbose_name=("Part"), on_delete=models.CASCADE, related_name="Passage")


