import React from 'react'
import Timer from './timer'
import { log } from 'console'

const MockHeader = () => {
  return (
    <div>
        
        <div className='w-full px-8 py-4 bg-white shadow-md flex justify-between fixed z-10'>
            <div>
                <h1>Examiner.uz</h1>
            </div>
            <div>
                
               <Timer duration={60} onTimeUp={() => {console.log("Time is up!")}}  />
            </div>

            <div>
                <button className='bg-blue-500 px-3 py-1 text-white rounded-xl'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default MockHeader