import React from 'react'
import IBox from '@/componenets/IBox';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"

import { useUpdateUserDocMutation } from '@/slices/doctorUserApiSlice';
import toast from 'react-hot-toast';
import { setCredentials } from '@/slices/authSlice';
import TextArea from '@/componenets/TextArea';


function UpdateDoc() {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [data, setData] = useState(userInfo);

  const [updateProfile, { isLoading }] = useUpdateUserDocMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  useEffect(() => {
    console.log(userInfo)
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

  console.log(data.hospitalname)


  return (
    <form onSubmit={handleUpdate} className='flex flex-col items-center font-inter'>
      <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div className='w-[100%]  max-w-[500px] bg-slate-200 rounded-md p-4'>
          <p className=' mb-4 font-[600] font-inter '>Personal Details:</p>
          <IBox
            name="fullname"
            type="text"
            label="Full name"
            placeholder="Full Name"
            value={data.fullname}
            onChange={handleChange}
          />

          <IBox
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
          />
          <label htmlFor="form" className="pl-4 text-sm text-textColor font-[550]">Gender :</label>
          <select name='gender' value={data.gender} onChange={handleChange} className='w-full p-4 focus:outline-none cursor-pointer rounded-md bg-gray-50 mt-1 mb-4'>
            <option value="" className='p-6 text-xl cursor-not-allowed cl' disabled>Gender</option>
            <option value="male" className='text-xl'>Male</option>
            <option value="female" className='text-xl'>Female</option>
            <option value="other" className='text-xl'>Other</option>
          </select>

          <IBox
            name="homeAddress"
            type="text"
            placeholder="Address"
            label="Address"
            value={data.homeAddress}
            onChange={handleChange}
          />
          <IBox
            name="age"
            type="text"
            placeholder="Age"
            label="Age"
            value={data.age}
            onChange={handleChange}
          />
          <IBox
            name="experience"
            type="text"
            placeholder="Experience"
            label="Experience (In years)"
            value={data.experience}
            onChange={handleChange}
          />
          <IBox
            name="specialization"
            type="text"
            placeholder="Specialization "
            label="Specialization (any specific field)"
            value={data.specialization}
            onChange={handleChange}
          />


        </div>

        <div className='w-[100%]  max-w-[500px] bg-slate-200 rounded-md p-4'>
          <p className=' mb-4 font-bold'>Hospital Details:</p>

          <IBox
            name="businessname"
            type="text"
            placeholder="Hospital Name"
            label="Hospital Name"
            value={data.hospitalname}
            disabled
            onChange={handleChange}
          />
          <IBox
            name="state"
            type="text"
            placeholder="State"
            label="State"
            value={data.state}
            disabled
            onChange={handleChange}
          />

          <IBox
            name="city"
            type="text"
            placeholder="City"
            label="City"
            value={data.city}
            disabled
            onChange={handleChange}
          />

          <IBox
            name="address"
            type="text"
            placeholder="Address"
            label="Address"
            value={data.address}
            disabled
            onChange={handleChange}
          />
          <IBox
            name="pincode"
            type="text"
            placeholder="Pincode"
            label="Pincode"
            value={data.pincode}
            onChange={handleChange}
          />
          <IBox
            name="fee"
            type="text"
            placeholder="Fee"
            label="Fee"
            value={data.fee}
            onChange={handleChange}
          />

          {/* <label htmlFor="">About :</label>
                  <textarea name="" id="" rows="10" className='w-full'></textarea> */}


          <select name='feeType' value={data.feeType} onChange={handleChange} className='w-full p-4 focus:outline-none cursor-pointer rounded-md bg-gray-50'>
            <option value="" className='p-6 text-xl cursor-not-allowed cl' disabled>Fee type</option>
            <option value="visit" className='text-xl'>visit</option>
            <option value="hour" className='text-xl'>hour</option>
          </select>

          <TextArea name="about" rows="5" label="About (max 300 char)" maxLength="300" value={data.about} onChange={handleChange} />

        </div>

        <div className='w-[100%]  max-w-[500px] bg-slate-200 rounded-md p-4'>
          <p className=' mb-4 font-bold'>Business Contacts:</p>

          <IBox
            name="phone"
            type="text"
            placeholder="Phone number"
            label="Phone Number"
            value={data.phone}
            onChange={handleChange}
          />


          <IBox
            name="instagram"
            type="text"
            placeholder="Instargram"
            label="Instargram Link"
            value={data.instagram}
            onChange={handleChange}
          />
          <IBox
            name="facebook"
            type="text"
            placeholder="Facebook"
            label="Facebook Link"
            value={data.facebook}
            onChange={handleChange}
          />

          <IBox
            name="map"
            type="text"
            placeholder="Map"
            label="Google Map Link"
            value={data.map}
            disabled
            onChange={handleChange}
          />



        </div>
      </div>

      <button type='submit' className='w-[80%] max-w-[400px] py-5 rounded-lg text-headingColor text-md font-[600] bg-slate-200 hover:bg-slate-500/50 flex items-center justify-center mt-3 '>Update Profile</button>
    </form>
  )


}

export default UpdateDoc;