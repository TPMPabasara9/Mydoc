import React from 'react'
import './index.css';
import { Route,Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Appointment from './Pages/Appointmnet';
import Contact from './Pages/Contact';
import Profile from './Pages/Profile';
import Doctors from './Pages/Doctors';
import About from './Pages/About';
import MyAppointments from './Pages/MyAppointments';
import Navbar from './Components/Navbar';
  import { ToastContainer, toast } from 'react-toastify';



const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%] ">
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/doctors" element={<Doctors/>} />
        <Route path="/doctors/:speciality" element={<Doctors/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/my-profile" element={<Profile/>} />
        <Route path="/my-appointments" element={<MyAppointments/>} />
        <Route path="/appointment/:docId" element={<Appointment/>} />
      </Routes>
    
    </div>
  
  )
}

export default App;
