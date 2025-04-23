import { Bell, BarChart, User, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [error, setError] = useState(false);
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


  const [dataTypes, setDataTypes] = useState(
    [
      'amountofwater',
      'moisture',
      'light',
      'humidity',
      'temperature']);
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

            if (type == "irrigationsettings") {
              for (const _mode of ['amountofwater', 'moisture', 'humidity'])
                setInfoMap(prevInfoMap => ({
                  ...prevInfoMap,
                  [_mode]: {
                    ...prevInfoMap[_mode],
                    mode: mode,
                  }
                }));
            } else if (type == "temperaturesettings") {
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

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const saveSetting = async (setting, type, saveMode) => {
    // console.log("Saved");
    try {
      for (const scheduleType of ["monthly", "weekly", "daily"]) {
        const apiUrl = `${process.env.REACT_APP_HOST}/api/schedulers/${scheduleType}`;
        const getResponse = await axios.get(apiUrl);
        if (getResponse.data && getResponse.data.length > 0) {
          const resData = getResponse.data[0];
          // console.log('resData', resData);
          const apiUrl = `${process.env.REACT_APP_HOST}/api/schedulers/${scheduleType}/${resData.id}`;
          const responseDelete = await axios.delete(apiUrl);
          // console.log('responseDelete', responseDelete);
        }
      }
      for (const mode of modes) {
        const apiUrl = `${process.env.REACT_APP_HOST}/api/${type}/${mode}`;
        const getResponse = await axios.get(apiUrl);
        if (getResponse.data && getResponse.data.length > 0) {
          const data = getResponse.data[0];
          console.log("getResponse.data[0]", data)
          const settingId = data.id;
          const response = await axios.delete(`${process.env.REACT_APP_HOST}/api/${type}/${mode}/${settingId}`)
          // console.log(response);
        }
      }

      await delay(1000);
      console.log('setting', setting)
      const response = await axios.post(`${process.env.REACT_APP_HOST}/api/${type}/${saveMode}`, setting);
      console.log('response create', response);
      if (saveMode === 'scheduled') {
        const scheduleType = setting.scheduler.type;

        const body = {
          duration: setting.scheduler.duration,
          time: setting.scheduler.time,
          dayOfWeeks: setting.scheduler.daysOfWeek,
          days: setting.scheduler.daysOfMonth,
          lightScheduled: type === 'lightsettings' ? {
            id: response.data.lightSetting.id,
          } : null,
          irrigationScheduled: type === 'irrigationsettings' ? {
            id: response.data.irrigationSetting.id,
          } : null,
          temperatureScheduled: type === 'temperaturesettings' ? {
            id: response.data.temperatureSetting.id,
          } : null,
        }
        console.log("body", body);
        const response2 = await axios.post(`${process.env.REACT_APP_HOST}/api/schedulers/${scheduleType}`, body);
        console.log("response2", response2);
      }
      console.log("Lưu thành công:", response.data);
      if (type == "irrigationsettings") {
        setSettingIrrigation(false);
      } else if (type == "temperaturesettings") {
        setSettingTemperature(false);
      } else {
        setSettingLighting(false);
      }
      setError(false);
      setOpenMessage(true);
      setMessage("Lưu cài đặt thành công!");
    } catch (err) {
      console.error("Lỗi trong saveSetting:", err);
      setError(true);
      setOpenMessage(true);
      setMessage("Lỗi khi lưu cài đặt: ", err, "Vui lòng thử lại");
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
    }, 10000);

    const intervalId2 = setInterval(() => {
      fetchMode();
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
    }
  }, []);

  return (
    <div className="p-6 max-w-lg md:max-w-2xl mx-auto">
      {openMessage && <NotificationModal message={message} onClose={() => setOpenMessage(false)} success={!error} />}
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

      {dataTypes.map((type) => {
        const { unit, bgColor, icon } = getDataAttributes(type);

        return (
          <div className="pt-4">
            <Card
              key={type}
              title={type.charAt(0).toUpperCase() + type.slice(1)}
              value={
                typeof infoMap[type]?.value === 'number'
                  ? (Number.isInteger(infoMap[type].value)
                    ? infoMap[type].value
                    : parseFloat(infoMap[type].value.toFixed(4)))
                  : infoMap[type]?.value ?? "N/A"
              }
              unit={unit}
              description={infoMap[type]?.description ?? "Không có dữ liệu"}
              mode={infoMap[type]?.mode ? infoMap[type]?.mode.toUpperCase() : ""}
              bgColor={bgColor}
              icon={icon}
              onSettingsClick={() => {
                if (type === 'amountofwater' || type === 'moisture' || type === 'humidity') setSettingIrrigation(true);
                if (type === 'temperature') setSettingTemperature(true);
                if (type === 'light') setSettingLighting(true);
              }}
            />
          </div>
        );
      })}

      {isSettingIrrigation && <IrrigationSettingPopup isOpen={isSettingIrrigation} onClose={() => setSettingIrrigation(false)} onSave={(setting, mode) => { saveSetting(setting, "irrigationsettings", mode); }} />}
      {isSettingTemperature && <TemperaturePopup isOpen={isSettingTemperature} onClose={() => setSettingTemperature(false)} onSave={(setting, mode) => { saveSetting(setting, "temperaturesettings", mode); }} />}
      {isSettingLighting && <LightSettingPopup isOpen={isSettingLighting} onClose={() => setSettingLighting(false)} onSave={(setting, mode) => { saveSetting(setting, "lightsettings", mode); }} />}
    </div>
  );

}
