import React from 'react';
import { useFormContext } from 'react-hook-form';  // Import useFormContext to access form methods

const MoreMultipleChoice = ({ question }) => {
    const { register } = useFormContext();  // Use useFormContext to access `register`

    return (
        <div>
            <div className="flex flex-col space-y-2">
                {question.choices?.map((choice, idx) => (
                    <div key={idx} className="flex justify-start items-center gap-x-2">
                        <p className="font-bold w-5">{choice.q_id}.</p>
                        <div className="w-full flex items-center">
                            <input
                                type="checkbox"
                                {...register(`user_answers.${question.q_numbers}`)}
                                value={choice.q_id}  // Set the value attribute to the choice ID
                                id={`option-${choice.q_id}`}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                        </div>
                            <label htmlFor={choice.q_id} className="ml-2 w-full">{choice.q_text}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoreMultipleChoice;
