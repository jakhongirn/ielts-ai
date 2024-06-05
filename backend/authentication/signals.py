from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, UserProfile
from mocktest.models import UserMockTest, MockTest
from django.conf import settings
import logging
import os
import dotenv

dotenv.load_dotenv()

logger = logging.getLogger(__name__)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        logger.debug('Creating user profile for {}'.format(instance))
        user_profile = UserProfile.objects.create(user=instance)

        # Fetch the mock test using the UUID from the environment variable
        mock_test_id = os.getenv('FREE_MOCK_TEST')
        if mock_test_id:
            try:
                mock_test = MockTest.objects.get(id=mock_test_id)
                UserMockTest.objects.create(
                    user_profile=user_profile,
                    mocktest=mock_test,
                    status='NEW',
                    type='FREE'
                )
            except MockTest.DoesNotExist:
                logger.error('MockTest with id {} does not exist'.format(mock_test_id))
        else:
            logger.error('FREE_MOCK_TEST environment variable not set')

    else:
        logger.debug('Updating user profile for {}'.format(instance))
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