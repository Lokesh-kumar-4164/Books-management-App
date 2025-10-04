import React from "react";
import { Link } from "react-router-dom";
import useUser from "../context/useUser";
function Navbar() {
  const { user , login,logout } = useUser();
  return (
    <header className="bg-gradient-to-r from-teal-600 to-cyan-800  text-white p-6 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold tracking-wide">Book Management App</h1>
      <nav className="space-x-6 text-lg font-medium">
        <Link to="/">
        <span className="cursor-pointer hover:text-gray-200 transition">
          Home
        </span>
        </Link>
        
        {user ? (
          <span className="cursor-pointer hover:text-gray-200 transition">
            {}
          </span>
        ) : (<Link to="/login">
          <span className="cursor-pointer hover:text-gray-200 transition">
            Login
          </span>
        </Link>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
