import bcrypt from 'bcrypt';
import validator from 'validator';
import {v2 as cloudinary} from 'cloudinary';
import Doctor from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';





//Api for adding a doctor


const addDoctor = async (req, res) => { 
    try {

        const {name,email,speciality,password,degree,experience,about,address,fee} = req.body;
        const imageFile = req.file

        console.log("Hit the request");

        

        if(!imageFile) {
        return res.status(400).json({ success: false, message: "Image is required" });
    }

        //checking for all the fields
        if(!name || !email || !speciality || !password   || !degree || !experience || !about  || !address || !fee){
            return res.json({success:false,message:"Please fill all the fields"})
        }

        //validating email format 
        if(validator.isEmail(email)==false){
            return res.json({success:false,message:"Please enter a valid email"});

        }//validating a strong password format
        if(!validator.isStrongPassword(password,{minLength:8})){
            return res.json({success:false,message:"Password should be at least 8 characters long"});
        }

        //encrypt the password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

   

        //uploading the image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            folder: 'doctors',
            width: 300,
            crop: 'scale'
        });
        console.log("Upload complete");

        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            speciality,
            image:imageUrl,
            password: hashedPassword,
            degree,
            experience,
            about,
            fee,
            available:true,
            address:JSON.parse(address),
            date: Date.now(),
        }

        const newDoctor = new Doctor(doctorData);
        await newDoctor.save();

        console.log(newDoctor);

        res.json({success:true,message:"Doctor added successfully"});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Internal server error"});
        
    }
}

//API for admin login

const adminLogin = async (req, res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            res.json({success:false,message:"Please fill all the fields"});
        }

        if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token});
        }
        else{
            res.json({success:false,message:"Invalid credentials"});
        }

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Internal server error"});
    }
}
//api to get all doctors list for admin

const allDoctors = async (req,res) => {
    try {
         
        const doctors =  await doctorModel.find({}).select('-password');
        res.json({success:true,doctors})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
    
}
const allAppointments = async (req,res) =>{
    try {
        const appointments = await appointmentModel.find({});
        res.json({success:true,appointments});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }

}



export {addDoctor,adminLogin,allDoctors,allAppointments}