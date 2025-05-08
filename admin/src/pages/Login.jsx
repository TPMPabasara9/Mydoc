import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets.js";
import { useState } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import {  toast } from 'react-toastify';


const Login = ()=>{

    const [state,setState] = useState('Admin')
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')

    const {setAToken,backendUrl} = useContext(AdminContext)

    const onSubmithandler = async(e)=>{
           
        e.preventDefault()

            try {
                if(state =='Admin'){
                    const {data} = await axios.post(`${backendUrl}/api/admin/login`,{email,password})
                    if(data.success){
                        localStorage.setItem('aToken',data.token)
                        setAToken(data.token)
                    }else{
                        toast.error(data.message)
                    }

                }else{
                      
                }



            }catch (error) {
                
            }
     
        }



    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form onSubmit={onSubmithandler} className="min-h-[80vh] flex items-center" >
                <div className="flex flex-col gap-3 items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
                   <div> 
                    <p className="text-2xl font-semibold m-auto "><span className="text-indigo-500">{state}</span> Login</p>
                </div>
                <div className="w-full">
                    <p>Email</p>
                    <input onChange={(e)=>setEmail(e.target.value)} className="border border-[#DADADA] rounded-full p-2 mt-1" type="email" placeholder="Enter your email"  required/>
                </div>
                <div>
                    <p>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} className="border border-[#DADADA] rounded-full p-2 mt-1"  type="password" placeholder="Enter your password"  required/>
                </div>
                <button className="bg-indigo-500 text-white w-full py-2 rounded-md text-base">Login</button>
                {
                    state === 'Admin' ? 
                    <p>Doctor Login? <span className="text-indigo-500 underline cursor-pointer" onClick={()=>setState('Doctor')}> Click here</span></p>
                    : <p>Admin Login?<span className="text-indigo-500 underline cursor-pointer" onClick={()=>setState('Admin')}>Click here</span> </p>
                }
                </div>
           </form>
      </div>
        
    )
}
export default Login;