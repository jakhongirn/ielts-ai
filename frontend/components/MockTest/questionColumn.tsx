'use client';
import React from 'react'
import MatchingHeading from './questionTypes/matchingHeading'
import IdentifyInformation from './questionTypes/identifyInformation'
import MoreMultipleChoice from './questionTypes/moreMultipleChoice'
import OneMultipleChoice from './questionTypes/oneMultipleChoice'
import SentenceCompletion from './questionTypes/sentenceCompletion'
import TableCompletion from './questionTypes/tableCompletion'

import {useForm, SubmitHandler, FormProvider} from 'react-hook-form';


type UserAnswerData = {
    [questionId: string]: string; 
}

const QuestionColumn = ({ questionData, fontColor }) => {

    const QuestionComponent = ({questionData}: any) => {
        switch(questionData.type) {
          case 'matching-heading':
              return <MatchingHeading question={questionData} {...methods} />
          case 'identify-information':
              return <IdentifyInformation question={questionData} {...methods} />
          case 'multiple-choice-more':
              return <MoreMultipleChoice question={questionData} {...methods}/>
          case 'multiple-choice-one':
              return <OneMultipleChoice question={questionData} {...methods}/>
          case 'sentence-completion':
              return <SentenceCompletion question={questionData} {...methods}/>
          case 'table-completion':
              return <TableCompletion question={questionData} {...methods}/>
          default:
              return <div>Input field</div>
        }
    }
    const methods = useForm<UserAnswerData>();
    const {
        handleSubmit,
    } = methods;
    
    const onSubmit: SubmitHandler<UserAnswerData> = (data) => {
        // const processedData: UserAnswerData = {};

        // Object.entries(data).forEach(([key, value]) => {
        //     processedData[key] = String(value.trim().toLowerCase());
        // })

        // console.log(processedData);

        console.log(data);
    };
    
    return (
        <div>
            <FormProvider {...methods} >
            <form onSubmit={handleSubmit(onSubmit)}>
            {questionData.questions?.map((question, index) => (
                <div key={index} className="mt-6">
                    <h1 id="questionNumber" className={`font-semibold text-lg ${fontColor}`}>
                        Questions {question.q_numbers}
                    </h1>
                    <div id="questionInstructionsm" className="my-2">
                        {question.q_instructions.map((instruction, idx) => (
                            <p key={idx} className="text-sm my-2 italic">{instruction.text}</p>
                        ))}
                    </div>
                      <QuestionComponent questionData={question} {...methods} />
                </div>
            ))}
            <input className='border-black border-2 rounded-lg p-4' type="submit" />
            </form>
            </FormProvider>
        </div>
    );
};

export default QuestionColumn;




