import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    if (!slotDate || typeof slotDate !== "string") return "Invalid Date";
    const dateArray = slotDate.split('_');
    const day = dateArray[0];
    const month = months[Number(dateArray[1]) - 1];
    const year = dateArray[2];
    return `${day} ${month} ${year}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.message);
    }
  };

  const cancelAppointmnet = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error canceling appointment:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="mt-12 px-4 sm:px-8">
      <p className="pb-3 text-2xl font-semibold text-gray-800 border-b border-gray-300">
        My Appointments
      </p>
      <div className="mt-6 grid gap-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr_150px] gap-4 p-4 sm:p-6">
              <div className="flex justify-center items-center">
                <img
                  className="w-32 h-32 object-cover rounded-xl border border-gray-200"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
              </div>

              <div className="flex flex-col justify-between text-gray-700 text-sm">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{item.docData.name}</p>
                  <p className="text-indigo-600 font-medium">{item.docData.speciality}</p>
                  <p className="mt-2 font-semibold text-gray-800">Address:</p>
                  <p>{item.docData.address.line1}</p>
                  <p className="text-xs text-gray-500">{item.docData.address.line2}</p>
                </div>
                <p className="mt-3 text-sm font-medium text-gray-800">
                  <span className="text-xs text-gray-500">Date & Time: </span>
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              <div className="flex flex-col justify-end gap-2">
                {!item.cancelled && (
                  <>
                    <button
                      className="text-sm font-medium text-indigo-600 text-center py-2 border border-indigo-200 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
                    >
                      Pay Online
                    </button>
                    <button
                      onClick={() => cancelAppointmnet(item._id)}
                      className="text-sm font-medium text-red-500 text-center py-2 border border-red-200 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                    >
                      Cancel Appointment
                    </button>
                  </>
                )}
                {item.cancelled && (
                  <button className="text-sm text-red-600 text-center py-2 border border-gray-300 bg-gray-100 rounded-lg">
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
