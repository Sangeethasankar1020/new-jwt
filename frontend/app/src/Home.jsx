import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded" style={{ width: "300px" }}>
        <h2 className="text-center">Welcome</h2>
        <div className="d-flex flex-column">
          <Link to="/register" className="btn btn-primary mb-2">
            Register
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
