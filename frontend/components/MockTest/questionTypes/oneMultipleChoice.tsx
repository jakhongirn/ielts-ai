import React from 'react';
import { useFormContext } from 'react-hook-form';

const OneMultipleChoice = ({ question }) => {
    const { register } = useFormContext();
  
    const radioGroupName = `user_answers.${question.q_number}`;
  
    return (
      <div>
        <div className="flex flex-col my-2">
          <p className="mb-1 font-semibold">{question.q_number}. {question.q_title}</p>
          {question.choices.map((choice, index) => (
            <label key={index} className="flex items-center mb-1">
                <span className='font-bold mr-1'>{choice.choice_id}</span>
              <input
                {...register(radioGroupName)} // The name is now unique for each question
                type="radio"
                value={choice.choice_id}
                id={`choice-${question.q_number}-${choice.choice_id}`} // Unique ID for each input
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 w-full">{choice.choice_text}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

const OneMultipleChoiceGroup = ({ question }) => {
    return (
        <div>
            <div className="flex flex-col my-2">
                {question.question_choices.map((choice, index) => (
                    <OneMultipleChoice key={index} question={choice} />
                ))}
            </div>
        </div>
    );

}



  
  export default OneMultipleChoiceGroup