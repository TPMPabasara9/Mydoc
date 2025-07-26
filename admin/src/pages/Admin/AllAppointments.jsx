import { useContext, useEffect } from "react"; 
import { AdminContext } from "../../context/AdminContext"; 
 
const AllAppointments = () => { 
  const { appointments = [], aToken, getAllAppointments } = useContext(AdminContext); 
 
  useEffect(() => { 
    if (aToken) { 
      console.log("🔑 Token available, fetching appointments...");
      getAllAppointments(); 
    } else {
      console.log("❌ No token available");
    }
  }, [aToken]); // Added getAllAppointments to dependencies
 



  return ( 
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> 
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-2"> 
        All Appointments 
      </h1> 
      <p className="text-gray-600 mb-4"> 
        Here you can view and manage all your appointments with doctors. 
      </p> 
      <div className="bg-white rounded-lg shadow-md p-6"> 
        <table className="min-w-full divide-y divide-gray-200"> 
          <thead> 
            <tr> 
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 
                Patient ID 
              </th> 
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
               Patient Name
               </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 
                Date 
              </th> 
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 
                Time 
              </th> 
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 
                Amount 
              </th> 
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 
                Doctor Name 
              </th> 
            </tr> 
          </thead> 
          <tbody className="bg-white divide-y divide-gray-200"> 
            {appointments && appointments.length > 0 ? ( 
              appointments.map((appointment, index) => ( 
                <tr key={appointment._id || index}> 
                  <td className="px-6 py-4 whitespace-nowrap"> 
                    {appointment.userId} 
                  </td> 
                  <td className="px-6 py-4 whitespace-nowrap">
                     {appointment.userData?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"> 
                    {appointment.slotDate} 
                  </td> 
                  <td className="px-6 py-4 whitespace-nowrap"> 
                    {appointment.slotTime} 
                  </td> 
                  <td className="px-6 py-4 whitespace-nowrap"> 
                    ${appointment.amount} 
                  </td> 
                  <td className="px-6 py-4 whitespace-nowrap"> 
                    {appointment.docData?.name || 'N/A'}
                  </td> 
                </tr> 
              )) 
            ) : ( 
              <tr> 
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500"> 
                  {appointments === undefined ? "Loading appointments..." : "No appointments found"} 
                </td> 
              </tr> 
            )} 
          </tbody> 
        </table> 
      </div> 
    </div> 
  ); 
}; 
 
export default AllAppointments;