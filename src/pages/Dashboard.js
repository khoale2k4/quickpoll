import { Bell, BarChart, User, Settings } from "lucide-react";
import { useState } from "react";
import Card from "../components/Card.js";
import IrrigationSettingPopup from "../components/IrrigationSettingPopup.js";
import LightSettingPopup from "../components/LightSettingPopup.js";
import TemperaturePopup from "../components/TemperatureSettingPopup.js";

import { LuLeaf } from "react-icons/lu";

export default function YoloFarmDashboard() {
  const [isSettingIrrigation, setSettingIrrigation] = useState(false);
  const [isSettingTemperature, setSettingTemperature] = useState(false);
  const [isSettingLighting, setSettingLighting] = useState(false);

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
          <Bell className="cursor-pointer hover:text-green-700" />
          <BarChart className="cursor-pointer hover:text-green-700" />
          <User className="cursor-pointer hover:text-green-700" />
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
