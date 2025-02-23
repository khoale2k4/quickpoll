import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter, faLinkedin, faDiscord } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="relative w-1/2 bg-blue-600 flex flex-col justify-center items-center text-white">
        {/* Diagonal Shape */}
        <div className="absolute inset-0 bg-blue-600 transform -skew-x-12 origin-bottom-left"></div>

        {/* Logo (Top Left) */}
        <img
          src="/logo1.png"
          alt="BASE Logo"
          className="absolute top-6 left-6 w-12 h-12 z-10"
        />

        {/* Brand Name */}
        <div className="text-5xl font-bold z-10">BASE</div>

        {/* Social Media Icons */}
        <div className="absolute bottom-5 flex space-x-6 z-10">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
            <FontAwesomeIcon icon={faDiscord} />
          </a>
        </div>
      </div>

      {/* Right Side (Login Form) */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="w-96">
          <h2 className="text-2xl font-semibold text-gray-800">Sign In</h2>
          <p className="text-gray-500 mb-4">Sign in to your account</p>

          {/* OAuth Buttons */}
          <div className="flex space-x-3 mb-4">
            <button className="w-1/2 flex justify-center items-center border p-2 rounded-md">
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
                className="mr-2"
              />
              Sign in with Google
            </button>
            <button className="w-1/2 flex justify-center items-center border p-2 rounded-md">
              <img
                src="https://img.icons8.com/ios-filled/16/000000/mac-os.png"
                alt="Apple"
                className="mr-2"
              />
              Sign in with Apple
            </button>
          </div>

          {/* Login Form */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <label className="block text-gray-700">Email address</label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-gray-700 mt-3">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Fixed: Forgot Password Link */}
            <div className="text-right text-sm mt-2">
              <Link to="/forgot-password" className="text-blue-500 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button className="w-full bg-blue-600 text-white p-2 mt-4 rounded-md hover:bg-blue-700">
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
