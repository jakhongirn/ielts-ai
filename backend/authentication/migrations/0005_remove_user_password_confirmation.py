# Generated by Django 5.0.4 on 2024-06-06 07:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_user_password_confirmation'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='password_confirmation',
        ),
    ]
