# Generated by Django 5.0.4 on 2024-06-09 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mocktest', '0007_usermocktest_description_usermocktest_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='mocktest',
            name='description',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]
