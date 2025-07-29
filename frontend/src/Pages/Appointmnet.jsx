import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../Context/AppContext.jsx';
import { assets } from '../assets/assets/assets/assets_frontend/assets.js';
import RelatedDoctors from '../Components/RelatedDoctors.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';



const Appointment = () => {


    const {docId} = useParams();
    console.log("docId from URL:", docId);
    const {doctors, currencySymbol,backendUrl,token,getDoctorsData} =useContext(AppContext);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED' , 'THU', 'FRI', 'SAT'] 

    const navigate = useNavigate();

    const [docInfo,setDocInfo] = useState(null);
    const [docSlots,setDocSlots] = useState([])
    const [slotIndex,setSlotIndx] =useState(0)
    const [slotTime,setslotTime] = useState('')

    const fetchDocInfo = async () => {
     const  docInfo= doctors.find((doc) => doc._id === docId)
      setDocInfo(docInfo);
      
    }

    const getAvailableSlots = async ()=>{
      setDocSlots([])

      //getting current date 
      let today= new Date();

      for(let i=0; i<7 ;i++){
        //getting date with index
        let currentDate = new Date(today)
        currentDate.setDate(today.getDate()+ i)

        

        //Setting end time of the date with index
        let endtime = new Date();
        endtime.setDate(today.getDate()+ i)
        endtime.setHours(21,0,0,0)
        
        //setting hours
        if(today.getDate() ===  currentDate.getDate()){
            currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
            currentDate.setMinutes(currentDate.getMinutes()> 30 ? 30 :0)
        } else {
          currentDate.setHours(10)
          currentDate.setMinutes(0)
        }


        let timeSlots = []
      
     
        while(currentDate < endtime){
          let formattedTime = currentDate.toLocaleTimeString([],{hour: '2-digit',minute:'2-digit'})

          let day = currentDate.getDate();
          let month = currentDate.getMonth() + 1; // Months are zero-based in JavaScript
          let year = currentDate.getFullYear();

          // Check if the slot is already booked
          const slotDate = day+"_" + month + "_" + year;
          const slotTime = formattedTime

          const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;
          if(isSlotAvailable){
            
            timeSlots.push({
              datetime:new Date(currentDate),
              time:formattedTime
            })
          
          }


            // add slots to array
   
            //Increment current time by 30 minutes
            currentDate.setMinutes(currentDate.getMinutes()+ 30)
        }

        setDocSlots(prev=> ([...prev, timeSlots]))

       }

    }

const bookAppointment = async () =>{
  if(!token){
    toast.warn('Login to book appointment')
    return navigate('/login')
  }

  try {

    const date = docSlots[slotIndex][0].datetime

    let day = date.getDate()
    let month = date.getMonth()+1
    let year = date.getFullYear()

    const slotDate = day + "_" + month + "_" + year;

    const {data} =await axios.post(`${backendUrl}/api/user/book-appointment`,{docId,slotDate,slotTime},{headers:{token}})
    if(data.success){
      toast.success(data.message)
      getDoctorsData()
      navigate('/my-appointments');
    }
    else{
      toast.error(data.message)
    }
    
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }

}


   useEffect(()=>{
      getAvailableSlots()
    },[docInfo])

   
useEffect(()=>{
  console.log(docSlots)
},[docSlots])



    useEffect (()=>{
      if(doctors.length >10){
        fetchDocInfo();
      }
      
    },[doctors,docId])

  return docInfo && (
   <div className="mb-16">
  <div className='flex flex-col sm:flex-row gap-6'>
    {/*--------- Doctor Image Section ----------*/}
    <div className='flex justify-center sm:justify-start'>
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl transform rotate-2 group-hover:rotate-3 transition-transform duration-300"></div>
        <img 
          className='relative w-full sm:max-w-72 h-80 sm:h-96 object-cover rounded-2xl shadow-xl border-4 border-white group-hover:scale-105 transition-transform duration-300' 
          src={docInfo.image} 
          alt={docInfo.name}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>

    {/*--------- Doctor Information Card ----------*/}
    <div className='flex-1 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mx-2 sm:mx-0 mt-[-60px] sm:mt-0 relative overflow-hidden'>
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-100/20 to-purple-100/20 rounded-full -translate-y-20 translate-x-20"></div>
      
      <div className="relative z-10">
        {/*--------- Doctor Name & Verification -------*/}
        <div className="mb-4">
          <div className='flex items-center gap-2 mb-2'>
            <h1 className='text-2xl font-medium text-gray-900'>
              {docInfo.name}
            </h1>
            <img className='w-5' src={assets.verified_icon} alt="Verified" />
          </div>
          
          {/*--------- Credentials & Experience -------*/}
          <div className='flex items-center gap-2 text-sm text-gray-600 mb-1'>
            <span className='font-medium'>{docInfo.degree} - {docInfo.speciality}</span>
          </div>
          <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-700 border">
            {docInfo.experience}
          </div>
        </div>

        {/*------ Doctor About Section --------*/}
        <div className="mb-6">
          <div className='flex items-center gap-1 mb-2'>
            <h3 className='text-sm font-medium text-gray-900'>About</h3>
            <img className="w-4 h-4" src={assets.info_icon} alt="Info" />
          </div>
          
          <p className='text-sm text-gray-500 max-w-[700px] leading-relaxed'>
            {docInfo.about}
          </p>
        </div>

        {/*------ Appointment Fee --------*/}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
          <p className='text-gray-700 font-medium'>
            Appointment fee: <span className='text-indigo-600 font-semibold text-lg'>{currencySymbol} {docInfo.fee}.00</span>
          </p>
        </div>
      </div>
    </div>
  </div>


    {/*-------booking slots---------*/}
    <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
      <p>Booking Slots</p>
      <div className='flex gap-3 items-center w-full overflow-x-sroll mt-4'>
        {
          docSlots.length && docSlots.map((item,index)=>(
            <div  onClick={()=>{setSlotIndx(index)}} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-indigo-400 text-white' : 'border border-gray-300 '} `} key={index}>
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))
        }
    </div>
    <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4 '>
      {docSlots.length && docSlots[slotIndex].map((item,index)=>(
        <p onClick={()=>setslotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-indigo-400 text-white' : 'text-gray-400 border border-gray-300' } `} key={index}>
          {item.time.toLowerCase()}
        </p>
      ))}
    </div>

    <button onClick={bookAppointment} className='bg-indigo-400 text-white text-sm font-light px-14 py-3 rounded-full my-6 '>Book an appointemnet</button>
    </div>

    {/*Listing related doctors */}

    <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
</div>
  )
}

export default Appointment;