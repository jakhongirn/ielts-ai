import React from 'react'
import MatchingHeading from './matchingHeading'
import IdentifyInformation from './identifyInformation'

const QuestionComponent = ({questionData}: any) => {
  switch(questionData.type) {
    case 'matching-heading':
        return <MatchingHeading question={questionData} />
    case 'identify-information':
        return <IdentifyInformation question={questionData} />
  }
}

export default QuestionComponent