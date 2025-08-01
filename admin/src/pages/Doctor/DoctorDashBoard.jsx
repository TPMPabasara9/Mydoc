import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets_admin/assets';
import { AppContext }  from '../../context/AppContext';

const DoctorDashBoard = () => {
  const {dToken, dashData, getDashData, cancelAppointment} = useContext(DoctorContext);
  const {slotDateFormat,currencySymbol} = useContext(AppContext);
  const [loading, setLoading] = useState(true);


useEffect(() => {
    const fetchDashData = async () => {
      setLoading(true);
      try {
        if(dToken) {
          await getDashData();
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashData();
  },[dToken]);


  return (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
              <div className='flex items-center gap-2 bg-white p-4 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                <img className='w-14' src={assets.earning_icon} alt="Earnings icon" />
                <div>
                  <p className='text-xl font-semibold text-gray-600'>{currencySymbol} {dashData?.earnings || 0}</p>
                  <p className='text-gray-400'>Earnings</p>
                </div>
              </div>
      
              <div className='flex items-center gap-2 bg-white p-4 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                <img className='w-14' src={assets.appointment_icon} alt="Appointments icon" />
                <div>
                  <p className='text-xl font-semibold text-gray-600'>{dashData?.appointments || 0}</p>
                  <p className='text-gray-400'>Appointments</p>
                </div>
              </div>
      
              <div className='flex items-center gap-2 bg-white p-4 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                <img className='w-14' src={assets.patients_icon} alt="Patients icon" />
                <div>
                  <p className='text-xl font-semibold text-gray-600'>{dashData?.patients || 0}</p>
                  <p className='text-gray-400'>Patients</p>
                </div>
              </div>
      
            </div>
      
            <div className='bg-white rounded-xl shadow-lg mt-10'>
              <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
                <div className='flex items-center gap-3'>
                  <img src={assets.list_icon} alt="" className="w-6 h-6" />
                  <h2 className='text-lg font-semibold text-gray-800'>Latest Bookings</h2>
                </div>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                  {dashData?.latestAppointment?.length || 0} appointments
                </span>
              </div>
      
              <div className='p-4'>
                {loading ? (
                  <div className="flex justify-center items-center p-8">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm text-gray-500">Loading appointments...</p>
                    </div>
                  </div>
                ) : !dashData?.latestAppointment?.length ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No appointments yet</h3>
                    <p className="mt-2 text-sm text-gray-500">Your recent appointments will appear here.</p>
                  </div>
                ) : (
                  dashData.latestAppointment.map((item,index)=>(
                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100 mb-3' 
                         key={item._id || index}>
                      <div className="flex items-center gap-4 flex-1">
                        <div className="relative">
                          <img 
                            className='rounded-full w-12 h-12 object-cover border-2 border-white shadow-lg' 
                            src={item.userData?.image} 
                            alt={`${item.userData?.name}'s profile`} 
                          />
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            item.isCompleted ? 'bg-green-500' : 
                            item.cancelled ? 'bg-red-500' : 'bg-yellow-500'
                          }`}></div>
                        </div>
                        
                        <div className='flex-1'>
                          <div className="flex items-center gap-2">
                            <h3 className='text-gray-800 font-medium'>{item.userData?.name}</h3>
                            {item.payment && (
                              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                                Paid
                              </span>
                            )}
                          </div>
                          <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {slotDateFormat(item.slotDate)}
                            </div>
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {item.slotTime}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 ml-16 sm:ml-0">
                        <div className="text-right">
                          <span className="block text-sm font-medium text-gray-900">
                            {currencySymbol} {item.ammount}
                          </span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.isCompleted 
                            ? 'bg-green-100 text-green-600' 
                            : item.cancelled 
                            ? 'bg-red-100 text-red-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {item.isCompleted 
                            ? 'Completed'
                            : item.cancelled
                            ? 'Cancelled'
                            : 'Pending'
                          }
                        </span>
                      </div>
                    </div>
                  ))
                )}
      
              </div>
            </div>
      

    </div>
  )
}

export default DoctorDashBoard