import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import apiClient from "../services/api-config.js"

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate()


  const handleRegister = async (e) => {
    e.preventDefault();
    try{
      const response = await apiClient.post(
        "users/register", 
        {name,email,password}
      );
      if(response.status==='ok'){
        alert("Signup successful. Please login again to continue.");
        Navigate("/login");
      }
  
    }catch(e){
      if(e.response.status===409) alert("User already exists");
      else console.log(`Error :${e}`)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-teal-200">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition transform hover:-translate-y-1"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login">
          <span className="text-teal-600 font-medium cursor-pointer hover:underline">
            Login
          </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
