import React, { useState } from "react";
import { Link } from "react-router-dom";
import  useUser  from "../context/useUser.jsx";

import axios from "axios"
import Loading from "../components/Loading";
import apiClient from "../services/api-config.js"
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user,login,logout} = useUser();
  const Navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const response = await apiClient.post(
        "users/login",
        {email,password}
      );
      if(response.status===200){
        const { user:person, token:token} = response.data;
        sessionStorage.setItem("token", token);
        login(person._id,person.email,person.name)
        alert("Successful")
          
        Navigate("/")
      }
    }catch(e){
      if(e.response.status===404) alert("User not found");
      else if(e.response.status===401) alert("Incorrect password");
      else console.log(`Error :${e}`)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-teal-200">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
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
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <Link to="/register">
          <span className="text-teal-600 font-medium cursor-pointer hover:underline">
            Sign Up
          </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
