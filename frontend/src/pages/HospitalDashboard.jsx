import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import Sidebar from '@/componenets/Sidebar'
import { useSelector, useDispatch } from "react-redux"




function HospitalDashboard() {

    

    const navigate = useNavigate()
    
    
    
    return (
        
        <div>
            <div className="container">

                <div className='w-full h-auto flex gap-4 mt-4'>
                    <div className='h-auto w-[210px] bg-slate-100 rounded-md hidden sm:block'>
                    <Sidebar />
                    </div>

                    <div className='w-full bg-slate-100 rounded-md p-5'>

                    </div>
                </div>
            
                
            </div>
        </div>
    )
}

export default HospitalDashboard;