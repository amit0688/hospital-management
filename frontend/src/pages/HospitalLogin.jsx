import React from 'react'
import InputBox from '../componenets/InputBox'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '@/slices/hospitalUserApiSlice'
import { setCredentials } from '@/slices/authSlice'

function HospitalLogin() {

    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const [submit, setSubmit] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [login, { isLoading }] = useLoginMutation()
    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])


    const loginUser = async (e) => {
        e.preventDefault()
        setSubmit(true)
        setTimeout(() => {
            setSubmit(false);
        }, 5000)
        const { email, password } = data;
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/');
        }
        catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
    return (
        <section>
            <div className="container">
                <form onSubmit={loginUser} className='flex flex-col items-center'>
                    <div className='flex flex-col gap-5 w-full items-center justify-center shadow-md border-2 md:border-none pb-16 pt-8 md:p-0 md:shadow-none rounded-lg'>

                        <div className='w-[90%] max-w-[400px] md:max-w-[500px] mt-4 md:mt-0 md:p-16 md:shadow-lg md:border-2 rounded-lg'>
                            <div className='w-[100%] flex justify-center items-center mb-20 '><h1 className='text-2xl font-[700]'>Hospital Login</h1></div>

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
                            <div className="relative 1-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                                <hr className="w-1/2  border-black" />
                                <p>OR</p>
                                <hr className="w-1/2  border-black" />
                            </div>
                            <div className='flex items-center flex-col w-full '>
                                <p className=" text-dark-grey text-base text-center">
                                    Don't have an account?
                                    <Link to="/hospital/signup" className="underline text-black text-base ml-1">
                                        Join us today
                                    </Link>
                                </p>
                            </div>
                            <button type='submit' className='mt-6 max-w-[400px] py-5 rounded-lg w-full text-headingColor text-md font-[600] bg-slate-200 hover:bg-slate-500/50 flex items-center justify-center' disabled={isLoading}>{isLoading ? <div className="loader"></div> : "Login"}</button>

                        </div>
                    </div>

                </form>
            </div>
        </section>
    )
}

export default HospitalLogin;