import React from 'react'
import "../app.css";
import InputBox from '../componenets/InputBox'
import Uploader from '../componenets/Uploader'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '@/slices/authSlice'
import { emailRegex, passwordRegex } from '@/constants/constant'
import googleIcon from '../assets/images/google.png'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '@/firebase';
import { useGoogleRegisterPatMutation, useRegisterPatMutation } from '@/slices/patientSlice';



function UserSignup() {

    const [data, setData] = useState({
        fullname: '',
        email: '',
        password: '',
        businessname: '',
        phone: '',
        gender: '',
        avatar: null
    })







    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const handleImage = (e) => {
        setData({
            ...data,
            avatar: e.target.files[0]
        })
    }



    const navigate = useNavigate()
    const dispatch = useDispatch()


    const { userInfo } = useSelector((state) => state.auth)
    const [register, { isLoading }] = useRegisterPatMutation()
    const [googleRegister, { isLoading : loading}] = useGoogleRegisterPatMutation()

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])


    const { fullname, email, password, phone, avatar, gender } = data


    const registerUser = async (e) => {
        e.preventDefault()
        let form = new FormData();

        form.append('avatar', avatar)
        form.append('email', email)
        form.append('password', password)
        form.append('fullname', fullname)
        form.append('gender', gender)
        form.append('phone', phone)


    



        if (fullname.length < 5) {
            return toast.error("Fullname must be at least 3 letter")
        }
        if (!email.length) {
            return toast.error("Enter Email")
        }

        if (!emailRegex.test(email)) {
            return toast.error("Email is invalid")
        }
        if (gender.length == "") {
            return toast.error("Please select gender")
        }

        // if(!passwordRegex.test(password)){
        //     return toast.error( "Password should be 6 to 20 letters long and contain a numeric value, 1 lowercase, 1 uppercase letters")
        // }

        try {
            const res = await register(form).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/');

        }
        catch (err) {
            toast.error(err?.data?.message || err.error)
        }

    }

    // GOOGLE SIGNUP

    const auth = getAuth(app)

    const handleGoogleAuth = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" })
        try {
            const result = await signInWithPopup(auth, provider)
            console.log(result)
            const res = await googleRegister({
                name: result.user.displayName,
                email: result.user.email,
                avatar: result.user.photoURL
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/');

        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }

    }
    return (
        <section>
            <div className="container">
                <div className='flex flex-col gap-5 w-full items-center justify-center shadow-md border-2 sm:border-none pb-8 pt-8 sm:p-0 sm:shadow-none rounded-lg'>

                    <div className=' w-[90%]  max-w-[400px] sm:max-w-[500px] sm:mt-0 sm:p-8 sm:shadow-lg sm:border-2 rounded-lg  '>
                        <form id='formElement' onSubmit={registerUser} className=''>
                            <div className='w-[100%] flex justify-center items-center mb-10 '><h1 className='text-2xl font-[700]'>Patient Registration</h1></div>
                            <InputBox
                                name="fullname"
                                type="text"
                                placeholder="Full Name"
                                icon="fi-rr-user"
                                value={fullname}
                                onChange={handleChange}
                            />

                            <InputBox
                                name="email"
                                type="email"
                                placeholder="Email"
                                icon="fi-rr-envelope"
                                value={email}
                                onChange={handleChange}
                            />
                            <InputBox
                                name="password"
                                type="password"
                                placeholder="Password"
                                icon="fi-rr-key"
                                value={password}
                                onChange={handleChange}
                            />
                            <InputBox
                                name="phone"
                                type="text"
                                placeholder="Phone number"
                                icon="fi-rr-mobile-notch"
                                value={phone}
                                onChange={handleChange}
                            />
                            <select name='gender' value={gender} onChange={handleChange} className='w-full p-4 focus:outline-none cursor-pointer rounded-md bg-gray-50'>
                                <option value="" className='p-6 text-xl cursor-not-allowed cl' disabled>Gender</option>
                                <option value="male" className='text-xl'>Male</option>
                                <option value="female" className='text-xl'>Female</option>
                                <option value="other" className='text-xl'>Other</option>
                            </select>
                            <div className='flex gap-5 mt-6 items-center justify-between w-full'>

                                {avatar && (
                                    <div>
                                        <img src={URL.createObjectURL(avatar)} className='w-18 h-14  rounded-full ' alt="Selected" />
                                    </div>
                                )}

                                <Uploader name="avatar" id="avatar" onChange={handleImage} />
                            </div>
                            <button type='submit'  className='mt-6 max-w-[500px] py-5 rounded-lg w-full text-headingColor text-md font-[600] bg-slate-200 hover:bg-slate-500/50 flex items-center justify-center' disabled={isLoading}>{isLoading ? <div className="loader"></div> : "Register"}</button>
                            <div className="relative 1-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                                <hr className="w-1/2  border-black" />
                                <p>OR</p>
                                <hr className="w-1/2  border-black" />
                            </div>
                            <div className='flex items-center flex-col w-full gap-6 '>
                                <p className=" text-dark-grey text-base text-center">
                                    Already have an account?
                                    <Link to="/user/login" className="underline text-black text-base ml-1">
                                        Sign in here.
                                    </Link>
                                </p>
                            </div>
                        </form>
                        <button className="flex items-center justify-center w-full btn-dark gap-4 mt-6 center" onClick={handleGoogleAuth}><img src={googleIcon} className="w-5" />Continue with google</button>
                    </div>


                </div>

            </div>
        </section>
    )
}

export default UserSignup