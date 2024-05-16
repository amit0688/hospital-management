import React from 'react'
import { Link } from 'react-router-dom';
import image from '../assets/images/doctor-img01.png'

function DocSuggestion({doctor}) {
    return (

        <Link to={`/doctor/${doctor._id}`}><div className='w-full border rounded-lg h-[110px] cursor-pointer flex gap-4 mt-4 p-4 '>
        <div>
          <img src={doctor.avatar? doctor.avatar : image} alt=""  className='h-16 w-16 rounded-full object-cover' />
        </div>

        

        <div>
            <h1 className='text-sm leading-6 pl-2 font-[600] line-clamp-1'>Dr. {doctor.fullname}</h1>
            <p className='text-sm leading-6 pl-2'>12 years</p>
            <div className='bg-[#DFFFFD] py-1 px-1 rounded-xl w-[80px]  max-w-[120px] flex items-center justify-center mt-1 '>
                <h1 className='text-[#4D8076] font-[500] text-xs '>{doctor.specialization}</h1>
            </div>
        </div>
      </div></Link>
    )
}

export default DocSuggestion;