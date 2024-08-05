import express from 'express';
import { registerStudent ,loginStudent,dashboard,logoutStudent} from '../controller/StudentController.js';
// import StudentModel from '../models/StudentModel.js';
import { verifyUser } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/register', registerStudent);
router.post('/login',loginStudent)
router.get('/dashboard',verifyUser, dashboard);
router.post('/logout', logoutStudent);

export default router;


