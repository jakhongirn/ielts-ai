import React from 'react'

const MockHeader = () => {
  return (
    <div>
        
        <div className='w-full px-8 py-4 bg-white shadow-md flex justify-between fixed z-10'>
            <div>
                <h1>LOGO</h1>
            </div>
            <div>
                
               <span className='font-bold text-lg'>60</span><span className='text-sm'>minutes remaining</span>
            </div>

            <div>
                <button className='bg-blue-500 text-white text-xl'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default MockHeader