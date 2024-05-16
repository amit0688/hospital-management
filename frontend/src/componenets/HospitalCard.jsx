import React from 'react'
import Slider from './Slider';
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';


function HospitalCard({ user }) {
  return (
    <>
    <div className='max-w-[520px] max-h-[550px] rounded-lg shadow-lg flex flex-col p-4 bg-slate-200'>
      <div className=''>
        <Slider user={user} />
      </div>

    <Link to={`/hospital/${user._id}`}>

      <div className='flex flex-col gap-2 mt-8'>
        <div className='flex justify-between'>

        <p className='font-[650] text-lg text-headingColor'>{user.businessname}</p>
        <h2 className=''>Rating</h2>
        </div>
        <div className='flex items-center gap-2'>   
            <p className='text-xs md:leading-5 line-clamp-3 hover:font-[500]'><FaLocationDot /></p>
            <h1 className='text-xs text-textColor font-[500] md:leading-5 line-clamp-3 hover:font-[500]'> {user.city}</h1>
            </div>
      </div>
    </Link>
    </div>
    </>
  )
}

export default HospitalCard