import React from 'react'
import MatchingHeading from './matchingHeading'
import IdentifyInformation from './identifyInformation'
import MultiChoiceMore from './multiChoiceMore'

const QuestionComponent = ({questionData}: any) => {
  switch(questionData.type) {
    case 'matching-heading':
        return <MatchingHeading question={questionData} />
    case 'identify-information':
        return <IdentifyInformation question={questionData} />
    case 'multiple-choice-more':
        return <MultiChoiceMore question={questionData} />
  }
}

export default QuestionComponent