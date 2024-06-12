from .models import UserAnswer
from datetime import datetime
from django.utils import timezone

def check_answers(user_answers, correct_answers, user_mocktest):
    listening_user_answers = user_answers.get('listening', {})
    reading_user_answers = user_answers.get('reading', {})
    writing_user_answers = user_answers.get('writing', {})

    listening_correct_answers = correct_answers.get('listening_answers', {})
    reading_correct_answers = correct_answers.get('reading_answers', {})

    listening_results = {}
    reading_results = {}

    listening_score = 0
    reading_score = 0

    # Check listening answers
    for q in range(1, 41):  # Assuming there are 40 questions
        q_str = str(q)
        user_a = listening_user_answers.get(q_str, "").strip().lower()
        correct_a = listening_correct_answers.get(q_str, "").strip().lower()
        is_correct = user_a == correct_a
        listening_results[q_str] = {"user_answer": user_a, "correct_answer": correct_a, "is_correct": is_correct}
        if is_correct:
            listening_score += 1

    # Check reading answers
    for q in range(1, 41):  # Assuming there are 40 questions
        q_str = str(q)
        user_a = reading_user_answers.get(q_str, "").strip().lower()
        correct_a = reading_correct_answers.get(q_str, "").strip().lower()
        is_correct = user_a == correct_a
        reading_results[q_str] = {"user_answer": user_a, "correct_answer": correct_a, "is_correct": is_correct}
        if is_correct:
            reading_score += 1
            
    listening_band = get_listening_band_score(listening_score)
    reading_band = get_reading_band_score_academic(reading_score)

    current_time = timezone.now()
    # Check if UserAnswer exists and update it, otherwise create a new one
    try:
        user_answer = UserAnswer.objects.get(user_mocktest=user_mocktest)
        user_answer.listening_answers = listening_user_answers
        user_answer.reading_answers = reading_user_answers
        user_answer.writing_answers = writing_user_answers
        user_answer.listening_correct_answers = listening_correct_answers
        user_answer.reading_correct_answers = reading_correct_answers
        user_answer.listening_results = listening_results
        user_answer.reading_results = reading_results
        user_answer.listening_score = listening_score
        user_answer.reading_score = reading_score
        user_answer.listening_band = listening_band
        user_answer.reading_band = reading_band
        user_answer.passed_date=current_time
        user_answer.save()
    except UserAnswer.DoesNotExist:
        UserAnswer.objects.create(
            user_mocktest=user_mocktest,
            listening_answers=listening_user_answers,
            reading_answers=reading_user_answers,
            writing_answers=writing_user_answers,
            listening_correct_answers=listening_correct_answers,
            reading_correct_answers=reading_correct_answers,
            listening_results=listening_results,
            reading_results=reading_results,
            listening_score=listening_score,
            reading_score=reading_score,
            listening_band=listening_band,
            reading_band=reading_band,
            passed_date=current_time
        )

    return reading_results, reading_score, reading_band, listening_results, listening_score, listening_band


# Scoring function for Listening and Reading tests.
def get_listening_band_score(raw_score):
    band_conversion = [
        (39, 40, 9),
        (37, 38, 8.5),
        (35, 36, 8),
        (32, 34, 7.5),
        (30, 31, 7),
        (26, 29, 6.5),
        (23, 25, 6),
        (18, 22, 5.5),
        (16, 17, 5),
        (13, 15, 4.5),
        (10, 12, 4),
        (6, 9, 3.5),
        (4, 5, 3),
        (2, 3, 2.5),
        (1, 1, 1),
        (0, 0, 0)
    ]

    for min_score, max_score, band in band_conversion:
        if min_score <= raw_score <= max_score:
            return band

    return 0  # Default return value

def get_reading_band_score_academic(raw_score):
    band_conversion = [
        (39, 40, 9),
        (37, 38, 8.5),
        (35, 36, 8),
        (33, 34, 7.5),
        (30, 32, 7),
        (27, 29, 6.5),
        (23, 26, 6),
        (19, 22, 5.5),
        (15, 18, 5),
        (13, 14, 4.5),
        (10, 12, 4),
        (8, 9, 3.5),
        (6, 7, 3),
        (4, 5, 2.5),
        (2, 3, 2),
        (1, 1, 1),
        (0, 0, 0)
    ]

    for min_score, max_score, band in band_conversion:
        if min_score <= raw_score <= max_score:
            return band

    return 0  # Default return value
