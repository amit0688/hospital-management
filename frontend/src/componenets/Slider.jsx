import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { Link } from 'react-router-dom';

function Slider({ user }) {
  const slides = [
    { url: user.images[0] || 'http://res.cloudinary.com/dsusy7gxb/image/upload/v1715891853/votdcoomtcvel3ntpocu.jpg' },
    { url: user.images[1] || 'http://res.cloudinary.com/dsusy7gxb/image/upload/v1715891853/votdcoomtcvel3ntpocu.jpg' },
    { url: user.images[2] || 'http://res.cloudinary.com/dsusy7gxb/image/upload/v1715891853/votdcoomtcvel3ntpocu.jpg' },
    { url: user.images[3] || 'http://res.cloudinary.com/dsusy7gxb/image/upload/v1715891853/votdcoomtcvel3ntpocu.jpg' },
    { url: user.images[4] || 'http://res.cloudinary.com/dsusy7gxb/image/upload/v1715891853/votdcoomtcvel3ntpocu.jpg' },
    { url: user.images[5] || 'http://res.cloudinary.com/dsusy7gxb/image/upload/v1715891853/votdcoomtcvel3ntpocu.jpg' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className='max-w-[500px] h-[350px]  w-full m-0 p-0 relative group '>
      <Link  to={`/hospital/${user._id}`}>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover '
      >
        {/* <img src={`url(${slides[currentIndex].url})`} className='w-full h-full' alt="" /> */}
        </div></Link >
      {/* Left Arrow */}
      <div className='lg:hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className='lg:hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className='flex justify-center items-center rounded-lg px-4 flex-row' >
        <AnimatePresence initial={false}>
          {slides.map((slide, slideIndex) => (
            <motion.div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`text-2xl cursor-pointer hover:text-blue-400 ${currentIndex === slideIndex ? 'text-4xl text-blue-600' : ''}`}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.5, delay: slideIndex * 0.1 }}
            >
              <RxDotFilled />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Slider;
