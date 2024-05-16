import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import "../app.css";

import defaultPic from '../assets/images/defaultPic.jpg'



import { useLogoutMutation } from '@/slices/hospitalUserApiSlice';
import { logout } from '@/slices/authSlice';
import { Button } from '@/components/ui/button';


const Navbar = () => {
  const [menu, setMenu] = useState(false)
  const { userInfo } = useSelector((state) => state.auth)

  const [userNavPanel, setUserNavPanel] = useState(false);

  const handleUserNavPanel = () => {
    setUserNavPanel(currentVal => !currentVal);
  }

  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200)
  }

  // const {fullname, state, avatar} = userInfo

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <nav className='header flex justify-between items-center sticky top-0 z-[999]'>
      <div className="container">
        <div className="flex items-center justify-between ">
          <Link to="/">

            <div className='flex justify-center items-center gap-1 cursor-pointer'>
              {/* +++++ LOGO +++++ */}
              <span className='text-red-700 font-[800] text-[32px] mb-1'>+</span>
              <h1 className='text-xl font-bold'>Aspatal
              </h1>
            </div>
          </Link>

          <div className={`flex items-center duration-200 ease-in-out md:show gap-5 absolute right-0 top-24 flex-col h-cover z-[99999] backdrop-blur-[100px] md:h-auto w-full md:w-auto md:flex md:flex-row  md:relative md:top-0 bg-white  ${menu ? 'show' : 'hide'}`}>
            <NavLink onClick={() => setMenu(currentVal => !currentVal)} to="/" className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600] ' : 'text-textColor leading-7 font-[500px] hover:text-primaryColor'}>Home</NavLink>
            <NavLink onClick={() => setMenu(currentVal => !currentVal)} to="/finddoctor" className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600] ' : 'text-textColor leading-7 font-[500px] hover:text-primaryColor'}>Find Doctor</NavLink>
            <NavLink onClick={() => setMenu(currentVal => !currentVal)} to="/findhospital" className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600] ' : 'text-textColor leading-7 font-[500px] hover:text-primaryColor'}>Find Hospital</NavLink>
            {/* <NavLink onClick={() => setMenu(currentVal => !currentVal)} to="/about" className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600] ' : 'text-textColor leading-7 font-[500px] hover:text-primaryColor'}>About us</NavLink> */}
          </div>

          {/* Nav right */}
          <div className='flex items-center justify-center gap-3'>
            {
              userInfo ? (<div className="relative " onClick={handleUserNavPanel} onBlur={handleBlur}>
                <button className="w-10 h-10 mt-10 ">
                  <img src={userInfo.avatar ? userInfo.avatar : defaultPic} className="w-full h-full object-cover rounded-full" alt="" />
                </button>

                {
                  userNavPanel ? <><div className="bg-white absolute right-0  rounded-md w-60 overflow-hidden z-50 border border-gray-200 ">

{
                      userInfo.role === "patient" ? "" :
                    (<Link to={`/${userInfo.role}/${userInfo._id}`} className="link pl-8 py-4 rounded-t-md">
                      Profile
                    </Link>) }

                    {
                      userInfo.role === "doctor" ? (<Link to={`${userInfo.role}/apopointments`} className="link pl-8 py-4">
                        Bookings
                      </Link>) : userInfo.role == "hospital" ? "" : (<Link to={`user/${userInfo._id}/apopointments`} className="link pl-8 py-4">
                        My apopointments
                      </Link>)

                    }

                    {
                      userInfo.role == "doctor" || userInfo.role == "hospital" ? (<Link to={`${userInfo.role}/update-profile`} className="link pl-8 py-4">
                        Setting
                      </Link>) : ""
                    }

                    <button className="text-left p-4 hover:bg-gray-100 border border-gray-200 w-full pl-8 py-4" onClick={handleLogout}>
                      <h1 className="font-bold text-xl mg-1">Sign Out</h1>
                    </button>
                  </div></>
                    : ""
                }


              </div>


              )
                :
                (<div>
                  <Link to='/user/login' className='bg-blue-100 px-4 hover:bg-blue-300 font-[500] py-2 rounded-xl'>Login</Link>
                </div>)

            }


            <div>
              <label className="hamburger">
                <input type="checkbox" />
                <svg viewBox="0 0 32 32" className='md:hidden' onClick={() => setMenu(currentVal => !currentVal)}>
                  <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                  <path className="line" d="M7 16 27 16"></path>
                </svg>
              </label>



            </div>

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;