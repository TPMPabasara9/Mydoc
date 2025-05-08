import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'



const Sidebar = () => {

    const { aToken } = useContext(AdminContext)

    return (
        <div className='min-h screen bg-white border-r-0'>
            {
                aToken && <ul className='text -[#515151] mt-5'>
                    <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-indigo-500' : ''}`} to={'/admin-dashboard'}>
                        <img src={assets.home_icon} alt="" />
                        <p>Dashboard</p>
                    </NavLink>

                    <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-indigo-500' : ''}`} to={'/all-appointments'}>
                        <img src={assets.appointment_icon} alt="" />
                        <p>Appointment</p>
                    </NavLink>

                    <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-indigo-500' : ''}`} to={'/add-doctor'}>
                        <img src={assets.add_icon} alt="" />
                        <p>Add</p>
                    </NavLink>

                    <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-indigo-500' : ''}`} to ={'/doctor-list'}>
                        <img src={assets.people_icon} alt="" />
                        <p>People</p>
                    </NavLink>
                </ul>
            }
        </div>
    )
}

export default Sidebar;