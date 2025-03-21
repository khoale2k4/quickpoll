import { Bell, BarChart, User, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../components/Card.js";
import IrrigationSettingPopup from "../components/IrrigationSettingPopup.js";
import LightSettingPopup from "../components/LightSettingPopup.js";
import TemperaturePopup from "../components/TemperatureSettingPopup.js";

import { LuLeaf } from "react-icons/lu";
import { useEffect } from "react";
import axios from "axios";

export default function YoloFarmDashboard() {
  const [isSettingIrrigation, setSettingIrrigation] = useState(false);
  const [isSettingTemperature, setSettingTemperature] = useState(false);
  const [isSettingLighting, setSettingLighting] = useState(false);
  const [infoMap, setInfoMap] = useState({
    intergration: {
      value: -1,
      mode: null,
      description: ""
    },
    irrigation: {
      value: -1,
      mode: null,
      description: ""
    },
    temperture: {
      value: -1,
      mode: null,
      description: ""
    },
    lightning: {
      value: -1,
      mode: null,
      description: ""
    }
  })

  const navigate = useNavigate();
  const handleIconClick = (value) => () => {
    navigate(`/${value}`);
  };

  useEffect(() => {
    const fetchMoistureData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_HOST}/api/records/moisture`);
        const data = response.data;
        if(data.length === 0) return;
        const latestData = data[data.length - 1];
        setInfoMap(prevInfoMap => ({
          ...prevInfoMap,
          irrigation: {
            ...prevInfoMap.irrigation,
            value: latestData.recordValue
          }
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchTemperatureData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_HOST}/api/records/temperature`);
        const data = response.data;
        if(data.length === 0) return;
        const latestData = data[data.length - 1];
        setInfoMap(prevInfoMap => ({
          ...prevInfoMap,
          temperture: {
            ...prevInfoMap.temperture,
            value: latestData.recordValue
          }
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchLightningData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_HOST}/api/records/light`);
        const data = response.data;
        if(data.length === 0) return;
        const latestData = data[data.length - 1];
        setInfoMap(prevInfoMap => ({
          ...prevInfoMap,
          lightning: {
            ...prevInfoMap.lightning,
            value: latestData.recordValue
          }
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const intervalId = setInterval(() => {
      fetchMoistureData();
      fetchTemperatureData();
      fetchLightningData();
    }, 3000);

    return () => clearInterval(intervalId);
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
          <Bell
            className="cursor-pointer hover:text-green-700"
            onClick={handleIconClick("reminder")}
          />
          <BarChart
            className="cursor-pointer hover:text-green-700"
            onClick={handleIconClick("statistics")} />
          <User
            className="cursor-pointer hover:text-green-700"
            onClick={handleIconClick("profile")}
          />
        </div>
      </div>

      <Card
        title="Intergration"
        value={infoMap.intergration.value}
        unit="%"
        description={infoMap.intergration.description}
        mode={infoMap.intergration.mode}
        bgColor={"bg-blue-400"}
        icon="💧"
        onSettingsClick={() => {}
          // setSettingIntergration(true)
        }
      />
      <Card
        title="Irrigation"
        value={infoMap.irrigation.value}
        unit="%"
        description={infoMap.irrigation.description}
        mode={infoMap.irrigation.mode}
        bgColor={"bg-blue-400"}
        icon="💧"
        onSettingsClick={() => setSettingIrrigation(true)}
      />
      <Card
        title="Temperature"
        value={infoMap.temperture.value}
        unit="°C"
        description={infoMap.temperture.description}
        mode={infoMap.temperture.mode}
        bgColor="bg-red-400"
        icon="🌡"
        onSettingsClick={() => setSettingTemperature(true)}
      />
      <Card
        title="Lighting"
        value={infoMap.lightning.value}
        unit="W/m²"
        description={infoMap.lightning.description}
        mode={infoMap.lightning.mode}
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
