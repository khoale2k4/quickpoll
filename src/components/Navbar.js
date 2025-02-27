import React from "react";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="flex items-center space-x-4 ">
        <div className="relative ">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none shadow-sm "
          />
        </div>
        <FaBell className="text-gray-600 text-lg cursor-pointer hover:text-black" />
        <FaUserCircle className="text-gray-600 text-2xl cursor-pointer hover:text-black" />
      </div>
    </div>
  );
};

export default Navbar;
