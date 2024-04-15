import React from 'react'

const MockHeader = () => {
  return (
    <div>
        
        <div className='w-full px-8 py-6 bg-white shadow-md flex justify-between'>
            <div>
                <h1>LOGO</h1>
            </div>
            <div>
                
               <span className='font-bold text-lg'>60</span> <span className='text-sm -ml-1'>minutes remaining</span>
            </div>

            <div>
                <button className='bg-blue-500 text-white text-xl'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default MockHeader