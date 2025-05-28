import validator from "validator"
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import JWT from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"




//API to register the user

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body

        if (!name || !password || !email) {
            return res.json({ success: false, message: "Missing Details" })
        }

        //validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" })
        }

        //validatig a strong password
        if (password.length < 8) {
            return res.json({ success: "false", message: "Enter a strong password" })
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Email already registered" });
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })



    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })

    }
}
//API for use login 
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//API to get user data

const getProfile = async (req, res) => {
    try {

        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}

//Update the user profile

const updateProfile = async (req, res) => {
    try {

        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender || !address) {
            return res.json({ success: false, message: "data missing" })

        }
        console.log("updating user", userId)

        await userModel.findByIdAndUpdate(userId, { name, phone, dob, address: JSON.parse(address), gender })


       
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{ resource_type: 'image' })
            const imageUrl = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, { image: imageUrl })
        }

        res.json({ success: true, message: "Profile is updated" })


    } catch (error) {
        console.error("Update profile error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

//API to book the appointment

const bookAppointment = async (req,res) =>{
    try {

        const {userId,docId,slotDate,slotTime} =req.body;
       
        const docData = await doctorModel.findById(docId).select('-password');
        
       

        if(!docData.available){
            return res.json({success:false,message:"Doctor not available"});

        }

        let slots_booked = docData.slots_booked;

        //checking for  slots availability
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                 return res.json({success:false,message:"Slots not available"});
            }else{
                slots_booked[slotDate].push(slotTime)
            }
            
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password');

        delete docData.slots_booked

    const appointmentData = {
        userId,
        docId,
        userData,
        docData,
        ammount:docData.fee,
        slotTime,
        slotDate,
        date:Date.now()
    }


    const newAppointment  = new appointmentModel(appointmentData)
    await newAppointment.save()
        

    //save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId,{slots_booked})

    res.json({success:true,message:'Appointment booked'})

    } catch (error) {
        
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//Api to get user appointments //

const listAppointment = async  (req, res) => {
    try {

        const {userId} = req.body;
        const appointments = await appointmentModel.find({userId})

        res.json({success : true,appointments})
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}




export { registerUser, loginUser, getProfile, updateProfile,bookAppointment,listAppointment }