import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:3000/api/dashboard")
            .then(res => {
                if (res.data.valid) {
                    setMessage(res.data.message);
                } else {
                    navigate("/api/login");
                }
            })
            .catch(err => console.log(err));
    }, [navigate]);

    const handleLogout = () => {
        axios.post("http://localhost:3000/api/logout")
            .then(res => {
                if (res.data.logout) {
                    navigate("/api/login");
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h2>Dashboard {message}</h2>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
    );
};

export default Dashboard;