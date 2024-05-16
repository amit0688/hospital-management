import React from 'react'
import Sidebar from '@/componenets/Sidebar';
import { useState, useEffect } from 'react';
import UpdateProfile from './UpdateProfile';
import UpdateDoc from './UpdateDoc';






function UpdateDoctorProfile() {



  return (
    <div>
      <div className="container">
        <div className='w-full h-auto flex gap-4 mt-4'>
          <div className='h-auto w-[210px] bg-slate-100 rounded-md hidden sm:block'>
            <Sidebar />
          </div>

          <div className='w-full bg-slate-50 rounded-md'>
            <h1 className='text-center text-2xl m-8 font-[550] ' >Update Details</h1>
            <div className='bg-slate-100 p-4 rounded-lg'>
            <UpdateDoc />
          </div>

        </div>

        </div>

      </div>
    </div>
  )
}

export default UpdateDoctorProfile