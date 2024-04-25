import React from 'react';
import { useFormContext } from 'react-hook-form';

interface SentencePart {
  inputId: string;
  correctAnswer?: string;
}

interface SentenceCompletionProps {
  question: {
    sentences: Array<{
      parts: Array<string | SentencePart>;
    }>;
  };
}

const SentenceCompletion: React.FC<SentenceCompletionProps> = ({ question }) => {
  const { register } = useFormContext();

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
              const inputId = `user_answers.${part.inputId}`;
              return (
                <input
                  key={key}
                  type="text"
                  {...register(inputId)} // Register input with react-hook-form
                  placeholder={part.inputId}
                  className="inline border-2 mx-1 rounded-lg border-gray-300 focus:border-blue-500 outline-none text-center"
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
