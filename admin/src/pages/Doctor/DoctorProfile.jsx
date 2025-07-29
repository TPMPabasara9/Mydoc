import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DoctorProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { doctor, dToken, loadDoctorProfile,currencySymbol } = useContext(DoctorContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!dToken) {
          toast.error("Doctor token not found. Please login again.");
          navigate('/login'); // Redirect to login if no token
          return;
        }

        setLoading(true);
        await loadDoctorProfile();
        setLoading(false);
      } catch (err) {
        console.error('Error loading profile:', err);
        setError(err.message || 'Failed to load profile');
        setLoading(false);
        toast.error(err.message || 'Failed to load profile');
      }
    };

    fetchProfile();
  }, [dToken]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg text-center">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-medium text-red-800">Error Loading Profile</h3>
          <p className="text-red-600 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No profile data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white">
          <h1 className="text-3xl font-bold">Doctor Profile</h1>
          <p className="mt-2 opacity-90">Manage your professional information</p>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* Basic Info Section */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="relative">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
                <div className="absolute bottom-3 right-3">
                  <div className="px-3 py-1 bg-green-500 text-white text-sm rounded-full shadow-lg">
                    {doctor.available ? 'Available' : 'Unavailable'}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{doctor.name}</h2>
                <p className="text-indigo-600 font-medium">{doctor.speciality}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="text-lg font-medium">{doctor.experience}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Consultation Fee</p>
                  <p className="text-lg font-medium">{currencySymbol} {doctor.fee}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600">{doctor.email}</span>
                </div>
              </div>

              {/* About Section */}
              {doctor.about && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800">About</h3>
                  <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Qualification */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Qualification</h3>
              <p className="text-gray-600">{doctor.degree}</p>
            </div>

            {/* Address */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Practice Location</h3>
              {doctor.address && (
                <div className="space-y-2">
                  <p className="text-gray-600">{doctor.address.line1}</p>
                  <p className="text-gray-600">{doctor.address.line2}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile