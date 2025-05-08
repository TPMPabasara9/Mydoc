import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongoDB.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';


const app = express();
const port = process.env.PORT || 9000;
connectDB();
connectCloudinary();
//middleware
app.use(express.json());
app.use(cors(
    {
        origin:'http://localhost:5174',
        credentials:true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'aToken']
    }
));

//api endpoints
app.use('/api/admin',adminRouter);



app.get('/',(req,res)=>{
    res.send('API working');
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})