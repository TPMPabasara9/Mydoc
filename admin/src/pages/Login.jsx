import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets.js";
import { useState } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext.jsx";
import { Icon } from "lucide-react";
import { UserCog, Stethoscope } from "lucide-react";




const Login = ()=>{

    const navigate = useNavigate();

    const [state,setState] = useState('Admin')
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')

    const {setAToken,backendUrl} = useContext(AdminContext)
    const {setDToken} = useContext(DoctorContext);

    const onSubmithandler = async(e)=>{
           
        e.preventDefault()

            try {
                if(state =='Admin'){
                    const {data} = await axios.post(`${backendUrl}/api/admin/login`,{email,password})
                    if(data.success){
                        localStorage.setItem('aToken',data.token)
                        setAToken(data.token)
                        navigate('/admin-dashboard');
                    }else{
                        toast.error(data.message)
                    }

                }else{

                    const {data} = await axios.post(backendUrl + '/api/doctor/login',{email,password})
                    if(data.success){
                        localStorage.setItem('dToken',data.token)
                        setDToken(data.token)
                        navigate('/doctor-dashboard');
                        toast.success("Login successful");
                        
                        console.log(data.token)
                      
                    }else{
                        toast.error(data.message)
                    }
                      
                }
            }catch (error) {
                
            }
     
        }
    // Choose icon based on state
    const iconProps = {
        className: "w-10 h-10 mb-2",
        style: { color: state === "Admin" ? "#6366F1" : "#10B981" } // Indigo for Admin, Emerald for Doctor
    };

    // Use Lucide icons for demonstration

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <img className="w-70 mb-2" src="\src\assets\logo.svg" alt="Logo" />
            <form onSubmit={onSubmithandler} className="min-h-[80vh] flex items-center">
                <div className="flex flex-col gap-4 items-start p-12 min-w-[400px] sm:min-w-[500px] border rounded-xl text-zinc-600 text-sm shadow-lg bg-white">
                    <div className="flex flex-col items-center w-full mb-4">
                        <p className="text-3xl font-semibold m-auto">
                            <span className={state === "Admin" ? "text-indigo-500" : "text-emerald-500"}>
                                {state}
                            </span> Login
                        </p>
                        {state === "Admin" ? (
                            <UserCog {...iconProps} />
                        ) : (
                            <Stethoscope {...iconProps} />
                        )}
                    </div>
                    <div className="w-full">
                        <p className="text-base">Email</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-[#DADADA] rounded-full p-3 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            type="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <p className="text-base">Password</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-[#DADADA] rounded-full p-3 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            type="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button className={`w-full py-3 rounded-md text-base font-medium transition-colors ${
                        state === "Admin"
                            ? "bg-indigo-500 hover:bg-indigo-600"
                            : "bg-emerald-500 hover:bg-emerald-600"
                    } text-white`}>
                        Login
                    </button>
                    {state === "Admin" ? (
                        <p>
                            Doctor Login?{" "}
                            <span
                                className="text-emerald-500 underline cursor-pointer"
                                onClick={() => setState("Doctor")}
                            >
                                Click here
                            </span>
                        </p>
                    ) : (
                        <p>
                            Admin Login?{" "}
                            <span
                                className="text-indigo-500 underline cursor-pointer"
                                onClick={() => setState("Admin")}
                            >
                                Click here
                            </span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}
export default Login;