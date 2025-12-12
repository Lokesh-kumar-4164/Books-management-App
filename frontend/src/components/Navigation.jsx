import React from "react";
import { Link } from "react-router-dom";
import useUser from "../context/useUser";

function Navbar() {
  const { user, login, logout } = useUser();

  return (
    <header className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-3xl font-extrabold tracking-wide drop-shadow-sm">
          BookNook
        </h1>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-lg font-medium">
          <Link to="/">
            <span className="cursor-pointer hover:text-teal-200 transition-colors duration-200">
              Home
            </span>
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              {/* User label only UI — no functional logic changed */}
              <span className="opacity-90 text-sm bg-white/20 px-3 py-1 rounded-full">
                {user.name || "User"}
              </span>

              <button
                className="px-4 py-2 rounded-lg bg-white text-teal-700 font-semibold 
                hover:bg-teal-100 transition duration-200 shadow-sm"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <span
                className="px-4 py-2 rounded-lg bg-white text-teal-700 font-semibold 
                hover:bg-teal-100 transition duration-200 shadow-sm cursor-pointer"
              >
                Login
              </span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
