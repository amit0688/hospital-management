import React from 'react'
import defaultPic from '../assets/images/defaultPic.jpg'
import { FaLocationDot } from "react-icons/fa6";

function UserAppointment({ appointment }) {
    const date = appointment?.appointmentDate;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const formattedDate = formatDate(date);

    return (
        <div className='bg-white rounded-lg max-w-[400px] h-auto p-4 shadow-lg border'>
            <div className='pb-3 border-b'>
                <h1 className='font-[600]'>{formattedDate} - {appointment?.timeSlot}</h1>
            </div>

            <div className='flex gap-6 py-4 border-b'>
                <div>
                    <img src={appointment?.doctor?.avatar ? appointment.doctor.avatar : defaultPic} className='h-[100px] w-[100px] rounded-lg' alt="Doctor's Avatar" />
                </div>
                <div className='flex flex-col gap-1 mt-2'>
                    <h1 className='font-[600]'>Dr. {appointment?.doctor?.fullname}</h1>
                    <div className='flex items-center gap-1'>
                        <FaLocationDot />
                        <h1 className='text-xs mt-2 md:leading-5 line-clamp-3'>{appointment?.doctor?.address}</h1>
                    </div>
                    <p className='text-sm text-textColor'>{appointment?._id}</p>
                </div>
            </div>
        </div>
    );
}

export default UserAppointment;
