import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { NavLink, Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='h-[300px]'>
      <div className="container">
        <div className='flex mt-8 flex-col gap-6 md:flex-row'>

        <div className='md:w-[30%] w-full flex flex-col gap-3'>
          <div className='flex items-center gap-1'>
            {/* +++++ LOGO +++++ */}
            <span className='text-red-700 font-bold text-3xl mb-1'>+</span> 
            <h1 className='text-xl font-bold cursor-pointer'>Aspatal
            </h1>
          </div>

          <div><p className='text-xs'>Copyright &copy; 2024 developed by Amit</p></div>
          <div className=' p-1 flex gap-4 '>
          <a href="https://maps.app.goo.gl/1VASKWaiZa7kxEh79" rel='noopener' target='_blank' className='text-xs hover:font-[800]  p-2 rounded-full border border-solid border-black hover:scale-125 hover:animate-in hover:bg-blue-300 '><CiLocationOn /></a>

          <a href={`tel:+916389540688`} rel='noopener' target='_blank' className='text-xs hover:font-[800]  p-2 rounded-full border border-solid border-black hover:scale-125 hover:animate-in hover:bg-blue-300 '><IoIosCall /></a>

          <a href="tel:+916389540688" rel='noopener' target='_blank' className='text-xs hover:font-[800]  p-2 rounded-full border border-solid border-black hover:scale-125 hover:animate-in hover:bg-blue-300'><FaWhatsapp /></a>
          <a href="https://www.instagram.com/itz_amit10/" rel='noopener' target='_blank' className='text-xs hover:font-[800]  p-2 rounded-full border border-solid border-black hover:scale-125 hover:animate-in hover:bg-blue-300 '><FaInstagram /></a>

          </div>
        </div>

        <div className='flex md:w-[70%] justify-between '>

        <div className='flex flex-col gap-2'>
          <h1 className='font-[700]'>Quick Links</h1>
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/doctor">Find Doctor</NavLink>
            <NavLink to="/hospital">Find Hospital</NavLink>
            {/* <NavLink to="/about">About us</NavLink> */}
        </div>

        <div className='flex flex-col gap-2'>
          <h1 className='font-[700]'>For Hospitals</h1>
            <NavLink to="hospital/signup" >Sign Up</NavLink>
            <NavLink to="hospital/login">Login</NavLink>
            {/* <NavLink to="/hospital/faq">FAQ</NavLink> */}
            {/* <NavLink to="hospital/about">About</NavLink> */}
        </div>

        <div className='flex flex-col gap-2'>
          <h1 className='font-[700]'>For Doctors</h1>
            <NavLink to="/doctor/login">Login</NavLink>
            {/* <NavLink to="/doctor/faq">FAQ</NavLink>
            <NavLink to="/about">About</NavLink> */}
        </div>
        </div>



        </div>
      </div>
    </div>
  )
}

export default Footer