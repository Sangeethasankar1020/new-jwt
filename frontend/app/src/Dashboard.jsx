import axios from "axios";
import Cookies from "js-cookie";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    console.log(document.cookie.includes("accessToken"));
  }, []);

  useEffect(() => {
    const cookieValue = Cookies.get("accessToken");
    console.log("Cookie Value:", cookieValue);
    axios
      .get("http://localhost:3000/api/dashboard")
      .then((res) => {
        if (res.data.valid) {
          setMessage(res.data.message);
          setUsers(res.data.users || []); // Ensure users is an array
        } else {
          navigate("/");
        }
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false); // Stop loading
        console.error("Error fetching data:", err);
        navigate("/");
      });
  }, [navigate]);

  const handleLogout = () => {
    axios
      .post("http://localhost:3000/api/logout")
      .then((res) => {
        if (res.data.logout) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <p>Loading...</p>; // Display loading state
  }

  if (error) {
    return <p>{error}</p>; // Display error message
  }

  return (
    <div>
      <h2>Dashboard {message}</h2>
      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
