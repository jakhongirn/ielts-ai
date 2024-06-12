import React from 'react';

interface FeedbackProps {
  response: string;
}

const WritingFeedback: React.FC<FeedbackProps> = ({ response }) => {
  // Parse the response to create sections
  const parseResponse = (response: string) => {
    const sections = response.split('\n\n');
    const task1Feedback = sections.slice(0, 6).join('\n\n');
    const overallBandScore = sections[6];
    const task2Feedback = sections.slice(7).join('\n\n');
    
    return {
      task1Feedback,
      overallBandScore,
      task2Feedback,
    };
  };

  const { task1Feedback, overallBandScore, task2Feedback } = parseResponse(response);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Writing Task Feedback by AI</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Task 1 Feedback</h3>
        <pre className="whitespace-pre-wrap">{task1Feedback}</pre>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Overall Band Score</h3>
        <p>{overallBandScore}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Task 2 Feedback</h3>
        <pre className="whitespace-pre-wrap">{task2Feedback}</pre>
      </div>
    </div>
  );
};

export default WritingFeedback;
