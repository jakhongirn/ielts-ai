import React from 'react'

const MatchingHeading = ({question} :any) => {
  return (
    <div id="matchingHeading">

                    <div
                        id="questionContext"
                        className="border rounded-lg my-4 py-4 px-4"
                    >
                        <h1 className="font-semibold mb-2">
                            {question.titleHeading}
                        </h1>
                        
                        {question.headings.map((heading, idx) => (
                            <div className="flex gap-x-2" key={idx}>
                                <p className="font-bold w-5">{heading.h_id}.</p>
                                <p>
                                    {heading.h_text}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div id="questionAnswers">
                        {question.q_answers.map((answer, q_number) => (
                          <div key={q_number} className="flex gap-x-2 my-2">
                            <p>{answer.q_number}.</p>
                            <input  type="text" className="w-14 h-8 rounded-lg px-1 bg-gray-100"/>
                            <p>{answer.q_text}</p>
                            
                          </div>

                        ))}
                    </div>

                    </div>
  )
}

export default MatchingHeading