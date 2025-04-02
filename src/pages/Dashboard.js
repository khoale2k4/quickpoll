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
import NotificationModal from "../components/MessageModal.js";

export default function YoloFarmDashboard() {
  const [isSettingIrrigation, setSettingIrrigation] = useState(false);
  const [isSettingTemperature, setSettingTemperature] = useState(false);
  const [isSettingLighting, setSettingLighting] = useState(false);
  const [message, setMessage] = useState("");
  const [openMessage, setOpenMessage] = useState(false);
  const [infoMap, setInfoMap] = useState({
    amountofwater: {
      value: -1,
      mode: null,
      description: "Amount of water supplied to the plant, measured in milliliters (ml)."
    },
    moisture: {
      value: -1,
      mode: null,
      description: "Soil moisture level, measured in percentage (%)."
    },
    temperature: {
      value: -1,
      mode: null,
      description: "Ambient temperature, measured in degrees Celsius (°C)."
    },
    light: {
      value: -1,
      mode: null,
      description: "Light intensity in the environment, measured in lux."
    },
    humidity: {
      value: -1,
      mode: null,
      description: "Air humidity level, measured in percentage (%)."
    }
  });


  const [dataTypes, setDataTypes] = useState(['amountofwater', 'moisture', 'light', 'humidity', 'temperature']);
  const [modes, setModes] = useState(['automated', 'scheduled', 'manual']);

  const getDataAttributes = (type) => {
    const attributes = {
      amountofwater: { unit: "L", bgColor: "bg-blue-500", icon: "💦" },
      moisture: { unit: "%", bgColor: "bg-blue-600", icon: "🌱" },
      light: { unit: "W/m²", bgColor: "bg-yellow-500", icon: "☀️" },
      humidity: { unit: "%", bgColor: "bg-green-500", icon: "💧" },
      temperature: { unit: "°C", bgColor: "bg-red-400", icon: "🌡" },
    };

    return attributes[type] || { unit: "", bgColor: "bg-gray-400", icon: "❓" };
  };

  const navigate = useNavigate();
  const handleIconClick = (value) => () => {
    navigate(`/${value}`);
  };

  const fetchMode = async () => {
    for (const type of ["irrigationsettings", "temperaturesettings", "lightsettings"]) {
      for (const mode of modes) {
        const apiUrl = `${process.env.REACT_APP_HOST}/api/${type}/${mode}`;
        try {
          const getResponse = await axios.get(apiUrl);
          if (getResponse.data && getResponse.data.length > 0) {
            const data = getResponse.data;
            // console.log(type, mode, data);

            if(type == "irrigationsettings") {
              for (const _mode of ['amountofwater', 'moisture', 'humidity'])
              setInfoMap(prevInfoMap => ({
                ...prevInfoMap,
                [_mode]: {
                  ...prevInfoMap[_mode],  
                  mode: mode,          
                }
              }));
            } else if(type == "temperaturesettings"){
              setInfoMap(prevInfoMap => ({
                ...prevInfoMap,
                ["temperature"]: {
                  ...prevInfoMap["temperature"],  
                  mode: mode,          
                }
              }));
            } else {
              setInfoMap(prevInfoMap => ({
                ...prevInfoMap,
                ["light"]: {
                  ...prevInfoMap["light"],  
                  mode: mode,          
                }
              }));
            }
          }
        } catch (error) {
          console.error(`Lỗi khi lấy dữ liệu từ ${apiUrl}:`, error);
        }
      }
    }
  };


  const saveSetting = async (setting, type, saveMode) => {
    console.log("Saved");
    try {
      for (const mode of modes) {
        const apiUrl = `${process.env.REACT_APP_HOST}/api/${type}/${mode}`;
        const getResponse = await axios.get(apiUrl);
        if (getResponse.data && getResponse.data.length > 0) {
          const data = getResponse.data[0];
          console.log("getResponse.data[0]", data)
          const settingId = data.id;
          const response = await axios.delete(`${process.env.REACT_APP_HOST}/api/${type}/${mode}/${settingId}`)
          console.log(response);
        }
      }

      const response = await axios.post(`${process.env.REACT_APP_HOST}/api/${type}/${saveMode}`, setting);
      console.log("Lưu thành công:", response.data);
      if (type == "irrigationsettings") {
        setSettingIrrigation(false);
      } else if (type == "temperaturesettings") {
        setSettingTemperature(false);
      } else {
        setSettingLighting(false);
      }
      setOpenMessage(true);
      setMessage("Lưu cài đặt thành công!");
    } catch (err) {
      console.error("Lỗi trong saveSetting:", err);
      setOpenMessage(true);
      setMessage("Lỗi khi lưu cài đặt: ", err);
    }
  };


  useEffect(() => {
    const fetchData = async (type) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_HOST}/api/records/${type}/1`);
        const data = response.data;
        if (data.length === 0) return;
        const latestData = data[data.length - 1];
        setInfoMap(prevInfoMap => ({
          ...prevInfoMap,
          [type]: {
            ...prevInfoMap[type],
            value: latestData.recordValue
          }
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    for (const dataType of dataTypes) {
      fetchData(dataType);
    }

    const intervalId = setInterval(() => {
      for (const dataType of dataTypes) {
        fetchData(dataType);
      }
      fetchMode();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-6 max-w-lg md:max-w-2xl mx-auto space-y-6">
      {openMessage && <NotificationModal message={message} onClose={() => setOpenMessage(false)} />}
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

      {dataTypes.map((type) => {
        const { unit, bgColor, icon } = getDataAttributes(type);

        return (
          <Card
            key={type}
            title={type.charAt(0).toUpperCase() + type.slice(1)}
            value={infoMap[type]?.value ?? "N/A"}
            unit={unit}
            description={infoMap[type]?.description ?? "Không có dữ liệu"}
            mode={infoMap[type]?.mode?infoMap[type]?.mode.toUpperCase():""}
            bgColor={bgColor}
            icon={icon}
            onSettingsClick={() => {
              if (type === 'amountofwater' || type === 'moisture' || type === 'humidity') setSettingIrrigation(true);
              if (type === 'temperature') setSettingTemperature(true);
              if (type === 'light') setSettingLighting(true);
            }}
          />
        );
      })}

      {isSettingIrrigation && <IrrigationSettingPopup isOpen={isSettingIrrigation} onClose={() => setSettingIrrigation(false)} onSave={(setting, mode) => { saveSetting(setting, "irrigationsettings", mode); }} />}
      {isSettingTemperature && <TemperaturePopup isOpen={isSettingTemperature} onClose={() => setSettingTemperature(false)} onSave={(setting, mode) => { saveSetting(setting, "temperaturesettings", mode); }} />}
      {isSettingLighting && <LightSettingPopup isOpen={isSettingLighting} onClose={() => setSettingLighting(false)} onSave={(setting, mode) => { saveSetting(setting, "lightsettings", mode); }}/>}
    </div>
  );

}
