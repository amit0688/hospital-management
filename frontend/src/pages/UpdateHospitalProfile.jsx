import React from 'react'
import Sidebar from '@/componenets/Sidebar';
// import TextField from '@mui/material/TextField';
import IBox from '@/componenets/IBox';
import { useState, useEffect } from 'react';
// import {useSelector, useDispatch} from "react-redux"
// import Selection from '@/componenets/Selection';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// import { useUpdateUserMutation } from '@/slices/hospitalUserApiSlice';
// import toast from 'react-hot-toast';
// import { setCredentials } from '@/slices/authSlice';
import CustomTabs from '@/componenets/Tabs';
import UpdateProfile from './UpdateProfile';






function UpdateHospitalProfile() {
  // const {userInfo} = useSelector((state) => state.auth)
  // const dispatch = useDispatch()


  // const {fullname,gender, email, homeAddress, phone, businessname, state, city, since, address, pincode, phonenumber, instagram, facebook, map } = userInfo
  // const [data, setData] = useState({
  //   fullname: '',
  //   gender: '',
  //   email: '',
  //   homeAddress: '',
  //   phone: '',
  //   businessname: '',
  //   state:  '',
  //   city: '',
  //   since: '',
  //   address: '',
  //   pincode: '',
  //   phonenumber: '',
  //   instagram: '',
  //   facebook: '',
  //   map: '',
  // })

  // const [data, setData] = useState(userInfo);


  // const options = [
  //   { value: '', label: 'Gender' },
  //   { value: 'option2', label: 'Option 2' },
  //   { value: 'option3', label: 'Option 3' },
  // ];

  // const [updateProfile, {isLoading}] = useUpdateUserMutation();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setData({ ...data, [name]: value })
  // }

  // const handleSelectChange = (value) => {
  //   setSelectedValue(value);
  // };

  // useEffect(()=> {
  //     setData(userInfo.fullname);
  //     setData(userInfo.gender);
  //     setData(userInfo.email);
  //     setData(userInfo.homeAddress);
  //     setData(userInfo.phone);
  //     setData(userInfo.businessname);
  //     setData(userInfo.state);
  //     setData(userInfo.city);
  //     setData(userInfo.since);
  //     setData(userInfo.address);
  //     setData(userInfo.pincode);
  //     setData(userInfo.phonenumber);
  //     setData(userInfo.instagram);
  //     setData(userInfo.facebook);
  //     setData(userInfo.map);
    // }, [userInfo.fullname, userInfo.gender, userInfo.email, userInfo.homeAddress, userInfo.phone, userInfo.businessname,
    //   userInfo.state, userInfo.city,  userInfo.since, userInfo.address, userInfo.pincode, userInfo.phonenumber, userInfo.instagram,
    //   userInfo.facebook, userInfo.map])

  // useEffect(() => {
  //   setData({
  //     fullname: userInfo.fullname,
  //     gender: userInfo.gender,
  //     email: userInfo.email,
  //     homeAddress: userInfo.homeAddress,
  //     phone: userInfo.phone,
  //     businessname: userInfo.businessname,
  //     state: userInfo.state,
  //     city: userInfo.city,
  //     since: userInfo.since,
  //     address: userInfo.address,
  //     pincode: userInfo.pincode,
  //     phonenumber: userInfo.phonenumber,
  //     instagram: userInfo.instagram,
  //     facebook: userInfo.facebook,
  //     map: userInfo.map
  //   });
  // }, [ userInfo.gender, userInfo.email, userInfo.homeAddress, userInfo.phone, userInfo.businessname,
  //   userInfo.state, userInfo.city,  userInfo.since, userInfo.address, userInfo.pincode, userInfo.phonenumber, userInfo.instagram,
  //   userInfo.facebook, userInfo.map]);
  // useEffect(() => {
  //   setData(userInfo);
  // }, [userInfo]);


  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await updateProfile({
  //       _id: userInfo._id,
  //       ...data
  //     }).unwrap();
  //     console.log(res)
  //     dispatch(setCredentials(res));
  //     toast.success('Profile updated')
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error)
  //   }
  // }



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
              <UpdateProfile />
            {/* <CustomTabs /> */}
            </div>
            {/* <form onSubmit={handleUpdate} className='flex flex-col items-center'>
              <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div className='w-[100%]  max-w-[500px] bg-slate-200 rounded-md p-4'>
                  <p className=' mb-4 font-bold'>Owner Details:</p>
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
                  <FormControl fullWidth>
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
                  </FormControl>
                  <select value={data.gender} name='gender' onChange={handleChange}>
                    <option value="" >male</option>
                    <option value="" >female</option>
                    <option value="" >other</option>
                  </select>

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
                  />

                  <IBox
                    name="city"
                    type="text"
                    placeholder="City"
                    label="City"
                    value={data.city}
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

                  <Select>
                  <FormLabel>Gender:</FormLabel>
                    <SelectTrigger className="w-full  max-w-[500px] h-[100px] ">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>

                  <Selection options={options} value={selectedValue} onChange={handleSelectChange} />
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
                    label="Map Link"
                    value={data.map}
                    onChange={handleChange}
                  />



                </div>
              </div>

              <button type='submit' className='w-[80%] max-w-[400px] py-5 rounded-lg text-headingColor text-md font-[600] bg-slate-200 hover:bg-slate-500/50 flex items-center justify-center mt-3 '>Update Profile</button>
            </form> */}
          </div>

        </div>

      </div>
    </div>
  )
}

export default UpdateHospitalProfile