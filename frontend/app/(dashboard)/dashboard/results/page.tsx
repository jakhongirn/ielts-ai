import React from 'react'

const ResultsPage = () => {
  return (
<div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Results</h1>
          </div>
          <div className="rounded-lg border w-full p-4 bg-gray-100">
            <p className='text-center text-gray-400'>You haven't passed any test yet.</p>
          </div>
        </div>  
  )
}

export default ResultsPage