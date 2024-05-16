import React from 'react'

function NoDataMessgae({message}) {
  return (
    <div className='text-center w-full p-4 rounded-full bg-gray-100 mt-4'>
        <p>{message}</p>
    </div>
  )
}

export default NoDataMessgae