import React, { useState } from "react";

const MoreMultipleChoice = ({ question }: any) => {
    // State to hold the values of the checkboxes
    const [isChecked, setIsChecked] = useState({
        option1: false,
        option2: false,
        option3: false,
    });

    // Handler to update the specific checkbox's state
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setIsChecked((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };
    return (
        <div>
            <div className="flex flex-col space-y-2 ">
                {question.question_texts.map((answer: any, idx: number) => (
                    <div key={idx} className="flex justify-start  items-center gap-x-2">
                        <p className="font-bold w-5">{answer.q_id}.</p>
                        <div className="w-full flex items-center">
                            <input
                                type="checkbox"
                                name="option1"
                                checked={isChecked.option1}
                                onChange={handleChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="option1" className="ml-2">{answer.q_text}</label>
                            
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoreMultipleChoice;
