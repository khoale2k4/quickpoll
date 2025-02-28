import { useState } from "react";
import Switch from "../components/Switch.js";
import { X, ArrowLeft } from "lucide-react";
import ScheduleTaskPopup from "../components/ScheduleTaskPopup.js";

const TemperaturePopup = ({ onClose }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [mode, setMode] = useState("Automatic");
  const [isSunshadeOn, setIsSunshadeOn] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [lowerLimit, setLowerLimit] = useState(10);
  const [upperLimit, setUpperLimit] = useState(50);
  const [currentSchedule, setCurrentSchedule] = useState(null);

  const updateSchedule = (newSchedule) => {
    setCurrentSchedule(newSchedule);
    setShowPopup(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 ">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">Temperature Setting</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Sunshade Mode */}
          <h3 className="font-semibold">Sunshade mode</h3>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {["Automatic", "Scheduled", "Manual"].map((option) => (
              <button
                key={option}
                onClick={() => setMode(option)}
                className={`py-2 px-4 rounded-lg border transition ${mode === option ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Automatic Mode - Adjust Upper and Lower Limits */}
          {mode === "Automatic" && (
            <div className="space-y-4">
              <h3 className="font-semibold">Temperature Range</h3>

              {/* Lower Limit */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Lower Limit: {lowerLimit}°C</label>
                <input
                  type="range"
                  min="-10"
                  max="100"
                  step="1"
                  value={lowerLimit}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setLowerLimit(value);
                    if (value > upperLimit - 5) setUpperLimit(value + 5);
                  }}
                  className="w-full"
                />
              </div>

              {/* Upper Limit */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Upper Limit: {upperLimit}°C</label>
                <input
                  type="range"
                  min="-10"
                  max="100"
                  step="1"
                  value={upperLimit}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setUpperLimit(value);
                    if (value < lowerLimit + 5) setLowerLimit(value - 5);
                  }}
                  className="w-full"
                />
              </div>
            </div>
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

          {/* Manual Mode - Toggle Sunshade */}
          {mode === "Manual" && (
            <div className="flex justify-between items-center">
              <span>Turn on sunshade</span>
              <Switch checked={isSunshadeOn} onCheckedChange={setIsSunshadeOn} />
            </div>
          )}

          {mode !== "Manual" && (
            <div className="flex justify-between items-center">
              <span>Send warning</span>
              <Switch checked={isNotify} onCheckedChange={setIsNotify} />
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">
              Close
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperaturePopup;
