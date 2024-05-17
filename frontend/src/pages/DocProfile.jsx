import React from 'react'
import { useParams } from 'react-router-dom';
import image from '../assets/images/doctor-img01.png'
import { FaLocationDot } from "react-icons/fa6";
import { FaHospital } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import { useGetDocByIdQuery, useSuggestDocSecializationQuery } from '@/slices/doctorUserApiSlice';
import Booking from './Booking';
import { useSelector, useDispatch } from "react-redux"
import defaultPic from '../assets/images/defaultPic.jpg'
import { ScrollArea } from '@/components/ui/scroll-area';
import DocSuggestion from '@/componenets/DocSuggestion';


function DocProfile() {
  const { userInfo } = useSelector((state) => state.auth)
  const { id } = useParams();
  const { data: doctor, error, isLoading } = useGetDocByIdQuery(id)
  const { age, about, experience, hospitalname, city, state, specialization, instagram, phone, _id } = doctor || {}
  console.log(_id)
  const { data: suggestedDoctors = [], } = useSuggestDocSecializationQuery({ specialization, currentDoctorId: _id });
  console.log(suggestedDoctors)
  return (
    <div>
      <div className="container">

        {
          doctor && (
            <div className='w-full mt-10 h-auto flex flex-col md:flex-row justify-center md:justify-between gap-4 '>


              {/* LEFT DIV */}


              {
                // userInfo._id === doctor._id ? (<button>Hello</button>) : ""
              }


              <div className='flex flex-col w-full gap-4 md:max-w-[60%] lg:max-w-[70%]'>

                <div className='rounded-lg border border-gray-200 p-4 flex flex-col md:flex-row gap-4 md:gap-8 w-full '>
                  <div className=' rounded-md sm:max-w-[60%] '>
                    <img src={doctor.avatar ? doctor.avatar : defaultPic} className='w-auto h-auto max-h-[400px] border-2  object-cover rounded-lg sm:h-[300px]' alt="" />
                  </div>

                  <div className='pl-2 md:mt-4' >
                    <h1 className='font-[650] line-clamp-1'>Dr. {doctor.fullname} </h1>

                    <div className='flex items-center gap-2'>
                      <p className='text-xs md:text-sm mt-2  md:leading-5 line-clamp-3 hover:font-[500]'><FaHospital /></p>
                      <h1 className='text-xs md:text-sm mt-2  md:leading-5 line-clamp-3 hover:font-[500]'> {hospitalname} </h1>
                    </div>

                    <div className='flex items-center gap-2 '>
                      <p className='text-xs md:text-sm mt-2  md:leading-5 line-clamp-3 '><FaLocationDot /></p>
                      <h1 className='text-xs md:text-sm mt-2  md:leading-5 line-clamp-3  '> {city}, {state} </h1>
                    </div>
                    <div className='bg-[#DFFFFD] py-1 px-2 rounded-xl w-[80px]  max-w-[120px] flex items-center justify-center mt-2 '>
                      <h1 className='text-[#4D8076] font-[700] text-sm '>{specialization}</h1>
                    </div>

                    <div className=' flex gap-3 mt-3 '>
                      <a href="https://maps.app.goo.gl/1VASKWaiZa7kxEh79" rel='noopener' target='_blank' className='text-xs hover:font-[800]  p-2 rounded-full border border-solid border-black hover:scale-125 hover:animate-in hover:bg-blue-300 '><CiLocationOn /></a>
                      <a href="https://maps.app.goo.gl/1VASKWaiZa7kxEh79" rel='noopener' target='_blank' className='text-xs hover:font-[800]  p-2 rounded-full border border-solid border-black hover:scale-125 hover:animate-in hover:bg-blue-300 '><IoIosCall /></a>
                      <a href="https://github.com/fireclint/react-tailwind-slider" rel='noopener' target='_blank' className='text-xs hover:font-[800]  p-2 rounded-full border border-solid border-black hover:scale-125 hover:animate-in hover:bg-blue-300 '><FaInstagram /></a>
                    </div>
                    {/* <button className='rounded-2xl border-2 border-blue-400 hover:border-blue-600 hover:bg-blue-50 mt-6 text-sm p-2 line-clamp-1'>Book appointment</button> */}
                    <Booking doctor={doctor} />
                  </div>



                </div>
                <div className='rounded-lg border border-gray-200 p-4 flex flex-col gap-4 w-full' >
                  <h1 className='font-[650] text-sm'>About Me</h1>
                  <p>{about}</p>
                </div>

                <div className='rounded-lg border border-gray-200 p-4 flex flex-col gap-4 w-full ' >
                  <h1 className='font-[650] text-sm'>Working hours</h1>



                  <div className=''>
                    <div className='flex gap-4 w-full md:w-[80%] justify-between'><p className='text-md font-[550]'>Days</p>
                      <p className='text-xs md:text-md font-[550]'>Morning</p>
                      <p className='text-xs md:text-md font-[550]'>Evening</p>
                    </div>
                  </div>
                  <div className=''>
                    <div className='flex gap-4 w-full md:w-[80%] justify-between'><p className='text-sm'>Sunday</p>
                      <p className='text-xs md:text-sm'>8:00 am - 1:00 pm</p>
                      <p className='text-xs md:text-sm'>4:00 am - 1:00 pm</p>
                    </div>
                  </div>
                  <div className=''>
                    <div className='flex gap-4 w-full md:w-[80%] justify-between'><p className='text-sm'>Monday</p>
                      <p className='text-xs md:text-sm'>8:00 am - 1:00 pm</p>
                      <p className='text-xs md:text-sm'>4:00 am - 1:00 pm</p>
                    </div>
                  </div>
                  <div className=''>
                    <div className='flex gap-4 w-full md:w-[80%] justify-between'><p className='text-sm'>Tuesday</p>
                      <p className='text-xs md:text-sm'>8:00 am - 1:00 pm</p>
                      <p className='text-xs md:text-sm'>4:00 am - 1:00 pm</p>
                    </div>
                  </div>
                  <div className=''>
                    <div className='flex gap-4 w-full md:w-[80%] justify-between'><p className='text-sm'>Wednesday</p>
                      <p className='text-xs md:text-sm'>8:00 am - 1:00 pm</p>
                      <p className='text-xs md:text-sm'>4:00 am - 1:00 pm</p>
                    </div>
                  </div>
                  <div className=''>
                    <div className='flex gap-4 w-full md:w-[80%] justify-between'><p className='text-sm'>Thursday</p>
                      <p className='text-xs md:text-sm'>8:00 am - 1:00 pm</p>
                      <p className='text-xs md:text-sm'>4:00 am - 1:00 pm</p>
                    </div>
                  </div>
                  <div className=''>
                    <div className='flex gap-4 w-full md:w-[80%] justify-between'><p className='text-sm'>Friday</p>
                      <p className='text-xs md:text-sm'>8:00 am - 1:00 pm</p>
                      <p className='text-xs md:text-sm'>4:00 am - 1:00 pm</p>
                    </div>
                  </div>
                  <div className=''>
                    <div className='flex gap-4 w-full md:w-[80%] justify-between'><p className='text-sm'>Saturday</p>
                      <p className='text-xs md:text-sm'>8:00 am - 1:00 pm</p>
                      <p className='text-xs md:text-sm'>4:00 am - 1:00 pm</p>
                    </div>
                  </div>
                </div>

                {/* <div className='rounded-lg border border-gray-200 p-4 flex flex-col gap-4 w-full' >
              <h1 className='font-[650] text-sm'>About me</h1>
              </div> */}
              </div>


              {/* RIGHT DIV */}
              <div className=' static md:sticky md:top-[140px]  min-h-[200px] h-[80vh] md:max-h-[570px] w-full md:max-w-[35%] lg:max-w-[30%] xl:max-w-[25%] border border-gray-200 rounded-lg py-4 pl-4 pr-1'>

                <h1 className='font-[650] text-sm'>Suggestions</h1>
                <ScrollArea className=" h-[97%]  " >
                  <div className='pr-3 h-full   '>

                    {
                      suggestedDoctors.map(suggestedDoctor => (

                        <DocSuggestion key={suggestedDoctor._id} doctor={suggestedDoctor} />
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

export default DocProfile