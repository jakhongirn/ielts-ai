# Generated by Django 5.0.4 on 2024-06-09 17:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mocktest', '0006_packageplan_num_mock_tests'),
    ]

    operations = [
        migrations.AddField(
            model_name='usermocktest',
            name='description',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usermocktest',
            name='title',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
    ]
