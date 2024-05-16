import React from 'react'
import IBox from '@/componenets/IBox';
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux"


import { useUpdateUserMutation } from '@/slices/hospitalUserApiSlice';
import toast from 'react-hot-toast';
import { setCredentials } from '@/slices/authSlice';
import CitySelector from '@/componenets/CitySelector';


function Facilities() {
    const {userInfo} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [data, setData] = useState(userInfo);

    const [updateProfile, {isLoading}] = useUpdateUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  useEffect(() => {
    setData(userInfo);
  }, [userInfo]);


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        ...data
      }).unwrap();
      console.log(res)
      dispatch(setCredentials(res));
      toast.success('Profile updated')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }


  return (
    <form onSubmit={handleUpdate} className='flex flex-col items-center font-inter'>
              <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div className='w-[100%]  max-w-[500px] bg-slate-200 rounded-md p-4'>
                  <p className=' mb-4 font-[600] font-inter '>Owner Details:</p>
                  <IBox type="checkbox" label="Active" />
                  <CitySelector />
                </div>

              </div>

              <button type='submit' className='w-[80%] max-w-[400px] py-5 rounded-lg text-headingColor text-md font-[600] bg-slate-200 hover:bg-slate-500/50 flex items-center justify-center mt-3 '>Update Profile</button>
            </form>
  )
  
  
}

export default Facilities;