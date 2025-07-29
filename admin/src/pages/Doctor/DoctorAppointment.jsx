import React, { useState, useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets_admin/assets';


const DoctorAppointment = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { dToken, getAppointments, appointments,completeAppointment,cancelAppointment } = useContext(DoctorContext);
    const { calculateAge ,slotDateFormat} = useContext(AppContext);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                if (!dToken) {
                    toast.error("Authentication token not found. Please login again.");
                    return;
                }

                await getAppointments();
              
                
            } catch (error) {
                console.error("Error fetching appointments:", error);
                setError(error.message || "Failed to fetch appointments");
                toast.error(error.message || "Failed to fetch appointments");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [dToken]);
    console.log(appointments);

  return (
    <div className='w-full max-w-6xl mx-auto px-4 py-8'>
        <div className="flex justify-between items-center mb-6">
            <h1 className='text-2xl font-bold text-gray-800'>Appointments</h1>
            <div className="flex gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Total: {appointments?.length || 0}
                </span>
            </div>
        </div>

        {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600">Loading appointments...</p>
                </div>
            </div>
        ) : error ? (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="text-red-500 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-gray-600">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        ) : appointments?.length === 0 ? (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <p className="text-gray-600">No appointments found</p>
                </div>
            </div>
        ) : (
            <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-4 px-6 bg-gray-50 border-b'>
                    <p className="text-sm font-medium text-gray-600">#</p>
                    <p className="text-sm font-medium text-gray-600">Patient</p>
                    <p className="text-sm font-medium text-gray-600">Payment</p>
                    <p className="text-sm font-medium text-gray-600">Age</p>
                    <p className="text-sm font-medium text-gray-600">Date and Time</p>
                    <p className="text-sm font-medium text-gray-600">Fee</p>
                    <p className="text-sm font-medium text-gray-600">Action</p>
                </div>
                <div className="divide-y hover:bg-gray-50">
                    {appointments.map((item, index) => (
                        <div key={index} className="grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-4 px-6 items-center hover:bg-gray-50">
                            <p className="text-gray-600">{index + 1}</p>
                            <div className="flex items-center gap-3">
                                <img 
                                    src={item.userData?.image} 
                                    alt={item.userData?.name} 
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <p className="font-medium text-gray-800">{item.userData?.name}</p>
                            </div>
                            <div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    item.payment ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {item.payment ? 'Online' : 'Cash'}
                                </span>
                            </div>
                            <p className="text-gray-600">{calculateAge(item.userData?.dob)}</p>
                            <p className="text-gray-600">
                                {slotDateFormat(item.slotDate)} {item.slotTime}
                            </p>
                            <p className="text-gray-800 font-medium">LKR {item.ammount}</p>
                            {
                                item.cancelled ? (
                                    <p className="text-red-500">Cancelled</p>
                                ) : item.isCompleted ? (
                                    <p className="text-green-500">Completed</p>
                                ) : (
                                    <div className='flex gap-2'>
                                        <img 
                                            className='w-8 h-8 cursor-pointer hover:opacity-75' 
                                            src={assets.cancel_icon} 
                                            alt="Cancel appointment" 
                                            onClick={() => cancelAppointment(item._id)} 
                                        />
                                        <img 
                                            className='w-8 h-8 cursor-pointer hover:opacity-75' 
                                            src={assets.tick_icon} 
                                            alt="Complete appointment"  
                                            onClick={() => completeAppointment(item._id)}
                                        />
                                    </div>
                                )}
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}

export default DoctorAppointment