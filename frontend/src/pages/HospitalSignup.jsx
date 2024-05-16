import React from 'react'
import "../app.css";
import InputBox from '../componenets/InputBox'
import Uploader from '../componenets/Uploader'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '@/slices/hospitalUserApiSlice'
import { setCredentials } from '@/slices/authSlice'
import { emailRegex, passwordRegex } from '@/constants/constant'
import Selector from '@/componenets/Selector';




function HospitalSignup() {

    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedState, setSelectedState] = useState("");

    const [data, setData] = useState({
        fullname: '',
        email: '',
        password: '',
        businessname: '',
        // city: '',
        phonenumber: '',
        gender: '',
        avatar: null
    })

    const [submit, setSubmit] = useState(false)





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

    const handleSelect = (district) => {
        setSelectedDistrict(district);
        console.log(selectedDistrict)

    }

    const handleState = (state) => {
        setSelectedState(state);
        console.log(selectedState)
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const { userInfo } = useSelector((state) => state.auth)
    const [register, { isLoading }] = useRegisterMutation()

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])


    const { fullname, email, password, businessname, phonenumber, avatar, gender } = data


    const registerUser = async (e) => {
        e.preventDefault()
        setSubmit(true)
        setTimeout(() => {
            setSubmit(false);
        }, 5000)
        let form = new FormData();

        form.append('avatar', avatar)
        form.append('email', email)
        form.append('password', password)
        form.append('fullname', fullname)
        form.append('businessname', businessname)
        form.append('gender', gender)
        form.append('phonenumber', phonenumber)
        form.append('state', selectedState)
        form.append('city', selectedDistrict)

        console.log(form)

        // for(let [key, value] of form.entries()){
        //     formData[key] = value;
        // }



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
    return (
        <section>
            <div className="container">
                <form onSubmit={registerUser} id='formElement' className='flex flex-col items-center '>
                <div className='w-[100%] flex justify-center items-center '><h1 className='text-2xl font-[700]'>Hospital Registration</h1></div>
                    <div className='flex flex-col  md:flex-row md:mt-10 mt-10 gap-5 w-full items-center md:items-start justify-center'>
                        <div className='w-[80%]  max-w-[400px] '>
                            <p className=' mb-4 font-bold'>Personel Details:</p>
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
                            <select name='gender' value={gender} onChange={handleChange} className='w-full p-4 focus:outline-none cursor-pointer rounded-md bg-gray-50'>
                                <option value="" className='p-6 text-xl cursor-not-allowed cl' disabled>Gender</option>
                                <option value="male" className='text-xl'>Male</option>
                                <option value="female" className='text-xl'>Female</option>
                                <option value="other" className='text-xl'>Other</option>
                            </select>
                        </div>


                        <div className='w-[80%]  max-w-[400px]'>
                            <p className=' mb-4 font-bold'>Hospital Details:</p>
                            <InputBox
                                name="businessname"
                                type="text"
                                placeholder="Hospital Name"
                                icon="fi-rr-hospitals"
                                value={businessname}
                                onChange={handleChange}
                            />

                            {/* <InputBox
                                name="city"
                                type="text"
                                placeholder="City"
                                icon="fi-rs-marker"
                                value={city}
                                onChange={handleChange}
                            /> */}
                            <InputBox
                                name="phonenumber"
                                type="text"
                                placeholder="Phone number"
                                icon="fi-rr-mobile-notch"
                                value={phonenumber}
                                onChange={handleChange}
                            />
                            <div className=''>

                            </div>
                            <div className='flex gap-5 items-center justify-between w-full'>

                                {avatar && (
                                    <div>
                                        <img src={URL.createObjectURL(avatar)} className='w-18 h-14  rounded-full ' alt="Selected" />
                                    </div>
                                )}

                                <Uploader name="avatar" id="avatar" onChange={handleImage} />
                            </div>
                            <Selector onSelect={handleState} opt="state" placeholder="state" />
                            <Selector onSelect={handleSelect} opt="city" placeholder="city" />

                            
                        </div>


                    </div>

                    <div className='flex items-center flex-col w-full gap-6 mt-6'>
                                <p className=" text-dark-grey text-base text-center">
                                    Already have an account?
                                    <Link to="/user/login" className="underline text-black text-base ml-1">
                                        Sign in here.
                                    </Link>
                                </p>
                        </div>

                    <button type='submit' className='w-[80%] mt-6 max-w-[400px] py-5 rounded-lg text-headingColor text-md font-[600] bg-slate-200 hover:bg-slate-500/50 flex items-center justify-center '
                        disabled={isLoading}>{isLoading ? <div className="loader"></div> : "Register"}</button>
                </form>
            </div>
        </section>
    )
}

export default HospitalSignup