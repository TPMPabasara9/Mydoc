import React, { useContext } from 'react'
import {AppContext } from '../Context/AppContext'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { data } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyAppointments = () => {

  const {backendUrl , token ,getDoctorsData} = useContext(AppContext);

  const [appointments,setAppointments] = useState([]);
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const slotDateFormat = (slotDate) => {
    if (!slotDate || typeof slotDate !== "string") return "Invalid Date";
  const dateArray = slotDate.split('_'); // [day, month, year]
  const day = dateArray[0];
  const month = months[Number(dateArray[1]) - 1]; // Adjust index
  const year = dateArray[2];
  return `${day} ${month} ${year}`; // Add space for readability
};

  const getUserAppointments = async (req, res) => {
    try {

      const {data} = await axios.get(`${backendUrl}/api/user/appointments`, {headers:{token}});
      if(data.success){
        setAppointments(data.appointments.reverse());
        console.log(data.appointments)
        

      }
      
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.message);
      
    }
  }

  const cancelAppointmnet = async (appointmentId) =>{
    try {
      console.log("appoitmnetId",appointmentId)
      const {data} = await axios.post(`${backendUrl}/api/user/cancel-appointment`,{appointmentId},{headers:{token}});
      if(data.success){
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();

      
    } else{
      toast.error(data.message);
    }
  }catch (error) {
      console.error("Error canceling appointment:", error);
      toast.error(error.message);
      
    }
  }

  useEffect(()=>{
    if(token){
      getUserAppointments();
    }
  },[token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointements</p>
      <div>
      {appointments.map((item,index)=>(
        <div className="grid grid-cols-[1fr_4fr] gap-4 sm:flex sm:gap-6 py-2  border-b" key={index}>
          <div>
            <img  className="w-32 bg-indigo-50" src={item.docData.image} alt="" />
          </div>
          <div className='flex-1 text-sm text-zinc-600'>
            <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
            <p>{item.docData.speciality}</p>
            <p className='text-zinc-700 mt-1'>Address:</p>
            <p className='text-zinc-700 font-medium mt-2'>{item.docData.address.line1}</p>
            <p className='text-xs font-semibold'>{item.docData.address.line2}</p>
      
            <p className='text-sm font-semibold mt-3'><span className='text-xs mt-1'>Date & Time</span> {slotDateFormat(item.slotDate)}| {item.slotTime}</p>
          </div>
          <div>
            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled &&<button
              
              className='text-sm text-stone-500 text-center sm:min-w-48 py-2  border hover:bg-indigo-500 hover:text-white transition-all'>Pay Online</button>}
              {!item.cancelled &&<button onClick={()=>cancelAppointmnet(item._id)}  className='text-sm text-stone-500 text-center sm:min-w-48 py-2  border hover:bg-red-500 hover:text-white transition-all'>Cancel Appointentt</button>}
              {item.cancelled && <button className='text-sm text-red-600 text-center sm:min-w-48 py-2  border bg-amber-50'>Appointment Cancelled</button>}
            </div>
          </div>
        </div>
      ))}
      </div>
        
    </div>
  )
}

export default MyAppointments