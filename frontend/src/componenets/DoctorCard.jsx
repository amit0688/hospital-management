import React from 'react'
// import doc from '../assets/images/doctor-img01.png'
import { CiLocationOn } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { FaHospital } from "react-icons/fa";

import defaultPic from '../assets/images/defaultPic.jpg'

import { Link } from 'react-router-dom';


function DoctorCard({user}) {
  return (
    <>


      <div className='flex rounded-lg p-4 w-full max-w-[600px] bg-slate-100 gap-4 md:gap-8 cursor-pointer hover:bg-slate-200 border-2 border-blue-100'>

        <Link to={`/doctor/${user._id}`}><div className='flex flex-col items-center gap-3'>
          <img src={user.avatar? user.avatar : defaultPic} alt="" className='rounded-full h-[100px]  w-[100px] object-cover ' />
          <div className='bg-[#DFFFFD] py-1 px-2 rounded-sm w-[100px] flex items-center justify-center '>
            <h1 className='text-[#4D8076] font-[700] text-sm '>{user.specialization ? user.specialization : "Blank" }</h1>
          </div>
        </div>
        </Link>

        <div className='w-[100%] flex flex-col '>
          <div>
            <h1 className='font-[650] line-clamp-1'>Dr. {user.fullname}</h1>

            <div className='flex items-center gap-2'> 
            <p className='text-xs mt-2  md:leading-5 line-clamp-3 '><FaHospital /></p>
            <h1 className='text-xs mt-2  md:leading-5 line-clamp-3 '> {user.hospitalname} </h1>
            </div>

            <div className='flex items-center gap-2'>   
            <p className='text-xs mt-2  md:leading-5 line-clamp-3 '><FaLocationDot /></p>
            <h1 className='text-xs mt-2  md:leading-5 line-clamp-3 '> {user.city}, {user.state} </h1>
            </div>

            {/* <div className='flex items-center mt-2'>
              <CiStar />
              <CiStar />
              <CiStar />
              <CiStar />
              <CiStar />
              <p className='text-xs'> (200)</p>
            </div> */}
          </div>


          <div className='flex items-center'>
            <p className='mt-2 text-sm'><span className='font-[600] pl-1 pr-1'>&#8377;</span> {user.fee ? user.fee : 100} / {user.feeType ? user.feeType : "" } </p>
          </div>
        </div>


        <div className=' flex flex-col gap-3 '>
          <a href={user.location} rel='noopener' target='_blank' className='text-xs hover:font-[800]  p-2 rounded-full border border-solid border-black hover:scale-125 hover:animate-in hover:bg-blue-300 '><CiLocationOn /></a>
          <a href={`tel:+91${user.phone}`} rel='noopener' target='_blank' className='text-xs hover:font-[800]  p-2 rounded-full border border-solid border-black hover:scale-125 hover:animate-in hover:bg-blue-300 '><IoIosCall /></a>
          <a href={user.instagram} rel='noopener' target='_blank' className='text-xs hover:font-[800]  p-2 rounded-full border border-solid border-black hover:scale-125 hover:animate-in hover:bg-blue-300 '><FaInstagram /></a>
        </div>


      </div>
    </>
  )
}

export default DoctorCard