import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSelector, useDispatch } from "react-redux"

import UserAppointment from '@/componenets/UserAppointment';
import { useGetAppointmentsQuery } from '@/slices/patientSlice';
import Loader from '@/componenets/Loader';
import NoDataMessgae from '@/componenets/NoDataMessgae';


function UserBookings() {
  const { userInfo } = useSelector((state) => state.auth)
  const id = userInfo._id 
  // console.log(userInfo._id)

  const { data: appointments, isLoading, isError, refetch } = useGetAppointmentsQuery(id);
  // console.log(data)
  return (
    <div>
        <div className='container'>
        <div className=' mt-10  w-full  rounded-lg py-4 pl-4 pr-1'>
                <h1 className='font-[650] text-sm mb-6 pl-4'>Appointments</h1>
                  <div className='pr-3 h-full flex gap-3  '>
                    {isLoading ? (<Loader />) : (appointments.length ?
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-12'>
                    {appointments && appointments.map(appointment => (
                <UserAppointment key={appointment._id} appointment={appointment} />
                     
              ))}
              </div>
              : <NoDataMessgae message="No appointments available" />)
            }
                  </div>
              </div>
        </div>
    </div>
  )
}

export default UserBookings