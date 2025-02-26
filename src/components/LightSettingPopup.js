import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Switch from "../components/Switch.js";
import LightLevelSlider from "../components/LightLevelSlider.js";
import ScheduleTaskPopup from "../components/ScheduleTaskPopup.js";

const LightingSettingPopup = ({ onClose }) => {
  const [mode, setMode] = useState("Automatic");
  const [isNotify, setIsNotify] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [lightRange, setLightRange] = useState([650, 800]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);

  const updateSchedule = (newSchedule) => {
    setCurrentSchedule(newSchedule);
    setShowPopup(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">Lighting Setting</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Light Regulation Mode */}
          <div>
            <h3 className="font-medium text-gray-700">Light Level Regulation Mode</h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {["Automatic", "Scheduled", "Manual"].map((option) => (
                <button
                  key={option}
                  onClick={() => setMode(option)}
                  className={`py-2 px-4 rounded-lg border transition ${mode === option ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Render Based on Mode */}
          {mode === "Manual" && (
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Turn on Light</span>
              <Switch checked={lightOn} onCheckedChange={setLightOn} />
            </div>
          )}

          {mode === "Automatic" && (
            <LightLevelSlider value={lightRange} onChange={setLightRange} />
          )}

          {/* Scheduled Mode - Time Selection */}
          {mode === "Scheduled" && (
            <div className="mt-4">
              {currentSchedule ? (
                <div className="border p-4 rounded-lg">
                  <p className="font-medium">
                    {currentSchedule.type === "monthly" ? `Days: ${currentSchedule.daysOfMonth.join(", ")}` : ""}
                    {currentSchedule.type === "weekly" ? `Days: ${currentSchedule.daysOfWeek.join(", ")}` : ""}
                    {currentSchedule.type === "daily" ? `Time: ${currentSchedule.time}` : ""}
                  </p>
                  <p className="text-sm text-gray-500">
                    {currentSchedule.type.charAt(0).toUpperCase() + currentSchedule.type.slice(1)} at {currentSchedule.time} for {currentSchedule.duration} seconds
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">No schedule set</p>
              )}

              <button
                onClick={() => setShowPopup(true)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                {currentSchedule ? "Update Schedule" : "Set Schedule"}
              </button>

              {showPopup && (
                <ScheduleTaskPopup
                  onClose={() => setShowPopup(false)}
                  onSave={updateSchedule}
                />
              )}
            </div>
          )}

          {mode !== "Manual" && (
            <div className="flex justify-between items-center">
              <span>Send warning</span>
              <Switch checked={isNotify} onCheckedChange={setIsNotify} />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">
            Close
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LightingSettingPopup;
