import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import doctorRoutes from './routes/doctor.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser';


const port = 5000;

const app = express();
dotenv.config();

app.use(express.json())
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('doctors'));
app.use(fileUpload());
app.use(cookieParser())

mongoose.connection.on("disconnected", () =>{
    console.log("Disconnected")
})
const connect = async () =>{
    try{
        mongoose.connect(process.env.MONGO)
        console.log("Conntected to Mongodb")
    }catch(err){
        console.log(err)
    }
}
app.use('/', doctorRoutes)
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
    res.send("hello it/s running")
})

app.use((err, req, res, next) =>{
    const errorStatus = err.status || 500;
    const msg = err.message || "Something Went Wrong";
    return res.status(errorStatus).json({
        success: false,
        message: msg,
        status: errorStatus,
        stack : err.stack,
    })
})
app.listen(process.env.PORT || port , ()=>{connect(); console.log("Started")})