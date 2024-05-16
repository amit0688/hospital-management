import React,{ useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaGreaterThan } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux"

function Sidebar() {

  const { userInfo } = useSelector((state) => state.auth)
  console.log(userInfo.role)
  
  return (
    <div className='sidebar bg-slate-100 '>
        <div className="flex w-full flex-col items-center duration-200 ease-in-out gap-2 py-4">
            <NavLink to={`/${userInfo.role}/dashboard`} className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600] bg-blue-200 w-full px-5 py-3' : ' hover:bg-blue-100 py-3 px-5 w-full text-textColor leading-7 font-[500] hover:text-primaryColor'}>Dashboard</NavLink>
            <NavLink to={`/${userInfo.role}/update-profile`} className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600] bg-blue-200 w-full px-5 py-3' : ' hover:bg-blue-100 py-3 px-5 w-full text-textColor leading-7 font-[500] hover:text-primaryColor'}>Update Profile</NavLink>
            {
              userInfo.role == "hospital" || "doctor" ? <NavLink to={`/${userInfo.role}/update-pic`} className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600] bg-blue-200 w-full px-5 py-3' : ' hover:bg-blue-100 py-3 px-5 w-full text-textColor leading-7 font-[500] hover:text-primaryColor'}>Update pic</NavLink> : ""
            }
            {
              userInfo.role == "hospital" ? <NavLink to="/add/doctor" className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600] bg-blue-200 w-full px-5 py-3' : ' hover:bg-blue-100 py-3 px-5 w-full text-textColor leading-7 font-[500] hover:text-primaryColor'}>Add Doctor</NavLink> : ""
            }
            {
              userInfo.role == "hospital" ? <NavLink to="/hospital/doctors" className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600] bg-blue-200 w-full px-5 py-3' : ' hover:bg-blue-100 py-3 px-5 w-full text-textColor leading-7 font-[500] hover:text-primaryColor'}>Doctor</NavLink> : ""
            }
          </div>
          <button className='relative left-28 sm:hidden'>
          <FaGreaterThan />
          </button>
    </div>
  )
}

export default Sidebar;