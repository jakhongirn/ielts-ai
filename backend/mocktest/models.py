from django.db import models
from django.utils import timezone
import uuid
from authentication.models import UserProfile
from django.contrib.auth import get_user_model

User = get_user_model()

class MockTest(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    json_file = models.FileField(upload_to='json_data/')
    
    def __str__(self):
        return str(self.title)

class CorrectAnswers(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    mocktest = models.OneToOneField(MockTest, on_delete=models.CASCADE)
    listening_answers = models.JSONField()
    reading_answers = models.JSONField()
    
    def __str__(self):
        return f"Correct Answers for {self.mocktest.title}"

class PackagePlan(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    num_mock_tests = models.PositiveIntegerField(default=1)
    mocktests_included = models.ManyToManyField(MockTest, related_name='packages')
    
    def __str__(self):
        return str(self.name)

class UserPackagePlan(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    package_plan = models.ForeignKey(PackagePlan, on_delete=models.CASCADE)
    purchase_date = models.DateTimeField(default=timezone.now)
    remaining_mocktests = models.PositiveIntegerField()
    
    
    def __str__(self):
        return f"{self.user_profile.user.username} - {self.package_plan.name}"

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
        return f"{self.user_profile.user.username}: {self.mocktest.title}"
    
class UserAnswer(models.Model):
    user_mocktest = models.ForeignKey(UserMockTest, on_delete=models.CASCADE, related_name='user_answers')
    listening_answers = models.JSONField()
    reading_answers = models.JSONField()
    listening_correct_answers = models.JSONField()
    reading_correct_answers = models.JSONField()
    listening_results = models.JSONField()
    reading_results = models.JSONField()
    listening_score = models.IntegerField()
    reading_score = models.IntegerField()
    reading_band = models.FloatField()
    listening_band = models.FloatField() 
