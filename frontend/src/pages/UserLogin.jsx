import React from 'react'
import InputBox from '../componenets/InputBox'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginDocMutation } from '@/slices/doctorUserApiSlice'
import { setCredentials } from '@/slices/authSlice'
import googleIcon from '../assets/images/google.png'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '@/firebase';
import { useGoogleLoginPatMutation, useLoginPatMutation } from '@/slices/patientSlice'

function UserLogin() {
    const [data, setData] = useState({
        email: '',
        password: '',
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginPatMutation()
    const [googleLogin, { isLoading : loading }] = useGoogleLoginPatMutation()
    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])


    const loginUser = async (e) => {
        e.preventDefault()
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


    const auth = getAuth(app)
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" })
        try {
            const result = await signInWithPopup(auth, provider)
            const res = await googleLogin({ email: result.user.email}).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/');
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }

    }
    return (
        <section>
            <div className="container">
                <div className='flex flex-col gap-5 w-full items-center justify-center shadow-md border-2 md:border-none pb-16 pt-8 md:p-0 md:shadow-none rounded-lg'>

                    <div className='w-[90%]  max-w-[400px] md:max-w-[500px] mt-4 md:mt-0 md:p-16 md:shadow-lg md:border-2 rounded-lg'>
                        <form onSubmit={loginUser} className=''>
                            <div className='w-[100%] flex justify-center items-center mb-10 '><h1 className='text-2xl font-[700]'>Patient Login</h1></div>

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
                            <button type='submit'  className='mt-6 max-w-[400px] py-5 rounded-lg w-full text-headingColor text-md font-[600] bg-slate-200 hover:bg-slate-500/50 flex items-center justify-center' disabled={isLoading}>{isLoading ? <div className="loader"></div> : "Login"}</button>

                            <div className="relative 1-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                                <hr className="w-1/2  border-black" />
                                <p>OR</p>
                                <hr className="w-1/2  border-black" />
                            </div>
                            <div className='flex items-center flex-col w-full '>
                                <p className=" text-dark-grey text-base text-center">
                                    Don't have an account?

                                    <Link to="/user/signup" className="underline text-black text-base ml-1">
                                        Join us today

                                    </Link>
                                </p>

                            </div>

                        </form>
                        <button onClick={handleGoogleLogin} className="flex items-center mt-6 justify-center w-full  btn-dark gap-4  center" ><img src={googleIcon} className="w-5" />Continue with google</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserLogin