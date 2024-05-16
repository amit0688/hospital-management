import React, { useState, useEffect } from 'react'
import { useGetAllQuery, useGetHospitalsByCityQuery, useSearchHospitalsQuery } from '@/slices/hospitalUserApiSlice'
import HospitalCard from '@/componenets/HospitalCard'
import Selector from '@/componenets/Selector'
import { CiSearch } from "react-icons/ci";
import useDebounce from '@/hooks/useDebounce';
import Loader from '@/componenets/Loader';
import NoDataMessgae from '@/componenets/NoDataMessgae';





function FindHospital() {

  const [selectedCity, setSelectedCity] = useState("");
  const [search, setSearch] = useState("");
  const handleSelect = (city) => {
    setSelectedCity(city);
    console.log(selectedCity)
    console.log("Selected District:", city);
  }

  const debouncedSearch = useDebounce(search, 500);

  const { data: hospitals, isLoading, isError, refetch } = useSearchHospitalsQuery({ city: selectedCity, search: debouncedSearch });



  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  }



  const handleSearchButton = () => {
    // Trigger search query
    refetch();
  };


  return (
    <div>
      <div className="container">
        <div className='flex justify-center sticky top-[100px] bg-white z-[99] rounded-lg'>
          <div className='flex md:h-[100px] h-[150px] mt-10 justify-center flex-col md:flex-row w-full md:mt-5 items-center md:p-8 p-4 bg-white border-gray-200 border-2 rounded-lg shadow-sm'>
            <div className='relative w-full md:w-[50%] max-w-[400px] z-50'>
              <Selector onSelect={handleSelect} label="City" placeholder="city" opt="hosregcity" />
            </div>
            <div className=' w-full flex  md:w-[50%]'>

              <label htmlFor="" className='text-2xl relative left-[25px] top-[8px] '><CiSearch /></label>
              <input type="text" onChange={handleSearchInput} value={search} name='search' placeholder='Search...' className=' w-[60%] border-0 border-b-2 py-1 px-10 outline-none text-lg' />
              <button onClick={handleSearchButton} className='border-2 border-solid px-4 py-2 font-[500] ml-3 w-[25%] max-w-[150px] flex items-center justify-center rounded-md hover:bg-slate-50'>Search</button>
            </div>
          </div>

        </div>




          {
            isLoading ? (<Loader />
            )
              :
              (hospitals.length ?
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-12'>
                {hospitals && hospitals.map((hospital) => (
                  <HospitalCard key={hospital._id} user={hospital} />
                ))}
        </div>
                : <NoDataMessgae message="No hospital found with the input query" />)
          }
      </div>
    </div>

  )
}

export default FindHospital