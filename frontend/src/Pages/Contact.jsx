import React from 'react'
import { assets } from '../assets/assets/assets/assets_frontend/assets';

const Contact = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'> US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row justify-center items-center gap-10 mb-28 text-sm'>
        <img src={assets.contact_image} alt="contact" className="w-full md:w-1/2 rounded-lg shadow-lg" />
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center md:w-1/2">
          <p className="text-lg font-semibold mb-2">OUR OFFICE</p>
          <p className="mb-4">54709 Williams Station <br /> Suite 350, Washington</p>
          <p className="mb-4">Phone: +1 123 456 7890<br/> Email: madushapabasra24@gmail.com</p>
          <p className="text-lg font-semibold mb-2">Careers at Prescripto</p>
          <p className="mb-4">Learn more about teams and job openings</p>
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300">Explore</button>
        </div>
      </div>
    </div>
  )
}

export default Contact;