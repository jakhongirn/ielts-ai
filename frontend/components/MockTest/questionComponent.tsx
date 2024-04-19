import React from 'react'
import MatchingHeading from './matchingHeading'
import IdentifyInformation from './identifyInformation'
import MoreMultipleChoice from './moreMultipleChoice'
import OneMultipleChoice from './oneMultipleChoice'
import SentenceCompletion from './sentenceCompletion'
import TableCompletion from './tableCompletion'

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

export default QuestionComponent