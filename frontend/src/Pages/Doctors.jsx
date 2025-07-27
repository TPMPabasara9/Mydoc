import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext.jsx';
const Doctors = () => {
  const navigate = useNavigate();

  const {speciality} = useParams();
  const [filterDoc, setfilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  const {doctors} = useContext(AppContext);

const applyFilter = () => {
  let filtered = [...doctors];

  // Apply specialty filter
  if (speciality) {
    filtered = filtered.filter((doctor) => doctor.speciality === speciality);
  }

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter((doctor) => 
      doctor.name.toLowerCase().includes(query) || 
      doctor.speciality.toLowerCase().includes(query)
    );
  }



  setfilterDoc(filtered);
}

useEffect(() => {
  applyFilter();
}, [doctors, speciality, searchQuery, sortBy]);


  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-2">
          Find Your Doctor
        </h1>
        <p className='text-gray-600'>Discover and connect with qualified healthcare professionals</p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search doctors by name or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        
        <div className="flex gap-4">
 
        </div>
      </div>

      {/* Mobile Filter Button */}
      <button 
        className={`mb-6 sm:hidden flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-all ${
          showFilter 
            ? 'bg-indigo-600 text-white' 
            : 'bg-white border border-gray-200 text-gray-700'
        }`} 
        onClick={()=>setShowFilter(prev=>!prev)}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
        </svg>
        Filters
      </button>

      <div className={`flex gap-8 items-start ${showFilter ? 'flex-col' : 'flex-row'}`}>
        {/* Specialties Sidebar */}
        <div className={`w-full sm:w-1/4 space-y-2 text-left ${showFilter ? 'block' : 'hidden'} sm:block`}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Specialties</h2>
          {[
            { key: 'General Physician', label: 'General Physician' },
            { key: 'Gynocologist', label: 'Gynecologist' },
            { key: 'Dermotologist', label: 'Dermatologist' },
            { key: 'Pediatricians', label: 'Pediatrician' },
            { key: 'Neurologists', label: 'Neurologist' },
            { key: 'Gastronologist', label: 'Gastroenterologist' },
            {key : 'Psychiatrist', label: 'Psychiatrist' }
          ].map(({ key, label }) => (
            <div
              key={key}
              onClick={() => speciality === key ? navigate('/doctors') : navigate(`/doctors/${key}`)}
              className={`w-full px-4 py-3 rounded-lg transition-all cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2 ${
                speciality === key 
                  ? 'bg-indigo-100 text-indigo-600 font-medium shadow-sm' 
                  : 'text-gray-600'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${speciality === key ? 'bg-indigo-600' : 'bg-gray-300'}`}></span>
              {label}
            </div>
          ))}
        </div>
        <div className='w-full'>
          {filterDoc.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No doctors found</h3>
              <p className="text-gray-500 mt-2">Try changing your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterDoc.map((doctor, index) => (
                <article
                  key={index}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => navigate(`/appointment/${doctor._id}`)}
                >
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50">
                    <img
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      src={doctor.image}
                      alt={`${doctor.name}, ${doctor.speciality}`}
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-green-600 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        Available
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">{doctor.speciality}</p>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white rounded-lg text-sm font-medium transition-all duration-300">
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors;