import React from 'react'
import Sidebar from '@/componenets/Sidebar';
import { useState, useEffect } from 'react';
import Uploader from '../componenets/Uploader'
import { useSelector, useDispatch } from "react-redux"
import { useUpdateAvatarMutation, useUpdateImagesMutation } from '@/slices/hospitalUserApiSlice';
import { toast } from 'react-hot-toast'
import { setCredentials } from '@/slices/authSlice';





function UpdateHosPic() {

  const { userInfo } = useSelector((state) => state.auth)
  const [avatar, setAvatar] = useState(userInfo.avatar)
  const [images, setImages] = useState([])

  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();
  const [updateImages, { isLoading : loading}] = useUpdateImagesMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    setAvatar(userInfo.avatar)
  }, [userInfo.avatar])

  useEffect(() => {
    setImages(userInfo.images || []);
  }, [userInfo.images]);

  const handleAvatar = (e) => {
    setAvatar(
      e.target.files[0]
    )
  }

  const handleImage = (e) => {
    const files = Array.from(e.target.files).slice(0, 6); // Limit to 5 images
    setImages(files);
  };

  const handleSubmitAvatar = async (e) => {
    e.preventDefault()
    let form = new FormData()
    form.append('avatar', avatar)

    try {
      const res = await updateAvatar(form).unwrap();
      console.log(res)
      dispatch(setCredentials(res));
      toast.success('Profile updated')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const handleSubmitImages = async (e) => {
    e.preventDefault();
    let form = new FormData();
    images.forEach((image) => {
      form.append('images', image);
    });

    try {
      const res = await updateImages(form).unwrap();
      console.log(res)
      toast.success('Images updated')
      
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div>
      <div className="container">
        <div className='w-full h-auto flex gap-4 mt-4'>
          <div className='h-auto w-[210px] bg-slate-100 rounded-md hidden sm:block'>
            <Sidebar />
          </div>

          <div className='w-full bg-slate-50 rounded-md'>
            <div className='w-[80%]  max-w-[400px]'>
              <h1 className='text-center text-2xl m-8 font-[550] ' >Update Pictures</h1>
              <div className='bg-slate-100 p-4 rounded-lg'>
                <form action="" onSubmit={handleSubmitAvatar}>
                  <div className='flex gap-5 items-center justify-between w-full'>
                    {avatar && (
                      <div>
                        <img src={avatar instanceof File ? URL.createObjectURL(avatar) : userInfo.avatar} className='w-18 h-14  rounded-full ' alt="Selected" />
                      </div>
                    )

                    }
                    <Uploader name="avatar" id="avatar" onChange={handleAvatar} />
                  </div>
                  <button type='submit'
                    className='w-[100%] max-w-[400px] py-5 rounded-lg text-headingColor text-md font-[600] bg-slate-200 hover:bg-slate-500/50 flex items-center justify-center mt-3'
                    disabled={isLoading}>{isLoading ? <div className="loader"></div> : "Update Avatar"}</button>
                </form>
                

              </div>

              {/* Upload Images */}
              <div className='bg-slate-100 p-4 rounded-lg'>
                <form action="" onSubmit={handleSubmitImages}>
                    <Uploader name="images" id="images" multiple onChange={handleImage} />
                  <div className='grid grid-cols-3 gap-5 mt-6 w-full'>
                    {images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={URL.createObjectURL(image)}
                          className="w-24 h-20 rounded-md object-cover"
                          alt={`Selected ${index + 1}: ${image.name} `}
                        />
                      </div>
                    ))}
                  </div>
                  <button type='submit'
                    className='w-[100%] max-w-[400px] py-5 rounded-lg text-headingColor text-md font-[600] bg-slate-200 hover:bg-slate-500/50 flex items-center justify-center mt-3'
                    disabled={loading}>{loading ? <div className="loader"></div> : "Update Images"}</button>
                </form>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default UpdateHosPic;