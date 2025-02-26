import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext.jsx';
const Doctors = () => {
  const navigate = useNavigate();

  const {speciality} =useParams();
  const [filterDoc,setfilterDoc]=useState([]);
  const [showFilter,setShowFilter]=useState(false);

  const {doctors} = useContext(AppContext);

const applyFilter = () => {
  if(speciality){
    setfilterDoc(doctors.filter((doctor) => doctor.speciality === speciality));
  }
  else{
    setfilterDoc(doctors);
  }
}
useEffect(()=>{
  applyFilter();
},[doctors,speciality])


  return (
    <div className='flex flex-col gap-4 p-2'>
      <p className='text-gray-600'>Browse to find the doctor for you</p>
      <button className={`py-1 px-3 border rounded text-sm transition-all items-start sm:hidden ${showFilter ? 'bg-indigo-500 text-white' : ''}`} onClick={()=>setShowFilter(prev=>!prev)}>Filters</button>
      <div className={`flex gap-10 items-start ${showFilter ? 'flex-col' : 'flex-row'}`}>
        <div className={`w-full sm:w-1/5 space-y-4 text-left font-medium items-start text-gray-600 ${showFilter ? 'block' : 'hidden'} sm:block`}>
          <p onClick={()=>speciality ==='General Physician' ? navigate('/doctors') : navigate('/doctors/General%20physician')} className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ?  "bg-indigo-100 text-black1" : ""} `}>General Physician</p>
          <p onClick={()=>speciality ==='Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ?  "bg-indigo-100 text-black1" : ""} `}>Gynecologist</p>
          <p onClick={()=>speciality ==='Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ?  "bg-indigo-100 text-black1" : ""} `}>Dermatologist</p>
          <p onClick={()=>speciality ==='Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ?  "bg-indigo-100 text-black1" : ""} `}>Pediatrician</p>
          <p onClick={()=>speciality ==='Neurologists' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ?  "bg-indigo-100 text-black1" : ""} `}>Neurologists</p>
          <p onClick={()=>speciality ==='Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ?  "bg-indigo-100 text-black1" : ""} `}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 y-6 mb-4'>
          {
            filterDoc.map((doctor, index) => (
              <article
                  key={index}
                  className="group border border-blue-100 rounded-xl overflow-hidden shadow-sm hover:scale-110 transition duration-300 ease-in-out hover:shadow-lg hover:border-blue-300"
                  onClick={() => navigate(`/appointment/${doctor._id}`)}
              >
                  <div className="aspect-square bg-blue-50 relative overflow-hidden">
                      <img
                          className="w-full h-full object-cover"
                          src={doctor.image}
                          alt={`${doctor.name}, ${doctor.speciality}`}
                          loading="lazy"
                      />
                  </div>

                  <div className="p-4 space-y-2">
                      <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-sm text-green-600">Available</span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-800">{doctor.name}</h3>
                      <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                  </div>
              </article>
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors;