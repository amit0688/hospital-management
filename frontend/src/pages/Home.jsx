import React from 'react'
import docImg from '../assets/images/hero-img01.png';
import "../app.css";
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react'
import doctor from "../assets/json/doctor.json"
import { useGetDoc5Query } from '@/slices/doctorUserApiSlice';
import { Hospital } from 'lucide-react';
import { useGetHos5Query } from '@/slices/hospitalUserApiSlice';
import DoctorCard from '@/componenets/DoctorCard';
import HospitalCard from '@/componenets/HospitalCard';
import NoDataMessgae from '@/componenets/NoDataMessgae';
import Loader from '@/componenets/Loader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"



function Home() {
  const { data: doctors, isLoading } = useGetDoc5Query()
  const { data: hospitals } = useGetHos5Query()
  console.log(doctors)
  console.log(hospitals)
  return (
    <>
      <div className='hero__section h-cover min-h-[700px] max-h-[820px] '>
        <div className="container">
          <div className='flex flex-col md:flex-row gap-4 '>
            {/* LEFT DIV */}
            <div className='h-[50%] w-full md:w-[50%] md:h-[100%] md:mt-28 mt-12'>
              <div>
                <h1 className='sm:text-[4vh] md:text-[45px] xl:text-[6vh] text-4xl md:leading-[65px] lg:leading-[70px] leading-[43px] font-bold font-manrope'>World Class <br /> health care for <br /> everyone! </h1>
              </div>
              <div className='w-[320px] mt-6'>
                <p className='text__para'>Your Health, Our Priority. Find Trusted Doctors, Book Appointments Hassle-Free!</p>
                <Link to="/finddoctor"><button className='rounded-[100px] border-2 shadow-sm mt-4 sm:mt-8 text-2xl hover:bg-blue-50 py-3 px-6  '>Book appointment</button> </Link>
              </div>
              <div className='flex justify-between mt-8 max-w-[500px]'>
                <div>
                  <h1 className='text-3xl font-semibold'>30+</h1>
                  <p className='text-sm mt-2'>No. of Hospitals</p>
                </div>
                <div>
                  <h1 className='text-3xl font-semibold'>200+</h1>
                  <p className='text-sm mt-2'>No. of Doctors</p>
                </div>
                <div>
                  <h1 className='text-3xl font-semibold'>7000+</h1>
                  <p className='text-sm mt-2'>No. of patients</p>
                </div>
              </div>
            </div>
            {/* DIV RIGHT */}
            <div className='md:mt-28 ml-5 md:block w-full md:max-w-[50%]'>
              <div className='w-full'>
                <Lottie loop={true} animationData={doctor} />
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className='mb-[200px]'>
        <div className='container'>
          <div>
            <h1 className='mt-10 text-lg font-semibold pl-4'>Top Doctors</h1>
            {
              isLoading ? (
                <Loader />
              )
                :
                (doctors.length ?
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-12'>
                    {doctors && doctors.map((doctor) => (
                      <DoctorCard key={doctor._id} user={doctor} />
                    ))
                    }

                  </div>
                  :
                  <NoDataMessgae message="No doctors found with the input query" />
                )
            }
          </div>

          <div>
            <h1 className='mt-10 text-lg font-semibold pl-4'>Top Hospitals</h1>
            {
              isLoading ? (<Loader />
              )
                :
                (hospitals.length ?
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-12'>
                    {hospitals && hospitals.map((hospital) => (
                      <HospitalCard key={hospital._id} user={hospital} />
                    ))}
                  </div>
                  : <NoDataMessgae message="No hospital found with the input query" />)
            }
          </div>

          <h1 className='text-center text-3xl m-10'>FAQ</h1>
          <div className='flex flex-col gap-5 items-center  justify-center'>
          <div className='w-[400px]'>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I book an appointment with a doctor?</AccordionTrigger>
                <AccordionContent>
                Booking an appointment with a doctor is simple on our platform. You can start by searching for the doctor you need by specialty, location, or name. Once you find the right doctor, select your preferred date and time from their available slots, and proceed to confirm your appointment.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className=' w-full max-w-[400px]'>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is my personal information secure when booking appointments online?</AccordionTrigger>
                <AccordionContent>
                Yes, protecting your privacy and data security is our top priority. We employ advanced encryption and security measures to safeguard your personal information. Your data is only used for appointment booking purposes and is never shared with third parties without your consent.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className='w-[400px]'>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How can I be sure of the doctor's qualifications and expertise?</AccordionTrigger>
                <AccordionContent>
                Rest assured, all doctors listed on our platform undergo a rigorous verification process to ensure they are qualified professionals. You can view their credentials, specialties, and patient reviews to make an informed decision. We prioritize transparency and quality to provide you with the best healthcare experience.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className='w-[400px]'>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>What safety measures are in place at hospitals to protect against COVID-19?</AccordionTrigger>
                <AccordionContent>
                Hospitals prioritize patient safety and adhere to strict infection control protocols, especially in light of COVID-19. This includes measures such as regular sanitization, mandatory mask-wearing, temperature checks, social distancing, and screening for symptoms. Additionally, many hospitals offer telemedicine options for non-urgent consultations to minimize in-person contact.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home;