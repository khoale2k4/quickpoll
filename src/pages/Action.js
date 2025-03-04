import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import { FaCalendarAlt, FaUser, FaTv } from "react-icons/fa";
import { FaTint, FaLightbulb, FaUmbrella  } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Action = () => {

    const [actions] = useState([
        {
          id: 1,
          mode: "schedule", // calendar icon
          action: "irrigation", // water drop icon
          time: "2025-05-02 11:53",
          description: "Watering according to schedule for 5s",
        },
        {
          id: 2,
          mode: "manual", // user icon
          action: "open sunshade", // umbrella icon
          time: "2025-05-02 12:10",
          description: "Sunshade opened manually",
        },
        {
          id: 3,
          mode: "automatic", // tivi icon
          action: "turn on light", // bulb icon
          time: "2025-05-02 12:30",
          description: "Light turned on automatically",
        },
    ]);

    const getModeIcon = (mode) => {
        switch (mode) {
          case "schedule":
            return <FaCalendarAlt className="text-blue-500 text-3xl" />;
          case "manual":
            return <FaUser className="text-green-500 text-3xl" />;
          case "automatic":
            return <FaTv className="text-purple-500 text-3xl" />;
          default:
            return null;
        }
    };

    const getActionIcon = (action) => {
        switch (action) {
          case "irrigation":
            return <FaTint className="text-blue-700 text-3xl" />;
          case "turn on light":
            return <FaLightbulb className="text-yellow-500 text-3xl" />;
          case "open sunshade":
            return <FaUmbrella  className="text-orange-500 text-3xl" />;
          default:
            return null;
        }
    };

    const navigate = useNavigate();

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
                    <FaArrowLeft className="text-xl" onClick={handleIconClick}/>
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
                    {getActionIcon(action.action)}
                    </div>

                    {/* Time and description */}
                    <div>
                    <p className="text-lg font-medium">{action.description}</p>
                    <p className="text-sm text-gray-500">{action.time}</p>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default Action;
