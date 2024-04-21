import React, { useState } from "react";

const OneMultipleChoice = ({ question }) => {
    // State to hold the selected answer
    const [selectedAnswer, setSelectedAnswer] = useState("");

    // Handler for when an option is selected
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const answer = event.target.value;
        setSelectedAnswer(answer);
    };

    return (
        <div>
            {question.question_choices.map((q, idx) => (
                <div className="flex flex-col my-2">
                    <p className="mb-1 font-semibold">{q.q_number}. {q.q_title}</p>
                    {q.choices.map((choice, index) => (
                        <label key={index} className="flex items-center mb-1">
                            <input
                                type="radio"
                                name="multiple-choice"
                                value={choice.choice_id}
                                checked={selectedAnswer === choice.choice_id}
                                onChange={handleOptionChange}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="ml-2 w-full">{choice.choice_text}</span>
                        </label>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default OneMultipleChoice;
