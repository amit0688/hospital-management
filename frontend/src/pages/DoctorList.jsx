import { useDeleteDoctorMutation, useGetAllDoctorsQuery } from '@/slices/hospitalUserApiSlice';
import React,{useState} from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import Selector from '@/componenets/Selector';
import DocTable from '@/componenets/DocTable';

function DoctorList() {

    const {data: doctors, isLoading, refetch } = useGetAllDoctorsQuery()
    const [deleteDoctor] = useDeleteDoctorMutation();

    const handleDelete = async (id) => {
      if (window.confirm('Are you sure you want to delete this doctor?')) {
        try {
          await deleteDoctor(id);
          refetch(); // Refetch the list after deleting
        } catch (error) {
          console.error('Failed to delete the doctor:', error);
        }
      }
    };
    console.log(doctors)
  return (
    <div className='container'>
    <div className="pr-3 h-full ">
    <h1 className='text-center m-10 text-3xl'>Doctor List</h1>

   
    <Table>
      <TableCaption>A list of doctors.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Full Name</TableHead>
          <TableHead>Specialization</TableHead>
          <TableHead>Contact</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {doctors && doctors.map(doctor => (
          <TableRow key={doctor._id}>
            <TableCell className="font-medium">{doctor._id}</TableCell>
            <TableCell>{doctor.fullname}</TableCell>
            <TableCell>{doctor.specialization ? doctor.specialization : "-"}</TableCell>
            <TableCell>{doctor.phone? doctor.phone : "-"}</TableCell>
            <TableCell className="text-right">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleDelete(doctor._id)}
                >
                  Delete
                </button>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  </div>

  )
}

export default DoctorList