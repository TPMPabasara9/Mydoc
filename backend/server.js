import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongoDB.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
// import './routes/paymentRoute.js';




const app = express();
const port = process.env.PORT || 9000;
connectDB();
connectCloudinary();
//middleware
app.use(express.json());
app.use(cors());

//api endpoints
app.use('/api/admin',adminRouter);
app.use('/api/doctor',doctorRouter);
app.use('/api/user',userRouter);
// app.use('api/payment',paymentRouter);



app.get('/',(req,res)=>{
    res.send('API working');
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})