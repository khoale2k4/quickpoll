import { Bell, BarChart, User, Settings, History  } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card.js";
import IrrigationSettingPopup from "../components/IrrigationSettingPopup.js";
import LightSettingPopup from "../components/LightSettingPopup.js";
import TemperaturePopup from "../components/TemperatureSettingPopup.js";

import { LuLeaf } from "react-icons/lu";

export default function YoloFarmDashboard() {
  const [isSettingIrrigation, setSettingIrrigation] = useState(false);
  const [isSettingTemperature, setSettingTemperature] = useState(false);
  const [isSettingLighting, setSettingLighting] = useState(false);
  const [upcomingCount, setUpcomingCount] = useState(0);
  
  const navigate = useNavigate();
  const handleIconClick = (value) => () => {
    navigate(`/${value}`);
  };

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/reminders/user/username1");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();

        const upcoming = data.filter((task) => {
          const isDone = task.isDone;
          const reminderDate = new Date(task.reminderTime);
          const now = new Date();
          return !isDone && reminderDate >= now;
        });

        setUpcomingCount(upcoming.length);
      } catch (err) {
        console.error("Error fetching reminders in Dashboard:", err);
      }
    };

    fetchReminders();
  }, []);



  return (
    <div className="p-6 max-w-lg md:max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-16 h-16 bg-green-200 flex items-center justify-center rounded-xl">
          <LuLeaf className="w-12 h-12 text-green-500 " />
        </div>
        
        <div className="text-center md:text-left ml-4">
          <h1 className="text-2xl font-bold">YOLO FARM</h1>
          <p className="text-gray-600">Hello, Group 72</p>
        </div>

        <div className="flex space-x-4 text-green-500 ml-auto">
          <History 
            className="cursor-pointer hover:text-green-700"
            onClick={handleIconClick("action")}
            />
          <div className="relative">
            <Bell
              className="cursor-pointer hover:text-green-700"
              onClick={handleIconClick("reminder")}
            />
            {upcomingCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {upcomingCount}
              </span>
            )}
          </div>
          <BarChart 
            className="cursor-pointer hover:text-green-700" 
            onClick={handleIconClick("statistics")}/>
          <User 
            className="cursor-pointer hover:text-green-700" 
            onClick={handleIconClick("profile")} 
          />      
        </div>
      </div>

      <Card
        title="Irrigation"
        value="15"
        unit="%"
        description="Keep around 10%"
        mode="AUTOMATIC"
        bgColor="bg-blue-400"
        icon="💧"
        onSettingsClick={() => setSettingIrrigation(true)}
      />
      <Card
        title="Temperature"
        value="30"
        unit="°C"
        description="Sunscreens between 08 AM - 11 AM"
        mode="SCHEDULED"
        bgColor="bg-red-400"
        icon="🌡"
        onSettingsClick={() => setSettingTemperature(true)}
      />
      <Card
        title="Lighting"
        value="600"
        unit="W/m²"
        description="Click to turn off lamps"
        mode="MANUAL"
        bgColor="bg-green-700"
        icon="☀️"
        onSettingsClick={() => setSettingLighting(true)}
      />
      {isSettingIrrigation && <IrrigationSettingPopup isOpen={isSettingIrrigation} onClose={() => setSettingIrrigation(false)} />}
      {isSettingTemperature && <TemperaturePopup isOpen={isSettingTemperature} onClose={() => setSettingTemperature(false)} />}
      {isSettingLighting && <LightSettingPopup isOpen={isSettingLighting} onClose={() => setSettingLighting(false)} />}
    </div>
    
  );

}
