from .models import UserAnswer

def check_answers(user_answers, correct_answers, user_mocktest):
    listening_user_answers = user_answers.get('listening', {})
    reading_user_answers = user_answers.get('reading', {})

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

    UserAnswer.objects.create(
        user_mocktest=user_mocktest,
        listening_answers=listening_user_answers,
        reading_answers=reading_user_answers,
        listening_correct_answers=listening_correct_answers,
        reading_correct_answers=reading_correct_answers,
        listening_results=listening_results,
        reading_results=reading_results,
        listening_score=listening_score,
        reading_score=reading_score
    )

    return reading_results, reading_score, listening_results, listening_score  


