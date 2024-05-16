import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import image from '../assets/images/doctor-img01.png'
import { FaLocationDot } from "react-icons/fa6";
import { FaHospital } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import { useGetHosByIdQuery } from '@/slices/hospitalUserApiSlice';
import Slider from '@/componenets/Slider';
import { useGetDocByIdQuery } from '@/slices/doctorUserApiSlice';
import DocSuggestion from '@/componenets/DocSuggestion';
import { ScrollArea } from '@/components/ui/scroll-area';

function HospitalProfile() {
  const { id } = useParams();
  const { data: hos, error, isLoading } = useGetHosByIdQuery(id)




  const { about, businessname, city, state, instagram, phone, doctors} = hos || {}
  // console.log(hos.doctor[0])
  // console.log(hos)
  // console.log(doctors)

  return (
    <div>
      <div className="container">

        {
          hos && (
            <div className='w-full mt-10 h-auto flex flex-col md:flex-row justify-center md:justify-between gap-4 '>

              {/* LEFT DIV */}


              <div className='flex flex-col w-full gap-4 md:max-w-[60%] lg:max-w-[70%]'>
                <div className='rounded-lg border border-gray-200 p-4 flex flex-col lg:flex-row gap-4 md:gap-6 w-full '>
                  <div className='  w-full   lg:w-[70%] max-w-[500px]  rounded-2xl lg:p-3 md:mb-4 '>
                    {/* <HospitalCard user={hos} /> */}
                    {/* <img src={hos.avatar? hos.avatar : image} className='w-auto h-auto max-h-[400px]  object-cover rounded-lg sm:h-[300px]' alt="" /> */}
                    <Slider user={hos} />
                  </div>

                  <div className='pl-2 md:mt-4' >
                    <h1 className='font-[650] mt-6 lg:mt-0 line-clamp-1'>{businessname} </h1>

                    <div className='flex items-center gap-2'>
                      <p className='text-xs md:text-sm mt-2  md:leading-5 line-clamp-3 hover:font-[500]'><FaHospital /></p>
                      <h1 className='text-xs md:text-sm mt-2  md:leading-5 line-clamp-3 hover:font-[500]'> { } </h1>
                    </div>

                    <div className='flex items-center gap-2 '>
                      <p className='text-xs md:text-sm mt-2  md:leading-5 line-clamp-3 hover:font-[500] cursor-pointer'><FaLocationDot /></p>
                      <h1 className='text-xs md:text-sm mt-2  md:leading-5 line-clamp-3 hover:font-[500]  cursor-pointer'> {city}, {state} </h1>
                    </div>
                    <div className='bg-[#DFFFFD] py-1 px-2 rounded-xl w-[80px]  max-w-[120px] flex items-center justify-center mt-2 '>
                      <h1 className='text-[#4D8076] font-[700] text-sm '>{ }</h1>
                    </div>

                    <div className=' flex gap-3 mt-3 '>
                      <a href="https://maps.app.goo.gl/1VASKWaiZa7kxEh79" rel='noopener' target='_blank' className='text-xs hover:font-[800]  p-2 rounded-full border border-solid border-black hover:scale-125 hover:animate-in hover:bg-blue-300 '><CiLocationOn /></a>
                      <a href="https://maps.app.goo.gl/1VASKWaiZa7kxEh79" rel='noopener' target='_blank' className='text-xs hover:font-[800]  p-2 rounded-full border border-solid border-black hover:scale-125 hover:animate-in hover:bg-blue-300 '><IoIosCall /></a>
                      <a href="https://github.com/fireclint/react-tailwind-slider" rel='noopener' target='_blank' className='text-xs hover:font-[800]  p-2 rounded-full border border-solid border-black hover:scale-125 hover:animate-in hover:bg-blue-300 '><FaInstagram /></a>
                    </div>
                    {/* <button className='rounded-2xl border-2 border-blue-400 hover:border-blue-600 hover:bg-blue-50 mt-6 text-sm p-2 line-clamp-1'>Book appointment</button> */}
                  </div>
                </div>


                <div className='rounded-lg border border-gray-200 p-4 flex flex-col gap-4 w-full' >
                  <h1 className='font-[650] text-sm'>About Us</h1>
                  <p>{about}</p>
                </div>

                <div className='rounded-lg border border-gray-200 p-4 flex flex-col gap-4 w-full' >
                  <h1 className='font-[650] text-sm'>About Me</h1>
                  <p>{about}</p>
                </div>


                <div className='rounded-lg border border-gray-200 p-4 flex flex-col gap-4 w-full' >
                  <h1 className='font-[650] text-sm'>About me</h1>
                </div>
              </div>


              {/* RIGHT DIV */}
              <div className=' static md:sticky md:top-[140px]  min-h-[200px] h-[80vh] md:max-h-[570px] w-full md:max-w-[35%] lg:max-w-[30%] xl:max-w-[25%] border border-gray-200 rounded-lg py-4 pl-4 pr-1'>
                <h1 className='font-[650] text-sm mb-2'>Our Doctors</h1>
                <ScrollArea  className=" h-[97%]  " >
                  <div className='pr-3 h-full   '>

                  {
                    doctors.map(doctor => (
                      
                      <DocSuggestion key={doctor._id} doctor={doctor} />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          )
        }


      </div>
    </div>
  )
}

export default HospitalProfile;