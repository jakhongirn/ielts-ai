from django.db import models
from authentication.models import User, UserProfile 
import uuid

# Create your models here.

class Package(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    number_of_exams = models.IntegerField()
    feedback_sessions = models.IntegerField()
    
    def __str__(self):
        return self.name
    
    
class UserPackage(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    purchase_date = models.DateTimeField(auto_now_add=True)
    exams_taken = models.IntegerField(default=0)
    feedback_taken = models.IntegerField(default=0)
    
    def __str__(self):
        return f"{self.user_profile.user.username} - {self.package.name}"


class MockTest(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name= models.CharField(max_length=255)
    test_json = models.FileField(upload_to='json_data/')
    
    def __str__(self):
        return str(self.name)

class UserMockTest(models.Model):
    STATUS = [
        ("NEW", "new"),
        ("PASSED", "passed"),
        ("LISTENING", "listening"),
        ("READING", "reading")
    ]
    TYPE = [
        ("FREE", "free"),
        ("PAID", "paid")
    ]
    
    id = models.AutoField(primary_key=True)
    mocktest = models.ForeignKey(MockTest, on_delete=models.CASCADE)
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    reading_answers = models.FileField(upload_to='json_data/reading_answers/', blank=True, null=True)
    listening_answers = models.FileField(upload_to='json_data/listening_answers/', blank=True, null=True)
    writing_answers = models.FileField(upload_to='json_data/writing_answers/', blank=True, null=True)
    feedback = models.FileField(upload_to='json_data/ai_feedback/', blank=True, null=True)
    status = models.CharField(choices=STATUS, max_length=15)
    date = models.DateTimeField(blank=True, null=True)
    type = models.CharField(choices=TYPE, max_length=15)

    def __str__(self):
        return f"{self.user_profile.user.username}: {self.mocktest.name}"

class UserTestResult(models.Model):
    TYPE = [
        ("WITH_FEEDBACK", "with_feedback"),
        ("WITHOUT_FEEDBACK", "without_feedback")
    ]
    id = models.AutoField(primary_key=True)
    user_mocktest = models.ForeignKey(UserMockTest, on_delete=models.CASCADE)
    answers = models.FileField(upload_to='json_data/user_answers/')
    type = models.CharField(choices=TYPE)
    date = models.DateTimeField(auto_now_add=True)

class CorrectAnswers(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    mocktest = models.OneToOneField(MockTest, on_delete=models.CASCADE)
    answers = models.FileField(upload_to='json_data/correct_answers/')
    
    def __str__(self):
        return str(self.mocktest.name)

# class Assesments(models.Model):
#     SECTIONS = [
#         ('READING', "Reading"),
#         ('LISTENING', "Listening"),
#         ('WRITING', "Writing"),
#         ('SPEAKING', "Speaking")
#     ]
    
#     id = models.AutoField(primary_key=True)
#     name = models.CharField(max_length=255)
#     total_questions = models.IntegerField()
#     duration = models.IntegerField()
#     is_public = models.BooleanField()
#     section_type = models.CharField(choices=SECTIONS, max_length=10)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     cover_image = models.ImageField(upload_to='assesment_images/', null=True, blank=True)
#     book_name = models.CharField(max_length=100, null=True, blank=True)


# class Result(models.Model):
#     id = models.AutoField(primary_key=True)
#     total_correct_answers = models.IntegerField()
#     score = models.IntegerField()
#     time_spent = models.IntegerField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     assesment = models.OneToOneField(Assesments, on_delete=models.CASCADE, related_name='results')
    

# class Part(models.Model):
#     id = models.AutoField(primary_key=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     title = models.CharField(max_length=255)
#     description = models.TextField()
#     order = models.IntegerField()
#     assessment = models.ForeignKey(Assesments, on_delete=models.CASCADE, related_name='parts')
    
    
# class Question(models.Model):
#     id = models.AutoField(primary_key=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     question_text = models.TextField()
#     question_group = models.ForeignKey('QuestionGroup', on_delete=models.CASCADE, related_name='questions')
#     correct_answer = models.TextField()
    

# from django.db import models

# class QuestionGroup(models.Model):
#     QUESTION_TYPES = [
#         ("MULTIPLE_CHOICE_ONE_ANSWER", "Multiple Choice Question"),
#         ("MULTIPLE_CHOICE_MORE_ANSWER", "Multiple Choice More Answers"),
#         ("IDENTIFYING_INFORMATION", "Identifying Information"),
#         ("COMPLETION", "Completion"),
#         ("TABLE_COMPLETION", "Table Completion"),
#         ("MATCHING", "Matching"),
#         ("MATCHING_HEADINGS", "Matching Headings"),
#     ]
#     id = models.CharField(primary_key=True, max_length=255, default="")  # Assuming a method for CUID generation
#     created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
#     updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")
#     title = models.CharField(max_length=255, verbose_name="Title")
#     description = models.TextField(null=True, blank=True, verbose_name="Description")
#     start_question_num = models.IntegerField(verbose_name="Start Question Number")
#     end_question_num = models.IntegerField(verbose_name="End Question Number")
#     question_type = models.CharField(QUESTION_TYPES, max_length=50)  # This should be adjusted based on your QuestionType enum
#     part = models.ForeignKey('Part', on_delete=models.CASCADE, related_name='questionGroups', verbose_name="Part")

#     class Meta:
#         verbose_name = "Question Group"
#         verbose_name_plural = "Question Groups"


# class Passage(models.Model):
#     PASSAGE_TYPES = [
#         ("PASSAGE_SIMPLE", "Simple Passage"),
#         ("PASSAGE_MULTI_HEADING", "Multi heading Passages")
#     ]
#     id = models.AutoField(primary_key=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
    
#     title = models.CharField(max_length=255)
#     description=models.TextField(null=True, blank=True)
#     image = models.ImageField(null=True, blank=True)
#     type = models.CharField(choices=PASSAGE_TYPES, max_length=50)
#     part = models.ForeignKey("Part", verbose_name=("Part"), on_delete=models.CASCADE, related_name="Passage")


