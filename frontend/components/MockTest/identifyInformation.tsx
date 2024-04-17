import React from 'react'

const IdentifyInformation = ({question}:any) => {
  return (
    <div>
        <div id="description" className='flex my-4'>
            <div className='font-semibold w-14'>YES.</div>
            <div className=''>if the statment agrees with the views of the writer</div>
            <div className='font-semibold w-14'>NO.</div>
            <div className=''>if the statment agrees with the views of the writer</div>
            <div className='font-semibold w-14'>NOT GIVEN.</div>
            <div className=''>if the statment agrees with the views of the writer</div>
        </div>
    </div>
  )
}

export default IdentifyInformation