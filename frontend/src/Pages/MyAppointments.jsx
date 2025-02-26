import React, { useContext } from 'react'
import {AppContext } from '../Context/AppContext'

const MyAppointments = () => {

  const {doctors} = useContext(AppContext);

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointements</p>
      <div>
      {doctors.slice(0,3).map((item,index)=>(
        <div className="grid grid-cols-[1fr_4fr] gap-4 sm:flex sm:gap-6 py-2  border-b" key={index}>
          <div>
            <img  className="w-32 bg-indigo-50" src={item.image} alt="" />
          </div>
          <div className='flex-1 text-sm text-zinc-600'>
            <p className='text-neutral-800 font-semibold'>{item.name}</p>
            <p>{item.speciality}</p>
            <p className='text-zinc-700 mt-1'>Address:</p>
            <p className='text-zinc-700 font-medium mt-2'>{item.address.line1}</p>
            <p className='text-xs font-semibold'>{item.address.line2}</p>
            <p className='text-xs font-semibold'>{item.address.city}</p>
            <p className='text-sm font-semibold mt-3'><span className='text-xs mt-1'>Date & Time</span> 24, July, 2024 | 5.30 p.m</p>
          </div>
          <div>
            <div className='flex flex-col gap-2 justify-end'>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2  border hover:bg-indigo-500 hover:text-white transition-all'>Pay Online</button>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2  border hover:bg-red-500 hover:text-white transition-all'>Cancel Appointentt</button>
            </div>
          </div>
        </div>
      ))}
      </div>
        
    </div>
  )
}

export default MyAppointments