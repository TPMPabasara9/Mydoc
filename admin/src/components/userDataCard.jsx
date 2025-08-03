//card pop when clicked in the appointment list's view user data
import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import { assets } from '../assets/assets_admin/assets.js';

const UserDataCard = ({ userData, onClose }) => {
    const { slotDateFormat, currencySymbol } = useContext(AppContext);
  
    if (!userData) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Blurred Background */}
            <div
                className="absolute inset-0 bg-gray-100 bg-opacity-30 backdrop-blur-sm transition-all"
                onClick={onClose}
            />
            <div className="relative z-10 bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Patient Details</h2>
                    <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full"></div>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <img 
                        src={userData.image || assets.user_icon} 
                        alt="User Avatar" 
                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                        onError={(e) => {
                            e.target.src = assets.user_icon;
                        }}
                    />
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">{userData.name}</h3>
                        <p className="text-gray-500">{userData.email}</p>
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium text-gray-800">{userData.phone || 'Not provided'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="font-medium text-gray-800">{userData.address?.line1 || userData.address || 'Not provided'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                            <p className="text-sm text-gray-500">Date of Birth</p>
                            <p className="font-medium text-gray-800">
                                {userData.dob ? slotDateFormat(userData.dob) : 'Not provided'}
                            </p>
                        </div>
                    </div>

                    {userData.gender && (
                        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <div>
                                <p className="text-sm text-gray-500">Gender</p>
                                <p className="font-medium text-gray-800">{userData.gender}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <button 
                        onClick={onClose}
                        className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDataCard;


