import React, { createContext, use } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


export const DoctorContext = createContext();

const DoctorContextProvider = ( props ) => {

    const backedUrl = import.meta.env.VITE_BACKEND_URL;
    const currencySymbol = 'LKR'; // Assuming a default currency symbol

    const [dToken,setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken'):'');
    const [appointments, setAppointments] = useState([]);
    const [doctor, setDoctor] = useState({});
    const [dashData,setDashData] =  useState({});

    const getAppointments =async  () => {
        try{
            
            const {data} = await axios.get(`${backedUrl}/api/doctor/doctor-appointments`,{headers: {dToken}});
              console.log(data.appointments.reverse());
            if(data.success){
                setAppointments(data.appointments);
              
            }else{
                toast.error(data.message);
                
            }


        }catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const loadDoctorProfile = async () => {
        try {
            const {data} = await axios.get(`${backedUrl}/api/doctor/doctor-profile`,{headers:{dToken}});
            if(data.success){
                console.log(data.doctor);
                setDoctor(data.doctor);

            }
            else{
                toast.error(data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);     
        }
    }

    const completeAppointment = async (appointmentId) =>{
        try {
            const {data} = await axios.post(`${backedUrl}/api/doctor/complete-appointment`,{appointmentId},{headers:{dToken}});
            if(data.success){
                toast.success(data.message);
                getAppointments();
            }
            else{
                toast.error(data.message);

            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            
        }
    }
    const cancelAppointment = async (appointmentId) =>{
        try {
            const {data} = await axios.post(`${backedUrl}/api/doctor/cancel-appointment`,{appointmentId},{headers:{dToken}});
            if(data.success){
                toast.success(data.message);
                console.log(data);
                getAppointments();
            }
            else{
                toast.error(data.message);

            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            
        }
    }

    const getDashData = async () => {
        try {

            const {data} = await axios.get(`${backedUrl}/api/doctor/dashboard`,{headers:{dToken}});
            if(data.success){
                setDashData(data.dashData);
                console.log(data.dashData);
            }
            else{
                toast.error(data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const value = {
        dToken,setDToken,
        backedUrl,
        getAppointments,
        appointments,setAppointments,loadDoctorProfile,doctor,currencySymbol,completeAppointment,cancelAppointment,
        dashData,setDashData,getDashData

    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;