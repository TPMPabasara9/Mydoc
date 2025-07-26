import React from 'react';

const About = () => {
  // Mock assets for demonstration
  const assets = {
    about_image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  };

  const features = [
    {
      title: "Efficiency",
      description: "Streamlined appointment scheduling that fits into your busy lifestyle.",
      icon: "⚡",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      title: "Convenience",
      description: "Access to a network of trusted healthcare professionals in your area.",
      icon: "🏥",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "Personalization",
      description: "Tailored recommendations and reminders to help you stay on top of your health.",
      icon: "👤",
      gradient: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6">
              About <span className="text-indigo-600">Us</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image Section */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <img 
              className="relative w-full h-96 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition duration-500" 
              src={assets.about_image} 
              alt="Healthcare professionals" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
                <p className="text-lg mb-4">
                  Welcome to <span className="font-bold text-indigo-600">MediBook</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. At MediBook, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
                <p className="text-lg mb-4">
                  MediBook is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service.
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-8 rounded-2xl shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="mr-3">🎯</span>
                  Our Vision
                </h3>
                <p className="text-lg opacity-95">
                  Our vision at MediBook is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Why <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Choose Us</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-white mb-4 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-12 shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Healthcare Experience?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users who have made healthcare management simple and efficient with MediBook.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;