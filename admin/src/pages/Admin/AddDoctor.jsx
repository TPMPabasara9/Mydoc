import React from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { useState } from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [Speciality, setSpeciality] = useState('General Physician')
  const [loading, setLoading] = useState(false)

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmithandler = async (event) => {
    event.preventDefault()
    setLoading(true)
    
    try {
      if (!docImg) {
        toast.error("Please select a doctor image")
        setLoading(false)
        return
      }
      
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name)
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fee', Number(fees));
      formData.append('about', about);
      formData.append('speciality', Speciality)
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, { headers: { aToken } })
      
      if (data.success) {
        // Reset form
        setDocImg(null);
        setName('');
        setEmail('');
        setPassword('');
        setAbout('');
        setAddress1('');
        setAddress2('');
        setDegree('');
        setExperience('1 Year');
        setFees('');
        setSpeciality('General Physician');

        toast.success(data.message)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const specialities = [
    'General Physician',
    'Neurologist',
    'Gynecologist',
    'Gastroenterologist',
    'Pediatrician',
    'Dermatologist',
    'Cardiologist',
    'Orthopedic',
    'Psychiatrist',
    'Ophthalmologist'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Add New Doctor
          </h1>
          <p className="text-lg text-gray-600">
            Fill in the details below to add a new doctor to the system
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <form onSubmit={onSubmithandler} className="p-8">
            {/* Profile Image Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                Profile Picture
              </h2>
              
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-200 hover:border-indigo-300 transition-colors">
                <label htmlFor="doc-img" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <div className="relative group">
                      <img 
                        className='w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg transition-all duration-300 group-hover:scale-105' 
                        src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
                        alt="Doctor" 
                      />
                      <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600 text-center">
                      Click to upload doctor's profile picture
                      <br />
                      <span className="text-xs text-gray-400">PNG, JPG up to 10MB</span>
                    </p>
                  </div>
                </label>
                <input 
                  onChange={(e) => setDocImg(e.target.files[0])} 
                  type="file" 
                  id="doc-img" 
                  hidden 
                  accept="image/*"
                />
              </div>
            </div>

            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input 
                    onChange={(e) => setName(e.target.value)} 
                    value={name} 
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200' 
                    type="text" 
                    placeholder='Enter doctor full name' 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200' 
                    type="email" 
                    placeholder='doctor@example.com' 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200' 
                    type="password" 
                    placeholder='Create secure password' 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Education/Degree *</label>
                  <input 
                    onChange={(e) => setDegree(e.target.value)} 
                    value={degree} 
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200' 
                    type="text" 
                    placeholder='MBBS, MD, etc.' 
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                  </svg>
                </div>
                Professional Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Speciality *</label>
                  <select 
                    onChange={(e) => setSpeciality(e.target.value)} 
                    value={Speciality} 
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 bg-white' 
                    required
                  >
                    {specialities.map((spec, index) => (
                      <option key={index} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience *</label>
                  <select 
                    onChange={(e) => setExperience(e.target.value)} 
                    value={experience} 
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 bg-white' 
                    required
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i + 1} value={`${i + 1} Year${i > 0 ? 's' : ''}`}>
                        {i + 1} Year{i > 0 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee ($) *</label>
                  <input 
                    onChange={(e) => setFees(e.target.value)} 
                    value={fees} 
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200' 
                    type="number" 
                    placeholder='50' 
                    min="1"
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                Address Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1 *</label>
                  <input 
                    onChange={(e) => setAddress1(e.target.value)} 
                    value={address1} 
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200' 
                    type="text" 
                    placeholder='Street address, building number' 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                  <input 
                    onChange={(e) => setAddress2(e.target.value)} 
                    value={address2} 
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200' 
                    type="text" 
                    placeholder='City, State, ZIP code' 
                  />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                About Doctor
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Doctor's Bio *</label>
                <textarea 
                  onChange={(e) => setAbout(e.target.value)} 
                  value={about} 
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 resize-none' 
                  placeholder='Write a brief description about the doctor, their expertise, achievements, and approach to patient care...' 
                  rows={5} 
                  required 
                />
                <p className="text-sm text-gray-500 mt-2">
                  {about.length}/500 characters
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button 
                type="submit" 
                disabled={loading}
                className={`flex-1 flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Adding Doctor...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Doctor to System
                  </>
                )}
              </button>
              
              <button 
                type="button" 
                onClick={() => {
                  setDocImg(null);
                  setName('');
                  setEmail('');
                  setPassword('');
                  setAbout('');
                  setAddress1('');
                  setAddress2('');
                  setDegree('');
                  setExperience('1 Year');
                  setFees('');
                  setSpeciality('General Physician');
                }}
                className="flex-1 sm:flex-none px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-200"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;