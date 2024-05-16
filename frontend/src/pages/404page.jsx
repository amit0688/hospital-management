import React from 'react'
import img from '../assets/images/404.jpg'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className='container'>
    <div className='w-full h-cover  flex flex-col justify-center gap-10 items-center  md:items-baseline'>
        {/* <div className=''>
            <h1 className='text-6xl leading-[70px] font-[900]' >
                Ooops! Sorry <br />page does not found
            </h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur velit repellat nobis, perspiciatis dicta laborum, veniam quo necessitatibus vel impedit deserunt tempore repellendus expedita dolor iure at aliquid voluptatibus commodi neque. Voluptates.</p>
            <Link>CLick me to go back</Link>
        </div> */}
        <div className=' flex md:justify-end   w-full '>

        <img src={img} alt="" className='xl:w-[50vw] md:w-[55vw]  w-full ' />
        </div>
        <div className='md:absolute bg-transparent  '>
            <h1 className='xl:text-[6vh] xl:leading-[70px] font-[900] text-4xl  md:text-4xl md:leading-[45px]' >
                Ooops! Sorry <br />page does not found
            </h1>
            <div className='sm:w-[400px] w-[350px] text-sm sm:text-base mt-6 flex gap-8 flex-col'>

            <p>The page you are looking for does not exist anymore or you are trying to open unvalid link.</p>
            <Link to='/' className='' ><div className=' p-4 rounded-full text-xl font-[500] border-2 w-[250px] '>
            Click to go back home</div></Link>
            </div>
        </div>
    </div>
    </div>
  )
}

export default PageNotFound