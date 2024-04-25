import React from "react";
import Image from "next/image";
import { useFormContext } from 'react-hook-form';

const TableCompletion = ({ question }: any) => {
    const { register } = useFormContext();
    return (
        <div>
            <Image
                src={`/mock_images/${question.q_imageURL}`}
                alt="mock reading image"
                layout="responsive"
                width={1000}
                height={500}
            />
            {[...Array(question.answers)].map((_, index) => (
                
                <div className="flex items-center gap-x-2 my-2" key={index}>
                    <p className="font-bold w-4">
                        {index + Number(question.q_start)}.
                    </p>
                    <input
                    {...register(`user_answers.${index + Number(question.q_start)}`)}
                    key={index}
                    type="text"
                    
                    className=" border-2 mx-1 rounded-lg border-gray-300 focus:border-blue-500 outline-none placeholder-center"
                    style={{ width: '200px' }}
                                  />
                </div>
            ))}
        </div>
    );
};

export default TableCompletion;
