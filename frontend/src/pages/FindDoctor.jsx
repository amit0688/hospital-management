import React, { useState, useEffect } from 'react'
import { useGetAllDocQuery, useGetDocByCityQuery, useSearchDoctorsQuery } from '@/slices/doctorUserApiSlice';
import DoctorCard from '../componenets/DoctorCard'
import Selector from '@/componenets/Selector';
import { CiSearch } from "react-icons/ci";
import useDebounce from '@/hooks/useDebounce';
import Loader from '@/componenets/Loader';
import NoDataMessgae from '@/componenets/NoDataMessgae';



function FindDoctor() {

  const [selectedCity, setSelectedCity] = useState("");
  const [search, setSearch] = useState("");
  const handleSelect = (city) => {
    setSelectedCity(city);
  }
  const debouncedSearch= useDebounce(search, 500);

  const { data: doctors, isLoading, isError, refetch } = useSearchDoctorsQuery({ city: selectedCity, search: debouncedSearch } );



  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  }



  const handleSearchButton = () => {
    // Trigger search query
    refetch();
  };



  return (
    <div>
      <div className='container'>
        <div className='flex justify-center sticky top-[100px] rounded-lg bg-white'>



          <div className='flex md:h-[100px] h-[150px] mt-6 justify-center flex-col md:flex-row w-full md:mt-5 items-center md:p-8 p-4 bg-white border-gray-200 border-2 rounded-lg shadow-sm'>
            <div className='relative w-full md:w-[50%] max-w-[400px] z-50'>
              <Selector onSelect={handleSelect} label="City" placeholder="city" opt="docregcity" />
            </div>
            <div className=' w-full flex  md:w-[50%]'>

              <label htmlFor="" className='text-2xl relative left-[25px] top-[8px] '><CiSearch /></label>
              <input type="text" name='search' value={search} onChange={handleSearchInput} placeholder='Search...' className=' w-[60%] border-0 border-b-2 py-1 px-10 outline-none text-lg' />
              <button onClick={handleSearchButton} className='border-2 border-solid px-4 py-2 font-[500] ml-3 w-[25%] max-w-[150px] flex items-center justify-center rounded-md hover:bg-slate-50'>Search</button>
            </div>
          </div>

        </div>

        {
          isLoading ? (
            <Loader />
          )
          :
          (doctors.length ? 
            <div className='flex items-center justify-center flex-col gap-6 mt-10'>
          {doctors && doctors.map((doctor) => (
            <DoctorCard key={doctor._id} user={doctor} />
          ))
          }

        </div>
          :
          <NoDataMessgae message="No doctors found with the input query" />
          )
        }
        
      </div>
    </div>
  )
}

export default FindDoctor