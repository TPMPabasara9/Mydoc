import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongoDB.js';
import connectCloudinary from './config/cloudinary.js';


//app config

const app = express();
const port = process.env.PORT || 9000;
connectDB();
connectCloudinary();
//middleware
app.use(express.json());
app.use(cors());

//api endpoints
app.get('/',(req,res)=>{
    res.send('API working');
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})