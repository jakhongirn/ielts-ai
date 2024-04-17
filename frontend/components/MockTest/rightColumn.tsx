import React from 'react'
import mockReadingData from './mocktests.json'

const QuestionsColumn = () => {

    
  return (
    <div>
        <h1 id="questionNumber" className="font-semibold text-lg">Question 1-6</h1>
                    <div id="questionInstructions">
                    <p className="text-sm">Reading Passage has six paragraphs, A-F</p>

                    <p className="text-sm">Choose the correct heading for each paragraph from the list below.</p>

                    <p className="text-sm">Write the correct number, i-ix, in boxes 1-6 on your answer sheet.</p>
                    </div>

                    <div id="questionContext" className="border rounded-lg my-4 py-4 px-4">
                        <h1 className="font-semibold mb-2">List of headings</h1>
                        
                        

                        
                        

                    </div>
    </div>
  )
}

export default QuestionsColumn