import React from 'react'
import MatchingHeading from './questionTypes/matchingHeading'
import IdentifyInformation from './questionTypes/identifyInformation'
import MoreMultipleChoice from './questionTypes/moreMultipleChoice'
import OneMultipleChoice from './questionTypes/oneMultipleChoice'
import SentenceCompletion from './questionTypes/sentenceCompletion'
import TableCompletion from './questionTypes/tableCompletion'

const QuestionColumn = ({ questionData }) => {

    const QuestionComponent = ({questionData}: any) => {
        switch(questionData.type) {
          case 'matching-heading':
              return <MatchingHeading question={questionData} />
          case 'identify-information':
              return <IdentifyInformation question={questionData} />
          case 'multiple-choice-more':
              return <MoreMultipleChoice question={questionData} />
          case 'multiple-choice-one':
              return <OneMultipleChoice question={questionData} />
          case 'sentence-completion':
              return <SentenceCompletion question={questionData} />
          case 'table-completion':
              return <TableCompletion question={questionData} />
          default:
              return <div>Input field</div>
        }
      }

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




