import React from "react";
import Image from 'next/image';



const WritingTask1 = ({questionData}) => {
    return (
        <div id="taskPart">
            {questionData.q_instructions.map((instruction, index) => (
                <div key={index}>
                    <p className="my-2 text-sm">
                {instruction.text}
            </p>
                </div>
            ))}

            {questionData.type ==="task-1" ? (<div>
                <Image
                    src={`/mock_images/${questionData.q_imageURL}`}
                    alt="task 1"
                    layout="responsive"
                    width={1000}
                    height={500}
                    />
            </div>) : null}
        </div>
    );
}

export default WritingTask1;
