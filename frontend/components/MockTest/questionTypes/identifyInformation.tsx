import React, {useState} from "react";
import {useFormContext} from "react-hook-form";

const IdentifyInformation = ({ question }: any) => {
    // Define the answer types based on the question type (TRUE/FALSE or YES/NO)
    let answerTypes;
    if (question.isAnswerTypeTrueFalse) {
        answerTypes = ["TRUE", "FALSE", "NOT GIVEN"];
    } else {
        answerTypes = ["YES", "NO", "NOT GIVEN"];
    }

    const [value, setValue] = useState('');

  // Handler for when the dropdown value changes
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  }

  const {register} = useFormContext();

    return (
        <div>
            <div id="description" className="border rounded-lg px-4 py-2">
                <div className="flex my-4">
                    <div className="font-semibold w-28 mx-1">{answerTypes[0]}</div>
                    <div className="w-full">
                        if the statement agrees with the information given in
                        the text
                    </div>
                </div>
                <div className="flex my-4">
                    <div className="font-semibold w-28 mx-1">{answerTypes[1]}</div>
                    <div className="w-full">
                        if the statement contradicts the information
                    </div>
                </div>
                <div className="flex my-4">
                    <div className="font-semibold w-28 mx-1">{answerTypes[2]}</div>
                    <div className="w-full">if there is no information on this</div>
                </div>
            </div>

            {question.question_texts.map((question_text, idx) => (
                <div key={idx} className="flex gap-x-2 my-2">
                    <p className="font-bold w-5">{question_text.q_number}.</p>
                    <div className="w-24">
                        <select
                            {...register(`user_answers.${question_text.q_number}`)}
                            className="block w-full px-1 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value=""></option>
                            {answerTypes.map((answer, idx) => (
                                <option key={idx} value={answer}>
                                    {answer}
                                </option>
                            ))}
                        </select>
                    </div>
                    <p className="w-full">{question_text.q_text}</p>
                    
                </div>
            ))}
        </div>
    )
};

export default IdentifyInformation;