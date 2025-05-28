
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({

    userId: {type:String,required:true},
    docId: {type: String, required: true},
    slotTime:{type:String,required:true},
    slotDate:{type:String,required:true},
    userData:{type:Object,required:true},
    docData: {type:Object,required:true},
    ammount:{type:Number,required:true},
    date:{type:Date,required:true},
    cancelled:{type:Boolean,required:false},
    payment:{type:Boolean,default:false},
    isCompleted: {type:Boolean,default:false}

})

const appointmentModel = mongoose.models.appointment || mongoose.model('appointmnet',appointmentSchema)

export default appointmentModel;