import React from 'react'
import defaultPic from '../assets/images/defaultPic.jpg'
import { LocateIcon } from 'lucide-react'
import { FaCity } from 'react-icons/fa6'
import { CiLocationOn } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";



function UserAppointment({ appointment }) {

    const date = appointment?.appointmentDate

    // console.log(date)

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };
      
      const formattedDate = formatDate(date);
    //   console.log(formattedDate)
  return (
    
    <div className='bg-white rounded-lg max-w-[400px] h-auto  p-4 shadow-lg border'>
        <div className='pb-3 border-b'>
            <h1 className='font-[600] '>{formattedDate} - {appointment.timeSlot}</h1>
        </div>

        <div className=' flex gap-6 py-4 border-b'>
            <div className=' '>
                <img src={ appointment.doctor.avatar ? appointment.doctor.avatar : defaultPic} className='h-[100px] w-[100px] rounded-lg' alt="" />
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <h1 className='font-[600] '>Dr. {appointment.doctor.fullname}</h1>

                <div className='flex items-center gap-1'>   
            <p className='text-xs mt-2  md:leading-5 line-clamp-3 '><FaLocationDot /></p>
            <h1 className='text-xs mt-2  md:leading-5 line-clamp-3 '> {appointment.doctor.address} </h1>
            </div>

                
                <p className='text-sm text-textColor '> {appointment._id} </p>
            </div>
        </div>

        <div className='w-full flex justify-between mt-4'>
            <button className='bg-blue-100 font-[500] px-10  text-blue-600 py-3 w-[45%] rounded-full'>
                Cancel
            </button> 
            <button className='bg-blue-600 text-white  px-10 py-3 w-[45%] rounded-full'>
                Reschedule
            </button> 
        </div>

    </div>
  )
}

export default UserAppointment