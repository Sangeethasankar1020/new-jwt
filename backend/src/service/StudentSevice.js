import StudentModel from '../models/StudentModel.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const createStudent = async ({ name, email, password }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const student = await StudentModel.create({ name, email, password: hashedPassword });
        return student;
    } catch (error) {
        throw error;
    }
};
const findStudentByEmail = async (email) => {
    try {
        const student = await StudentModel.findOne({ email });
        return student;
    } catch (error) {
        throw error;
    }
};
export { createStudent ,findStudentByEmail};
