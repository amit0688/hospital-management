import { useGetAllDoctorsQuery } from '@/slices/hospitalUserApiSlice';
import React,{useState} from 'react'
import Selector from '@/componenets/Selector';

function DoctorList() {
    const [doctors, setDoctors] = useState([]);

    const {data: docList, isLoading} = useGetAllDoctorsQuery()
    console.log(docList)
  return (
    <div>DoctorList</div>
  )
}

export default DoctorList