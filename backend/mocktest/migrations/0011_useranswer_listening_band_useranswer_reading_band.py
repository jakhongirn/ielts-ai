# Generated by Django 5.0.4 on 2024-06-12 07:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mocktest', '0010_remove_correctanswers_answers_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='useranswer',
            name='listening_band',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='useranswer',
            name='reading_band',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
    ]
