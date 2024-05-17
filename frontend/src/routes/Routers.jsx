import React from 'react'
import Home from '../pages/Home'
import FindDoctor from '../pages/FindDoctor'
import About from '../pages/About'

import {Routes, Route} from 'react-router-dom'
import HospitalSignup from '../pages/HospitalSignup'
import HospitalLogin from '../pages/HospitalLogin'
import DoctorLogin from '@/pages/DoctorLogin'
import HospitalDashboard from '@/pages/HospitalDashboard'
import DoctorDashboard from '@/pages/DoctorDashboard'
import FindHospital from '@/pages/FindHospital'
import HospitalProfile from '@/pages/HospitalProfile'
import UpdateHospitalProfile from '@/pages/UpdateHospitalProfile'
import AddDoctor from '@/pages/AddDoctor'
import UpdateDoctorProfile from '@/pages/UpdateDoctorProfile'
import UpdateHosPic from '@/pages/UpdateHosPic'
import DocProfile from '@/pages/DocProfile'
import Booking from '@/pages/Booking'
import UpdateDocPic from '@/pages/UpdateDocPic'
import UserLogin from '@/pages/UserLogin'
import UserSignup from '@/pages/UserSignup'
import PageNotFound from '@/pages/404page'
import DoctorList from '@/pages/DoctorList'
import PaymentSuccess from '@/pages/PaymentSuccess'
import UserBookings from '@/pages/UserBookings'
import DocAppointmentsList from '@/pages/DocAppointmentsList'

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/finddoctor" element={<FindDoctor/>} />
      <Route path="/paymentsuccess" element={<PaymentSuccess />} />
      <Route path="/about" element={<About/>} />
      <Route path="/findhospital" element={<FindHospital /> } />
      <Route path="/user/login" element={<UserLogin /> } />
      <Route path="/user/signup" element={<UserSignup /> } />
      <Route path="/user/:id/appointments" element={<UserBookings /> } />
      <Route path="/hospital/signup" element={<HospitalSignup/>}/>
      <Route path="/hospital/login" element={<HospitalLogin/>}/>
      <Route path="/hospital/:id" element={<HospitalProfile/>}/>
      <Route path="/hospital/doctors" element={<DoctorList/>}/>
      {/* <Route path="/hospital/dashboard" element={<HospitalDashboard/>}/> */}
      <Route path="/hospital/update-profile" element={<UpdateHospitalProfile/>}/>
      <Route path="/hospital/update-pic" element={<UpdateHosPic/>}/>
      <Route path="/doctor/login" element={<DoctorLogin/>}/>
      <Route path="/doctor/dashboard" element={<DoctorDashboard/>}/>
      <Route path="/doctor/:id" element={<DocProfile/>}/>

      <Route path="/doctor/appointments" element={<DocAppointmentsList/>}/>
      <Route path="/doctor/booking" element={<Booking/>}/>
      <Route path="/doctor/update-profile" element={<UpdateDoctorProfile/>}/>
      <Route path="/doctor/update-pic" element={<UpdateDocPic/>}/>
      <Route path="/add/doctor" element={<AddDoctor/>}/>
      <Route path="*" element={<PageNotFound/>}/>
      
    </Routes>
  )
}

export default Routers;