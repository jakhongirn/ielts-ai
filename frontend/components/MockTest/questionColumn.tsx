import React from "react";
import mockReadingData from "./mocktests.json";
import QuestionComponent from "./questionComponent";

const QuestionColumn = ({ questionData }) => {
    return (
        <div>
            {questionData.questions?.map((question, index) => (
                <div key={index} className="mt-6">
                    <h1 id="questionNumber" className="font-semibold text-lg ">
                        Questions {question.q_numbers}
                    </h1>
                    <div id="questionInstructionsm" className="my-2">
                        {question.q_instructions.map((instruction, idx) => (
                            <p className="text-sm my-2 italic">{instruction.text}</p>
                        ))}
                    </div>
                      
                      <QuestionComponent questionData={question} />
                </div>
            ))}
        </div>
    );
};

export default QuestionColumn;
