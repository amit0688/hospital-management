import React from 'react'
import docImg from '../assets/images/hero-img01.png';
import "../app.css";
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react'
import doctor from "../assets/json/doctor.json"


function Home() {
  
  return (
    <div className='hero__section h-cover max-h-[820px] '>
      <div className="container">
        <div className='flex flex-col md:flex-row gap-4 '>
        {/* LEFT DIV */}
        <div className='h-[50%] w-full md:w-[50%] md:h-[100%] md:mt-28 mt-12'>
          <div>
          <h1 className='sm:text-[4vh] md:text-[45px] xl:text-[6vh] text-4xl md:leading-[65px] lg:leading-[70px] leading-[43px] font-bold font-manrope'>World Class <br /> health care for <br /> everyone! </h1>
          </div>
          <div className='w-[320px] '>
            <p className='text__para'>Lorem cumque nemo molestiae temporibus in corrupti eum iusto quod ea. Necessitatibus dolor est possimus impedit dolores eaque?</p>
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
  )
}

export default Home;