import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets/assets/assets_frontend/assets.js'
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
    const { userData: contextUserData, setUserData: setContextUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

    const [userData, setUserData] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateUserProfileData = async () => {
        setLoading(true);
        try {
            const formData = new FormData()

            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('address', JSON.stringify(userData.address));
            formData.append('dob', userData.dob);
            formData.append('gender', userData.gender)

            image && formData.append('image', image)

            const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData();
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (contextUserData) setUserData(contextUserData);
    }, [contextUserData])

    if (!userData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="ml-3 text-lg font-medium text-gray-700">Loading profile...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
                    <p className="text-lg text-gray-600">Manage your personal information and preferences</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Profile Header Section */}
                    <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {/* Profile Image */}
                            <div className="relative group">
                                {isEdit ? (
                                    <label htmlFor='image' className="cursor-pointer">
                                        <div className="relative">
                                            <img 
                                                className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg transition-all duration-300 group-hover:opacity-80' 
                                                src={image ? URL.createObjectURL(image) : userData.image} 
                                                alt="Profile" 
                                            />
                                            <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </div>
                                        </div>
                                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden accept="image/*" />
                                    </label>
                                ) : (
                                    <img className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg' src={userData.image} alt="Profile" />
                                )}
                            </div>

                            {/* Name and Basic Info */}
                            <div className="text-center md:text-left flex-1">
                                {isEdit ? (
                                    <input 
                                        className='bg-white/20 backdrop-blur-sm text-white text-3xl font-bold placeholder-white/70 border-0 border-b-2 border-white/30 focus:border-white focus:outline-none focus:ring-0 bg-transparent pb-2'
                                        onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                                        type='text'
                                        value={userData.name}
                                        placeholder="Your Name"
                                    />
                                ) : (
                                    <h2 className='text-3xl font-bold text-white mb-2'>{userData.name}</h2>
                                )}
                                <p className="text-indigo-100 text-lg">{userData.email}</p>
                            </div>

                            {/* Edit Button */}
                            <div className="absolute top-4 right-4">
                                {!isEdit && (
                                    <button
                                        onClick={() => setIsEdit(true)}
                                        className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content Sections */}
                    <div className="px-8 py-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Contact Information */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
                                </div>

                                <div className="space-y-4">
                                    {/* Phone */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <label className="block text-sm font-medium text-gray-600 mb-2">Phone Number</label>
                                        {isEdit ? (
                                            <input
                                                className='w-full bg-white border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
                                                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                                type='text'
                                                value={userData.phone}
                                                placeholder="Enter phone number"
                                            />
                                        ) : (
                                            <p className='text-gray-900 font-medium'>{userData.phone || 'Not provided'}</p>
                                        )}
                                    </div>

                                    {/* Address */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <label className="block text-sm font-medium text-gray-600 mb-2">Address</label>
                                        {isEdit ? (
                                            <div className="space-y-2">
                                                <input
                                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                                    onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                                    type='text'
                                                    value={userData.address.line1}
                                                    placeholder="Address Line 1"
                                                />
                                                <input
                                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                                    onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                                    type='text'
                                                    value={userData.address.line2}
                                                    placeholder="Address Line 2"
                                                />
                                                <input
                                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                                    onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, city: e.target.value } }))}
                                                    type='text'
                                                    value={userData.address.city}
                                                    placeholder="City"
                                                />
                                            </div>
                                        ) : (
                                            <div className="text-gray-900">
                                                <p>{userData.address.line1}</p>
                                                {userData.address.line2 && <p>{userData.address.line2}</p>}
                                                <p>{userData.address.city}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Personal Information */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                                </div>

                                <div className="space-y-4">
                                    {/* Gender */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <label className="block text-sm font-medium text-gray-600 mb-2">Gender</label>
                                        {isEdit ? (
                                            <select
                                                className='w-full bg-white border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
                                                onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                                value={userData.gender}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        ) : (
                                            <p className='text-gray-900 font-medium'>{userData.gender || 'Not specified'}</p>
                                        )}
                                    </div>

                                    {/* Date of Birth */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <label className="block text-sm font-medium text-gray-600 mb-2">Date of Birth</label>
                                        {isEdit ? (
                                            <input
                                                className='w-full bg-white border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
                                                onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                                type='date'
                                                value={userData.dob}
                                            />
                                        ) : (
                                            <p className='text-gray-900 font-medium'>
                                                {userData.dob ? new Date(userData.dob).toLocaleDateString('en-US', { 
                                                    year: 'numeric', 
                                                    month: 'long', 
                                                    day: 'numeric' 
                                                }) : 'Not provided'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {isEdit && (
                            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-gray-200">
                                <button
                                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                        loading 
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
                                    }`}
                                    onClick={updateUserProfileData}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Save Changes
                                        </>
                                    )}
                                </button>
                                <button
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                                    onClick={() => {
                                        setIsEdit(false);
                                        setImage(false);
                                        setUserData(contextUserData);
                                    }}
                                    disabled={loading}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;