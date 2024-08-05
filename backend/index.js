import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import studentRoutes from './src/route/StudentRoute.js';
// import { JsonWebTokenError } from 'jsonwebtoken';
import {verifyUser} from "./src/middlewares/authMiddleware.js"

const app = express();

app.use(express.json());
// to overcome cookie
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}));
app.use(cookieParser());



// Middleware for verifying user

// app.use('/api/dashboard', verifyUser);

app.use('/api', studentRoutes);

mongoose.connect('mongodb+srv://sangeethasankar474:vmy6NrAP8ql3i3eC@cluster0.paforwb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/school', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => console.error(err));