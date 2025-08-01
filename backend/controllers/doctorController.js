import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";





//API for doctor login

const loginDoctor = async (req,res) => {
    try {
        const {email,password} = req.body;

        const doctor =  await doctorModel.findOne({email})
       

        if(!doctor){
            return res.status(401).json({success:false, message: 'Invalid email or password'});

        }
     

        const isMatch =  await bcrypt.compare(password, doctor.password);

        if(isMatch){
            const token = JWT.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.status(401).json({success:false,message:"Invalid email or password"});
        }

    }catch (error){
        console.log(error);
        res.json({success:false,message:"Internal server error"})
    }
}
//API to get appointments for doctor pannel

const getAppointments = async (req,res) => {
    try {
        const {docId} = req.body;
        const appointments = await appointmentModel.find({ docId: docId });

        if (!appointments) {
            return res.status(404).json({ success: false, message: "No appointments found" });
        }

        res.json({success:true,appointments});

    }catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message});
    }
}

const doctorProfile = async (req,res) => {
    try {
        const {docId} = req.body;
        const doctor = await doctorModel.findById(docId).select('-password');
        if(!doctor){
            return res.status(404).json({success:false,message:"Doctor not found"});
        }
        res.json({success:true,doctor});


    }catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

const appointmentComplete =  async (req,res) =>{
try {
    const {docId, appointmentId} =  req.body;
   

    const appointmentData = await appointmentModel.findById(appointmentId);
    if(appointmentData && appointmentData.docId === docId) {
        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true});
        return res.json({success:true, message: "Appointment completed"});
    
} else{
        return res.status(404).json({success:false, message: "Appointment not found or does not belong to this doctor"});
    }
}
    catch (error) {
     console.log(error);
        res.json({success:false,message:error.message});
}
}
//API to cancel the appointment for doctor pannel
const appointmentCancel =  async (req,res) =>{
try {
    const {docId, appointmentId} =  req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if(appointmentData && appointmentData.docId === docId) {
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true});
        return res.json({success:true, message: "Appointment cancelled"});
    
} else{
        return res.status(404).json({success:false, message: "Appointment not found or does not belong to this doctor"});
    }
}
    catch (error) {
     console.log(error);
        res.json({success:false,message:error.message});
}
}
//API to get doctor dash board for doctor pannel
const doctorDashbnoard = async (req,res) =>{
    try {
        const {docId} = req.body;

        const appointments = await appointmentModel.find({ docId: docId });

        let earnings = 0;
        appointments.map((appointment)=>{
            if(appointment.isCompleted && !appointment.cancelled){
                earnings += appointment.ammount;
            }
            
        })



        let patients = []

        appointments.map((appointment)=>{
            if(!patients.includes(appointment.userId)){
                patients.push(appointment.userId);
            }


        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointment: appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
        
    }
}
export {loginDoctor,getAppointments,doctorProfile,appointmentComplete,appointmentCancel,doctorDashbnoard};