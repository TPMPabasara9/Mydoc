import React from 'react'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets/assets/assets_frontend/assets.js';

const Navbar = () => {

  const naviagte = useNavigate();


  const [showMenu,setShowMenu] = useState(false);
  const [token,setToken]=useState(true);

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img className='w-44 cursor-pointer' src={assets.logo} alt="logo" />
      <ul className='hidden md:flex items-start gap-5 font-medium' >
        <NavLink to='/'>
          <li className='py-1'>Home</li>
          <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/doctors'>
          <li className='py-1'>All Doctors</li>
          <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto  hidden'/>
          </NavLink>
        <NavLink to='/about'>
          <li className='py-1'>About</li>
          <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden'/>
          </NavLink>
        <NavLink to='/contact'>
          <li className='py-1'>Contact</li>
          <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden'/>
          </NavLink>
      </ul>
      <div flex items-center gap-5>
        {
          token 
          ? <div className='flex items-center gap-2 cursor-pointer group relative' onClick={()=>setShowMenu(!showMenu)}>
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <img  className='w-2.5' src={assets.dropdown_icon} alt=""/>
            <div className='absolute top-0 right-0 pt-14 text-base text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded-flex-col gap-4 p-4'>
                <p onClick={()=>naviagte('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p  onClick={()=>naviagte('my-appointments')} className='hover:text-black cursor-pointer'>My Appointmnet</p>
                <p  onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
          </div>
          </div>
          :<button onClick={()=>naviagte('/login')} className='bg-green-500 text-white px-8 py-3 rounded-full font-light hidden md:block'>Create a Account</button>
        }
        
      </div>
    </div>
  )
}

export default Navbar;