import React, { useCallback, useContext } from 'react'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets/assets/assets_frontend/assets.js';
import { AppContext } from '../Context/AppContext.jsx';


const Navbar = () => {

  const naviagte = useNavigate();

  const {token,setToken,userData} = useContext(AppContext);

  const [showMenu,setShowMenu] = useState(false);

  const logout = async (req,res) =>{
    setToken(false)
    localStorage.removeItem('token')
  }


  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img onClick={()=>naviagte('/')} className='w-44 cursor-pointer' src="/src/assets/logo.svg" alt="logo" />
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
      <div className='flex items-center gap-5'>
        {
          token && userData
          ? <div className='flex items-center gap-2 cursor-pointer group relative' >
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img  className='w-2.5' src={assets.dropdown_icon} alt=""/>
            <div className='absolute top-0 right-0 pt-14 text-base text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded-flex-col gap-4 p-4'>
                <p onClick={()=>naviagte('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p  onClick={()=>naviagte('my-appointments')} className='hover:text-black cursor-pointer'>My Appointmnet</p>
                <p  onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
          </div>
          </div>
          :<button onClick={()=>naviagte('/login')} className='bg-green-500 text-white px-8 py-3 rounded-full font-light hidden md:block'>Create a Account</button>
        }
        <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden items-end' src={assets.menu_icon}  alt="" />
        {/*--------Mobile Menu--------*/}
      {showMenu && (
        <div  onClick={() => setShowMenu(false)}></div>
      )}
          <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'}md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
            <div className='flex items-center justify-between p-4'>
            <img className='w-36' src={assets.logo} alt="" />
            <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 px-5 text-lg font-medium mt-5'>
            <NavLink   onClick={()=>setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
            <NavLink  onClick={()=>setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink  onClick={()=>setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
            <NavLink  onClick={()=>setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar;