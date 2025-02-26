import React, { useState } from 'react'

const Login= ()=> {

  const [state,setState] = useState('Sign Up');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [name,setName] = useState('');

 
      const handlesubmit = (e) => {
        e.preventDefault();
      }
  return (
    
<form className='min-h-[80vh] flex items-center justify-center' action=""> 
  <div className='flex flex-col gap-3 items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
    <p className='text-2xl font-semibold'>{state=== 'Sign Up' ? "Create Account" : "Login" } </p>
    <p>Please {state=== 'Sign Up' ? "Sign Up" : "Sign In" } to Book an Appointment </p>
    {
      state === 'Sign Up' && <div className='w-full'>
      <p>Full Name </p>
      <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.name) } value={name} />
      </div>
    }

  <div className='w-full'>
  <p>Email </p>
  <input className='border border-zinc-300 rounded w-ful  p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.email) } value={email} />
  </div>
  <div className='w-full'>
  <p>Password </p>
  <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.password) } value={password} />
  </div>

  <button className="bg-indigo-500 text-white w-full py-2 rounded-md text-base" >{state === 'Sign Up' ? "Create Account": "Login"}</button>
  {
    state==='Sign Up' ? <p className='text-xs'>Already have an account? <span className='text-indigo-500 cursor-pointer' onClick={()=>setState('Login')}>Login</span></p> : <p className='text-xs'>Don't have an account? <span className='text-indigo-500 cursor-pointer' onClick={()=>setState('Sign Up')}>Sign Up</span></p>
  }
</div>
</form>
  )
}
export default Login;