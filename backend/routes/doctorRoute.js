import express from 'express'
import { appointmentCancel, appointmentComplete, doctorDashbnoard, doctorProfile, getAppointments,loginDoctor} from '../controllers/doctorController.js';
import authDoctor from '../middleware/authDoctor.js';
// import authDoctor from '../middleware/authDoctor.js';

const doctorRouter = express.Router()


doctorRouter.post('/login',loginDoctor);
doctorRouter.get('/doctor-appointments',authDoctor,getAppointments);
doctorRouter.get('/doctor-profile',authDoctor,doctorProfile); // Assuming this is for getting doctor's profile, adjust as needed
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete);
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel); // Assuming this is for completing an appointment, adjust as needed
doctorRouter.get('/dashboard',authDoctor,doctorDashbnoard);
export default doctorRouter;