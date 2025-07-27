import express from 'express';
import { addDoctor,adminDashboard,adminLogin, allAppointments, allDoctors } from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'), addDoctor);
adminRouter.post('/login', adminLogin);
adminRouter.get('/all-doctors',authAdmin, allDoctors);
adminRouter.post('/change-availability',authAdmin,changeAvailability);
adminRouter.get('/all-appointments', authAdmin, allAppointments);
adminRouter.get('/dashboard', authAdmin,adminDashboard );

export default adminRouter;
