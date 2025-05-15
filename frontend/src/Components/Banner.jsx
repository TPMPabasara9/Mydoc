import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets/assets/assets_frontend/assets';

const Banner = () => {
    const naviagte = useNavigate();
    return (
        <div className='flex bg-indigo-500 rounded-lg px-6 sm:px-10 md:px-12 my-20 md:mx-10'>
            {/*........Left side .....*/}
                        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
                            <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                            <p>Book Appointment</p>
                            <p> With 100+ Trusted Doctors</p>
                        </div>
                        <button onClick={()=>{naviagte('/login'),scrollTo('0,0')} } className='bg-white text-xm xm:text-base text-gray-600 px-8 py-3 rounded-3xl mt-6 hover:scale-105 transition-all duration-100'  >Create a account</button>
                        </div >
                        {/*........Right side .....*/}
            <div className=' md:blcok md:w-1/2 lg:w-{270px} relative ' >
                <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt=""/>
            </div>
      
        </div>
    );
}

export default Banner;