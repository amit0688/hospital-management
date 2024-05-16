import React from 'react'
import InputBox from '../componenets/InputBox'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Sidebar from '@/componenets/Sidebar'
import { useSelector, useDispatch } from "react-redux"
import { useRegisterDocMutation } from '@/slices/doctorUserApiSlice'




function AddDoctor() {

    const { userInfo } = useSelector((state) => state.auth)

    const {city, state, businessname, address, map, pincode} = userInfo

    const [initialData, setInitialData] = useState({
        fullname: '',
        email: '',
        password: '',
        id: userInfo._id,
        hospitalname: businessname,
        city,
        state,
        address,
        map,
        specialization: '',
        pincode
    });

    console.log(userInfo._id)

    // const [data, setData] = useState({
    //     fullname: '',
    //     email: '',
    //     password: '',
    //     hospitalname: `${businessname}`,
    //     city: `${city}`,
    //     state: `${state}`,
    //     address: `${address}`,
    //     map: `${map}`
    // })

    const [data, setData] = useState({ ...initialData });

    useEffect(() => {
        // Update initialData whenever userInfo changes
        setInitialData({
            fullname: '',
            email: '',
            password: '',
            id: userInfo._id,
            hospitalname: businessname,
            city,
            state,
            address,
            map,
            specialization: '',
            pincode
        });
    }, [userInfo]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [registerDoc, { isLoading }] = useRegisterDocMutation()




    const registerUser = async (e) => {
        e.preventDefault()
        const { fullname, email, password, hospitalname, city, state, address, pincode, specialization, id } = data
        try {
            const res = await registerDoc({fullname, email, password, hospitalname, city, state, address, pincode, specialization, id}).unwrap();
            toast.success("Doctor created successfully")
            setData({ ...initialData });

        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
    return (

        <div>
            <div className="container">

                <div className='w-full h-auto flex gap-4 mt-4'>
                    <div className='h-auto w-[210px] bg-slate-100 rounded-md absolute left-[-200px] sm:static sm:block'>
                        <Sidebar />
                    </div>

                    <div className='w-full bg-slate-100 rounded-md p-5'>
                        <h1 className='text-center font-[500] text-2xl pb-6'>Add Doctor </h1>
                        <form onSubmit={registerUser} className='flex flex-col items-center'>
                            <div className='flex flex-col md:flex-row md:mt-20 gap-5 w-full items-center md:items-start justify-center'>
                                <div className='w-[80%]  max-w-[400px]'>
                                    <p className=' mb-4 font-[500]'>Personel Details:</p>
                                    <InputBox
                                        name="fullname"
                                        type="text"
                                        placeholder="Full Name"
                                        icon="fi-rr-user"
                                        value={data.fullname}
                                        onChange={handleChange}
                                    />
                                    <InputBox
                                        name="specialization"
                                        type="text"
                                        placeholder="Specialization"
                                        icon="fi-rr-user"
                                        value={data.specialization}
                                        onChange={handleChange}
                                    />



                                    <InputBox
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        icon="fi-rr-envelope"
                                        value={data.email}
                                        onChange={handleChange}
                                    />
                                    <InputBox
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        icon="fi-rr-key"
                                        value={data.password}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            <button type='submit' className='w-[80%] max-w-[400px] py-5 rounded-lg text-headingColor text-md font-[600] bg-slate-200 hover:bg-slate-500/50 flex items-center justify-center mt-3 '>Add Doctor</button>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default AddDoctor;