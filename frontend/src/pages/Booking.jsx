import { Calendar } from '@/components/ui/calendar'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Button } from '@/components/ui/button'
import { CalendarDays, Clock } from 'lucide-react'
import { useBookingMutation, useCheckoutMutation } from '@/slices/bookingSlice'
import toast from 'react-hot-toast'
import axios from 'axios'
import { redirect, useNavigate } from 'react-router-dom'



function generateTimeSlots(start, end, duration) {
  let timeSlots = [];
  let startTime = new Date(`January 1, 2022 ${start}`);
  let endTime = new Date(`January 1, 2022 ${end}`);

  while (startTime < endTime) {
    let slotEndTime = new Date(startTime.getTime() + duration * 60000); // Convert minutes to milliseconds
    timeSlots.push({
      start: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      end: slotEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      booked: false
    });
    startTime = slotEndTime;
  }

  return timeSlots;
}

// Example usage
// const start = '08:00:00'; // Start time of clinic hours
// const end = '13:00:00'; // End time of clinic hours
// const duration = 30; // Appointment duration in minutes
// const evstart = '16:00:00'; // Start time of clinic hours
// const evend = '18:00:00'; // End time of clinic hours
// const evduration = 10; // Appointment duration in minutes

// const morningtimeSlots = generateTimeSlots(start, end, duration);
// const eveningtimeSlots = generateTimeSlots(evstart, evend, evduration);
// const timeSlots = [...morningtimeSlots, ...eveningtimeSlots]



function Booking({ doctor }) {
  const { userInfo } = useSelector((state) => state.auth)
  const [date, setDate] = useState(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState()
  const navigate = useNavigate()

  const [timeSlots, setTimeSlots] = useState([]);
  // const [booking, {isLoading}] = useBookingMutation()
  // const [checkout] = useCheckoutMutation()

  useEffect(() => {
    // Generate time slots based on the selected date
    const start = '08:00:00'; // Start time of clinic hours
    const end = '13:00:00'; // End time of clinic hours
    const duration = 30; // Appointment duration in minutes
    const evstart = '16:00:00'; // Start time of clinic hours
    const evend = '18:00:00'; // End time of clinic hours
    const evduration = 10; // Appointment duration in minutes

    const morningtimeSlots = generateTimeSlots(start, end, duration);
    const eveningtimeSlots = generateTimeSlots(evstart, evend, evduration);
    const combinedTimeSlots = [...morningtimeSlots, ...eveningtimeSlots];

    setTimeSlots(combinedTimeSlots);
    setSelectedTimeSlot('')
  }, [date]);

  console.log(selectedTimeSlot)

  const isPastDay = (day) => {
    return day < new Date()
  }

  const next7days = (day) => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 7);
    return day > nextDate;
  };
  const fee = doctor.fee ? doctor.fee : 1

  const handleBooking = async () => {
    !userInfo ? (navigate('/user/login'), toast.error("Please Login to book appointment")) : console.log('logged in')


    try {
      const { data: { key } } = await axios.get("http://www.localhost:3000/api/getkey");
      const { data: { order } } = await axios.post("http://localhost:3000/api/booking/checkout", {
        amount: fee,
      });
  
      console.log(order);
  
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Aspatal",
        description: "Tutorial of RazorPay",
        image: "http://res.cloudinary.com/dsusy7gxb/image/upload/v1715755156/rx6kzlaegmfn6ymuktza.png",
        order_id: order.id,
        callback_url: "http://localhost:3000/api/booking/paymentverification",
        prefill: {
          name: userInfo.fullname,
          email: userInfo.email,
          contact: userInfo.phone
        },
        notes: {
          "address": "Razorpay Corporate Office"
        },
        theme: {
          "color": "#121212"
        },
        handler: (response) => {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          axios.post('http://localhost:3000/api/booking/paymentverification', {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            timeSlot: selectedTimeSlot,
            appointmentDate: date,
            doctor: doctor._id,
            user: userInfo._id,
            fee: fee,
          })
          .then((response) => {
            // Handle the response from backend
            console.log(response.data); // Log the response data
            const { success, redirectUrl } = response.data; // Destructure properties from the response data
            if (success && redirectUrl) {
              window.location.href = redirectUrl; // Redirect the user if success and redirectUrl are provided
            } else {
              console.error('Booking failed or redirect URL not provided');
            }
          })
          .catch((error) => {
            console.error(error); // Handle error response from backend
          });
        }
      };
  
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error('Error:', error); // Handle error
    }
  };
  
  console.log(selectedTimeSlot)

  return (
    <div className='z-99999'>
      <Dialog>
        <DialogTrigger className='mt-3 border rounded-md p-3 hover:bg-blue-50'>
          Book Appointment
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center md:text-left">Book appointment </DialogTitle>
            <DialogDescription>
              <>
                <div className='flex flex-col md:flex-row  gap-2 md:gap-10 mt-2 md:mt-6'>
                  <div className='flex flex-col gap-3   items-baseline '>
                    <h2 className='flex gap-2 items-center'>
                      <CalendarDays className='text-primaryColor h-5 w-5' />Select Date
                    </h2>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(day) => isPastDay(day) || next7days(day)}
                      className="rounded-md border"
                    />
                  </div>

                  <div className=''>
                    <h2 className='flex gap-2 items-center'>
                      <Clock className='text-primaryColor h-5 w-5' /> Select Time
                    </h2>


                    <ScrollArea className="h-[200px] md:h-[310px] mt-3">
                      <div className='grid grid-cols-3 md:grid-cols-4 gap-2 border rounded-lg p-5'>
                        {timeSlots.map((item, index) => (
                          <h2
                            key={index}
                            onClick={() => setSelectedTimeSlot(item.start)}
                            className={`p-2 border text-center cursor-pointer hover:bg-blue-600 hover:text-white rounded-full ${item.start === selectedTimeSlot && 'bg-blue-600 text-white'}`}>{item.start}</h2>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </>

            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="">
            <DialogClose asChild>
                <Button type="button" variant="outline" className="m-1">
                  Cancel
                </Button>
            </DialogClose>
            <DialogClose asChild>
                <Button type="button" className="m-1" onClick={handleBooking} disabled={!(date && selectedTimeSlot)}>
                  Book
                </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Booking