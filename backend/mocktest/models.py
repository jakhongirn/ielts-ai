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
