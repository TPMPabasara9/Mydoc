import React from 'react'
import Header from '../Components/Header'
import SpecialityMenu from '../Components/specialityMenu';
import TopDoctors from '../Components/TopDoctors';
import Banner from '../Components/Banner';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-indigo-600 opacity-5 pattern-dots"></div>
        <div className="container mx-auto px-4 py-8">
          <Header/>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Specialities Section */}
        <div className="my-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
              Medical Specialities
            </span>
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <SpecialityMenu/>
          </div>
        </div>

        {/* Top Doctors Section */}
        <div className="my-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
                Featured Doctors
              </span>
            </h2>
            <div className="h-1 flex-1 mx-6 bg-gradient-to-r from-indigo-500 to-transparent rounded"></div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <TopDoctors/>
          </div>
        </div>

        {/* Banner Section with new styling */}
        <div className="my-16 relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-10"></div>
          <div className="relative z-10">
            <Banner />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;

