import React from 'react';
import { useFormContext } from 'react-hook-form';  // Import useFormContext to access form methods

const MoreMultipleChoice = ({ question }: any) => {
    const { register } = useFormContext();  // Use useFormContext to access `register`

    return (
        <div>
            <div className="flex flex-col space-y-2">
                {question.options?.map((answer: any, idx: number) => (
                    <div key={idx} className="flex justify-start items-center gap-x-2">
                        <p className="font-bold w-5">{answer.q_id}.</p>
                        <div className="w-full flex items-center">
                            <input
                                type="checkbox"
                                {...register(`options.${answer.q_id}`)}  // Use register to integrate input with form
                                id={`option-${answer.q_id}`}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor={`option-${answer.q_id}`} className="ml-2 w-full">{answer.q_text}</label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoreMultipleChoice;
