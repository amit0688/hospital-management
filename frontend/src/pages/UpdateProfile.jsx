import React from 'react'
import IBox from '@/componenets/IBox';
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux"
import { useUpdateUserMutation } from '@/slices/hospitalUserApiSlice';
import toast from 'react-hot-toast';
import { setCredentials } from '@/slices/authSlice';
import TextArea from '@/componenets/TextArea';


function UpdateProfile() {
    const {userInfo} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [data, setData] = useState(userInfo);
    const [selectedDistrict, setSelectedDistrict] = useState(userInfo.city);

    const [updateProfile, {isLoading}] = useUpdateUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }


  useEffect(() => {
    setData(userInfo);
    setSelectedDistrict(userInfo.city)
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
                    disabled
                    onChange={handleChange}
                  />
                  <IBox
                    name="homeAddress"
                    type="text"
                    placeholder="Address"
                    label="Address"
                    value={data.homeAddress}
                    onChange={handleChange}
                  />
                  <IBox
                    name="phone"
                    type="text"
                    placeholder="Phone number"
                    label="Phone Number"
                    value={data.phone}
                    onChange={handleChange}
                  />

                  <TextArea name="about" rows="5" label="About (max 300 char)" maxLength="300" value={data.about} onChange={handleChange} />

                  {/* <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data.city}
                    label="Gender"
                    onChange={handleChange}
                  >
                    <MenuItem value={male}>male</MenuItem>
                    <MenuItem value={female}>female</MenuItem>
                    <MenuItem value={other}>other</MenuItem>
                  </Select>
                  </FormControl> */}
                  {/* <select value={data.gender} name='gender' onChange={handleChange}>
                    <option value="" >male</option>
                    <option value="" >female</option>
                    <option value="" >other</option>
                  </select> */}

                </div>

                <div className='w-[100%]  max-w-[500px] bg-slate-200 rounded-md p-4'>
                  <p className=' mb-4 font-bold'>Business Details:</p>

                  <IBox
                    name="businessname"
                    type="text"
                    placeholder="Hospital Name"
                    label="Hospital Name"
                    value={data.businessname}
                    onChange={handleChange}
                  />
                  <IBox
                    name="state"
                    type="text"
                    placeholder="State"
                    label="State"
                    value={data.state}
                    onChange={handleChange}
                    disabled
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
                    name="since"
                    type="text"
                    placeholder="Since"
                    label="Since"
                    value={data.since}
                    onChange={handleChange}
                  />

                  
                  <IBox
                    name="address"
                    type="text"
                    placeholder="Address"
                    label="Address"
                    value={data.address}
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

                </div>

                <div className='w-[100%]  max-w-[500px] bg-slate-200 rounded-md p-4'>
                  <p className=' mb-4 font-bold'>Business Contacts:</p>

                  <IBox
                    name="phonenumber"
                    type="text"
                    placeholder="Phone number"
                    label="Phone Number"
                    value={data.phonenumber}
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
                    onChange={handleChange}
                  />




                </div>
              </div>

              <button type='submit' className='w-[80%] max-w-[400px] py-5 rounded-lg text-headingColor text-md font-[600] bg-slate-200 hover:bg-slate-500/50 flex items-center justify-center mt-3 '>Update Profile</button>
            </form>
  )
  
  
}

export default UpdateProfile;