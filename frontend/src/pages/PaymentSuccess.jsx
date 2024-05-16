import React from 'react'
import { useSearchParams } from "react-router-dom"
import success from "../assets/json/success.json"
import Lottie from 'lottie-react'


const PaymentSuccess = () => {

    const seachQuery = useSearchParams()[0]

    const referenceNum = seachQuery.get("reference")
    return (
        <div className='h-cover w-full flex justify-center items-center'>
            <div className='w-full max-w-[500px] flex flex-col items-center justify-center'> 

            
            <div className='h-[200px] w-[200px] '>
                <Lottie loop={false} animationData={success} />
            </div>

            <div>

                <h1 className='text-2xl'>Your Appointment Booked Successfully!</h1>
            </div>

            </div>
        </div>
    )
}

export default PaymentSuccess