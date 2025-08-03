import React from 'react';
import {useContext} from 'react';
import { AdminContext } from '../../context/AdminContext.jsx';
import { useEffect } from 'react';
import { useState } from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { AppContext } from '../../context/AppContext.jsx';

const Dashboard = () =>{
  const {aToken, getDashboardData, dashData, cancelAppointment} = useContext(AdminContext);
  const {slotDateFormat, currencySymbol} = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect (()=>{
    const fetchData = async () => {
      if(aToken){
        setLoading(true);
        await getDashboardData();
        setLoading(false);
        console.log("Admin token found, fetching dashboard data", dashData);
      } else {
        console.log("No admin token found");
        setLoading(false);
      }
    };
    fetchData();
  },[aToken]);

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    try {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return timeString;
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      console.error("Invalid date format:", dateString);
      return dateString;
    }
  };

  const getStatusBadge = (appointment) => {
    if (appointment.cancelled) {
      return <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">Cancelled</span>;
    }
    if (appointment.isCompleted) {
      return <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">Completed</span>;
    }
    return <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-medium">Pending</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return dashData && (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6'>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Admin Dashboard
        </h1>
        <p className="text-lg text-gray-600">Overview of MediBook</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <img className='w-8 h-8' src={assets.doctor_icon} alt="Doctors" />
              </div>
              <div>
                <p className='text-3xl font-bold text-gray-800'>{dashData.totalDoctors}</p>
                <p className='text-gray-500 font-medium'>Total Doctors</p>
              </div>
            </div>
            <div className="text-blue-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <img className='w-8 h-8' src={assets.appointment_icon} alt="Appointments" />
              </div>
              <div>
                <p className='text-3xl font-bold text-gray-800'>{dashData.totalAppointments}</p>
                <p className='text-gray-500 font-medium'>Total Appointments</p>
              </div>
            </div>
            <div className="text-green-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <img className='w-8 h-8' src={assets.patients_icon} alt="Patients" />
              </div>
              <div>
                <p className='text-3xl font-bold text-gray-800'>{dashData.totalUsers}</p>
                <p className='text-gray-500 font-medium'>Total Patients</p>
              </div>
            </div>
            <div className="text-purple-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid cols-1 lg:grid-cols-2 gap-8">
        {/* Latest Appointments */}
        <div className='bg-white rounded-xl shadow-lg border border-gray-100'>
          <div className='flex items-center justify-between p-6 border-b border-gray-100'>
            <div className="flex items-center gap-3">
              <img src={assets.list_icon} alt="" className="w-6 h-6" />
              <h2 className='text-xl font-semibold text-gray-800'>Latest Appointments</h2>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
              {dashData.latestappointments?.length || 0} recent
            </span>
          </div>

          <div className='divide-y divide-gray-100'>
            {dashData.latestappointments && dashData.latestappointments.length > 0 ? (
              dashData.latestappointments.map((item, index) => (
                <div className='p-6 hover:bg-gray-50 transition-colors' key={index}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <img 
                        className='w-12 h-12 rounded-full object-cover border-2 border-gray-200' 
                        src={item.docData?.image} 
                        alt="item.docData?.name"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/48x48?text=Dr';
                        }}
                      />
                      <div className='flex-1'>
                        <div className="flex items-center gap-2 mb-1">
                          {console.log(item.docData)}
                          <p className='font-semibold text-gray-800'>Dr. {item.docData?.name}</p>
                          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-xs font-medium">
                            {item.docData?.speciality}
                            {console.log(item.docData?.name)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {item.userData?.name}
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {slotDateFormat(item.slotDate)}
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {item.slotTime}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(item)}
                      {/* {!item.cancelled && !item.isCompleted && (
                        <button 
                          onClick={() => cancelAppointment(item._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          title="Cancel Appointment"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )} */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No recent appointments</h3>
                <p className="text-gray-500">Recent appointments will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Patients */}
        <div className='bg-white rounded-xl shadow-lg border border-gray-100'>
          <div className='flex items-center justify-between p-6 border-b border-gray-100'>
            <div className="flex items-center gap-3">
              <img src={assets.patients_icon} alt="" className="w-6 h-6" />
              <h2 className='text-xl font-semibold text-gray-800'>Recent Patients</h2>
            </div>
            <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium">
              {dashData.recentPatients?.length || 0} new
            </span>
          </div>

          <div className='divide-y divide-gray-100'>
            {dashData.recentPatients && dashData.recentPatients.length > 0 ? (
              dashData.recentPatients.map((patient, index) => (
                <div className='p-6 hover:bg-gray-50 transition-colors' key={index}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img 
                        className='w-12 h-12 rounded-full object-cover border-2 border-gray-200' 
                        src={patient.image || assets.user_icon} 
                        alt={patient.name}
                        onError={(e) => {
                          e.target.src = assets.user_icon;
                        }}
                      />
                      <div>
                        <p className='font-semibold text-gray-800'>{patient.name}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {patient.email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Registered</p>
                      <p className="text-sm font-medium text-gray-800">
                        {patient.joinDate ? formatDate(patient.joinDate) : 'Recently'}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No recent patients</h3>
                <p className="text-gray-500">New patient registrations will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Dashboard;