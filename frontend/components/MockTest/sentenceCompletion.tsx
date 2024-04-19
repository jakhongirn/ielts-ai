import React, { useState } from 'react';

interface SentencePart {
  inputId?: string;
  correctAnswer?: string;
}

const SentenceCompletion = ({question}: any) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleInputChange = (inputId: string, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [inputId]: value
    }));
  };

  

  return (
    <div className="py-2">
      {question.sentences.map((sentence, sentenceIndex) => (
        <div key={sentenceIndex} className="">
          {sentence.parts.map((part, partIndex) => {
            const key = `sentence-${sentenceIndex}-part-${partIndex}`;
            if (typeof part === 'string') {
              return (
                <span key={key} className="text-base inline">
                  {part}
                </span>
              );
            } else {
              return (
                <input
                  key={key}
                  type="text"
                  placeholder={part.inputId}
                  value={answers[part.inputId || ''] || ''}
                  onChange={(e) => handleInputChange(part.inputId || '', e.target.value)}
                  className="inline border-2 mx-1 rounded-lg border-gray-300 focus:border-blue-500 outline-none placeholder-center"
                  style={{ width: '120px' }}
                />
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default SentenceCompletion;
