import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaUser,
  FaTv,
  FaTint,
  FaLightbulb,
  FaUmbrella,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Action = () => {

  const [actions, setActions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/activitylogs/farm/1")
      .then((res) => res.json())
      .then((data) => setActions(data))
      .catch((err) => console.error("Failed to fetch actions:", err));
  }, []);

  const getModeIcon = (mode) => {
    switch (mode.toLowerCase()) {
      case "scheduled":
        return <FaCalendarAlt className="text-blue-500 text-3xl" />;
      case "manual":
        return <FaUser className="text-green-500 text-3xl" />;
      case "automated":
        return <FaTv className="text-purple-500 text-3xl" />;
      default:
        return null;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "irrigation":
        return <FaTint className="text-blue-700 text-3xl" />;
      case "light":
        return <FaLightbulb className="text-yellow-500 text-3xl" />;
      case "moisture":
        return <FaTint className="text-blue-400 text-3xl" />;
      case "temperature":
        return <FaUmbrella className="text-orange-500 text-3xl" />;
      default:
        return null;
    }
  };

  const handleIconClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {/* Left: Back arrow + Title */}
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            {/* Replace with your own back arrow if desired */}
            <FaArrowLeft className="text-xl" onClick={handleIconClick} />
          </button>
          <h1 className="text-2xl font-semibold">Action blog</h1>
        </div>
      </div>

      <ul className="space-y-4">
        {actions.map((action) => (
          <li
            key={action.id}
            className="flex items-center p-3 border rounded-md shadow-sm"
          >
            {/* Mode icon */}
            <div className="mr-4 flex flex-col items-center">
              {getModeIcon(action.mode)}
            </div>

            {/* Action type icon */}
            <div className="mr-4 flex flex-col items-center">
              {getCategoryIcon(action.category)}
            </div>

            {/* Time and description */}
            <div>
              <p className="text-lg font-medium">{action.title}</p>
              <p className="text-sm text-gray-500">{action.logTime}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Action;
