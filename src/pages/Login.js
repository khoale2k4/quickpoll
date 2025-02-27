import React from "react";
import { Link } from "react-router-dom";

import { LuLeaf } from "react-icons/lu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="relative w-1/2 bg-green-200 flex flex-col justify-center items-center text-white">
        {/* Diagonal Shape */}
        <div className="absolute inset-0 bg-green-200 transform -skew-x-12 origin-bottom-left"></div>

        {/* Logo (Top Left) */}
        <div className="absolute flex top-6 left-6 z-10 h-20 w-full items-center space-x-4">
          <a
            href="https://hcmut.edu.vn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/HCMUT_logo.png"
              alt="HCMUT Logo"
              className="h-16 object-contain"
            />
          </a>
          <LuLeaf className="w-12 h-12 text-green-500 " />
        </div>

        {/* Brand Name */}
        <div className="text-center z-10">
          <div className="text-3xl font-bold text-green-900">
            YOLO FARM - SMART GARDEN
          </div>
          <div className="text-sm text-green-700">
            A combine of agriculture with technologies
          </div>
        </div>

        {/* Reference */}
        <div className="absolute bottom-5 flex space-x-6 z-10">
          <a
            href="https://github.com/khoale2k4/da_cnpm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-900 text-3xl"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>

      {/* Right Side (Login Form) */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="w-96">
          <h2 className="text-2xl font-semibold text-gray-800">Sign in</h2>
          <p className="text-gray-500 mb-4">Sign in to your account</p>

          {/* Login Form */}
          <div className="bg-white shadow-md rounded-lg p-6 ">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
            />

            <label className="block text-gray-700 mt-3">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
            />

            {/* Fixed: Forgot Password Link */}
            <div className="text-right text-sm mt-2">
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button className="w-full bg-green-700 text-white p-2 mt-4 rounded-md hover:bg-green-900">
              Sign In
            </button>
          </div>

          {/* Fixed: Register Link */}
          <div className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
