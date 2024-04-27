import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Replace this with the correct answers fetched from your backend
const CORRECT_ANSWERS = {
  // ... fetch correct answers from the backend
};

const Feedback = () => {
  const router = useRouter();
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(CORRECT_ANSWERS);
  const [results, setResults] = useState({ correct: 0, incorrect: 0 });

  useEffect(() => {
    const storedAnswers = sessionStorage.getItem('userAnswers');
    if (storedAnswers) {
      const answers = JSON.parse(storedAnswers);
      setUserAnswers(answers);
      compareAnswers(answers, correctAnswers);
    } else {
      router.push('/'); // Redirect to home or test start if no answers found
    }
  }, [router]);

  const compareAnswers = (userAnswers, correctAnswers) => {
    let correctCount = 0;
    let incorrectCount = 0;
    Object.entries(userAnswers).forEach(([questionId, userAnswer]) => {
      const isCorrect = Array.isArray(userAnswer)
        ? arraysEqual(userAnswer, correctAnswers[questionId])
        : userAnswer === correctAnswers[questionId];

      if (isCorrect) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }
    });
    setResults({ correct: correctCount, incorrect: incorrectCount });
  };

  const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // Sort and stringify for comparison
    a = a.slice().sort();
    b = b.slice().sort();
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  return (
    <div>
      <h1>Your Score</h1>
      <p>Correct Answers: {results.correct}</p>
      <p>Incorrect Answers: {results.incorrect}</p>
      {/* Here you can map over the user answers and correct answers to show a detailed feedback */}
      {/* ... */}
    </div>
  );
};

export default Feedback;
