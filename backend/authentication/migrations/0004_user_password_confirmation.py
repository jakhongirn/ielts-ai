# Generated by Django 5.0.4 on 2024-06-06 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_alter_user_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='password_confirmation',
            field=models.CharField(default='hi', max_length=128),
            preserve_default=False,
        ),
    ]
