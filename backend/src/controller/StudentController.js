import { createStudent ,findStudentByEmail} from '../service/StudentSevice.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const registerStudent = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const student = await createStudent({ name, email, password });
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginStudent = async (req, res) => {
    const { email, password } = req.body;
    try {
        const student = await findStudentByEmail(email);
        if (student) {
            // Compare hashed password with the provided password
            const match = await bcrypt.compare(password, student.password);

            if (match) {
                // Create tokens
                const accessToken = jwt.sign({ email: student.email }, 'jwt-access-token-secret-key', { expiresIn: '1m' });
                const refreshToken = jwt.sign({ email: student.email }, 'jwt-refresh-token-secret-key', { expiresIn: '5m' });

                // Set cookies
                res.cookie('accessToken', accessToken, { maxAge: 60000, httpOnly: true, secure: true, sameSite: 'strict' });
                res.cookie('refreshToken', refreshToken, { maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict' });

                return res.json({ loginStudent: true });
            } else {
                return res.status(401).json({ loginStudent: false, message: "Incorrect password" });
            }
        } else {
            return res.status(404).json({ loginStudent: false, message: "No record found" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const dashboard = (req, res) => {
    res.json({ valid: true, message: "Authorized" });
};
const logoutStudent = (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ logout: true });
};
export { registerStudent, loginStudent, dashboard ,logoutStudent};