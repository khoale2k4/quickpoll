import React from "react";
import {
  FaChartPie,
  FaWallet,
  FaCalendarAlt,
  FaUser,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-600 text-white min-h-screen p-6">
      <h2 className="text-3xl font-bold mb-6">Board.</h2>

      <ul className="space-y-6 text-lg">
        <li className="flex items-center space-x-3 hover:text-gray-200 cursor-pointer ">
          <FaChartPie />
          <span>Dashboard</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-gray-200 cursor-pointer">
          <FaWallet />
          <span>Transactions</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-gray-200 cursor-pointer">
          <FaCalendarAlt />
          <span>Schedules</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-gray-200 cursor-pointer">
          <FaUser />
          <span>Users</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-gray-200 cursor-pointer">
          <FaCog />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
