from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, UserProfile
# from django.core.mail import send_mail


@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    else: 
        instance.profile.save()
  

# This is additional function that sends welcome email to user after registering from website        
# @receiver(post_save, sender=User)
# def send_welcome_email(sender, instance, created, **kwargs):
#     if created:
#         send_mail(
#             'Welcome to Our Site',
#             'Thank you for signing up for our site.',
#             'from@example.com',
#             [instance.email],
#             fail_silently=False,
#         )