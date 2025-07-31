import React, { useState, useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Clock, User, CalendarDays, List, Grid, ChevronLeft, ChevronRight } from 'lucide-react';

const DoctorAppointment = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateAppointments, setSelectedDateAppointments] = useState([]);
  
  const { dToken, getAppointments, appointments } = useContext(DoctorContext);
  const { slotDateFormat, currencySymbol } = useContext(AppContext);
  const [groupedAppointments, setGroupedAppointments] = useState({});

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

  useEffect(() => {
    const groupByDate = () => {
      const grouped = {};
      appointments.forEach((item) => {
        const date = slotDateFormat(item.slotDate);
        if (date) {
          if (!grouped[date]) {
            grouped[date] = [];
          }
          grouped[date].push(item);
        }
      });
      setGroupedAppointments(grouped);
   
    };
    if (appointments && appointments.length > 0) {
      groupByDate();
    }
  }, [appointments]);

function formatDateToCustom(date) {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
}
  
  useEffect(() => {
    console.log("groupedAppointments:", groupedAppointments);
    console.log("format chang", formatDateToCustom(selectedDate));
    const dateString = formatDateToCustom(selectedDate);
   
    setSelectedDateAppointments(groupedAppointments[dateString] || []);
    console.log("grouped appointments for selected date:", groupedAppointments[dateString]);
   
  }, [selectedDate, groupedAppointments]);

  const tileContent = ({ date, view }) => {
    const dateString = formatDateToCustom(date);
    if (view === 'month' && groupedAppointments[dateString]) {
      const count = groupedAppointments[dateString].length;
      return (
        <div className="absolute top-0.5 t-1/2 transform -translate-x-1/2">
          <div className="text-xs text-white bg-green-300 rounded-full px-2 py-0.5 min-w-[20px] text-center">
            {count}
          </div>
        </div>
      );
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    const dateString = formatDateToCustom(date);
    if (view === 'month' && groupedAppointments[dateString]) {
      return 'has-appointments';
    }
    return null;
  };



  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const getAppointmentsByTimeSlot = () => {
    const timeSlots = {};
    Object.entries(groupedAppointments).forEach(([date, apps]) => {
      apps.forEach(app => {
        const time = app.slotTime || 'No Time';
        if (!timeSlots[time]) {
          timeSlots[time] = [];
        }
        timeSlots[time].push({ ...app, date });
      });
    });
    return timeSlots;
  };

  const getTotalAppointments = () => {
    return appointments ? appointments.length : 0;
  };

  const getTodayAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    console.log("Today:", today);
    const todayFormat = formatDateToCustom(today);
    console.log("Today Format:", todayFormat);
    return groupedAppointments[todayFormat] ? groupedAppointments[todayFormat].length : 0;
  };

  const getUpcomingAppointments = () => {
    const today = new Date().toISOString().split('T')[0];

    console.log(today)
    const todayFormat = formatDateToCustom(today);
    return appointments ? appointments.filter(app => {
      const appDate = slotDateFormat(app.slotDate);
      return appDate >= todayFormat;
    }).length : 0;
  };

  if (loading) {
    return (
      <div className='w-full max-w-6xl mx-auto px-4 py-8'>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Loading appointments...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full max-w-6xl mx-auto px-4 py-8'>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full max-w-7xl mx-auto px-4 py-8'>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Appointments Dashboard</h1>
          <p className="text-gray-600">Manage and view your scheduled appointments</p>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1 mt-4 md:mt-0">
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              viewMode === 'calendar' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <CalendarDays className="w-4 h-4 mr-2" />
            Calendar
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              viewMode === 'list' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <List className="w-4 h-4 mr-2" />
            List
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Appointments</p>
              <p className="text-3xl font-bold">{getTotalAppointments()}</p>
            </div>
            <CalendarDays className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Today's Appointments</p>
              <p className="text-3xl font-bold">{getTodayAppointments()}</p>
            </div>
            <Clock className="w-8 h-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Upcoming</p>
              <p className="text-3xl font-bold">{getUpcomingAppointments()}</p>
            </div>
            <User className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        /* Calendar View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className='bg-white rounded-xl shadow-lg p-6'>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Appointment Calendar</h2>
              <style jsx>{`
            .react-calendar {
              width: 100%;
              border: none;
              font-family: inherit;
            }
            .react-calendar__tile {
              position: relative;
              padding: 0.75em 0.5em;
              border: 1px solid #e5e7eb;
            }
            .react-calendar__tile--active {
              background: #fef3c7 !important;
              color: white;
            }
            .react-calendar__tile--now {
              background: #fef3c7;
              color: #92400e;
            }
            .react-calendar__tile.has-appointments {
              background-color: #eff6ff;
              border-color: #3b82f6;
            }
            .react-calendar__tile:hover {
              background-color: #f3f4f6;
            }
              `}</style>
              <Calendar 
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={tileContent}
            tileClassName={tileClassName}
            className='w-full'
              />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className='bg-white rounded-xl shadow-lg p-6'>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {formatDate(selectedDate)}
              </h3>
              
              {selectedDateAppointments.length > 0 ? (
            <div className="space-y-3">
              {selectedDateAppointments
                .sort((a, b) => (a.slotTime || '').localeCompare(b.slotTime || ''))
                .map((appointment, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="font-medium">{appointment.slotTime}</span>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  appointment.cancelled 
                    ? 'bg-red-100 text-red-800' 
                    : appointment.isCompleted 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {appointment.cancelled ? 'Cancelled' : appointment.isCompleted ? 'Completed' : 'Scheduled'}
                </span>
                  </div>
                  <div className="mt-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  appointment.payment 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {appointment.payment ? '💰 Payment Received' : '⚠️ Payment Pending'}
                </span>
                  </div>
                  <div className="flex items-center text-sm mt-2">
                <User className="w-4 h-4 mr-1 text-gray-400" />
                <span className="font-medium">{appointment.userData?.name || 'Patient Name'}</span>
                  </div>
                  {appointment.userData?.email && (
                <p className="text-xs text-gray-500 mt-1">{appointment.userData.email}</p>
                  )}
                </div>
              ))}
            </div>
              ) : (
            <div className="text-center py-8">
              <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No appointments scheduled</p>
            </div>
              )}
            </div>
          </div>
        </div>
          ) : (
        /* List View */
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">All Appointments</h2>
          
          {Object.keys(groupedAppointments).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(groupedAppointments)
                .sort(([a], [b]) => new Date(a) - new Date(b))
                .map(([date, dayAppointments]) => (
                <div key={date} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {formatDate(date)}
                    </h3>
                    <p className="text-sm text-gray-600">{dayAppointments.length} appointments</p>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {dayAppointments
                      .sort((a, b) => (a.slotTime || '').localeCompare(b.slotTime || ''))
                      .map((appointment, index) => (
                      <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-5 h-5 mr-2" />
                              <span className="font-medium text-lg">{appointment.slotTime}</span>
                            </div>
                            
                            <div className="flex items-center text-gray-700">
                              <User className="w-5 h-5 mr-2" />
                              <div>
                                <p className="font-medium">{appointment.userData?.name || 'Patient Name'}</p>
                                {appointment.userData?.email && (
                                  <p className="text-sm text-gray-500">{appointment.userData.email}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <span className={`px-3 py-1 text-sm rounded-full ${
                            appointment.cancelled 
                              ? 'bg-red-100 text-red-800' 
                              : appointment.isCompleted 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {appointment.cancelled ? 'Cancelled' : appointment.isCompleted ? 'Completed' : 'Scheduled'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <CalendarDays className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No appointments found</h3>
              <p className="text-gray-500">Appointments will appear here once they are scheduled.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointment;