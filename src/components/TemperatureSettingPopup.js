import { useState } from "react";
import Switch from "../components/Switch.js";
import { X, ArrowLeft } from "lucide-react";

const TemperaturePopup = ({ onClose }) => {
  const [mode, setMode] = useState("Automatic");
  const [isSunshadeOn, setIsSunshadeOn] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [lowerLimit, setLowerLimit] = useState(10);
  const [upperLimit, setUpperLimit] = useState(50);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
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
                className={`py-2 px-4 rounded-lg border transition ${mode === option ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Automatic Mode - Adjust Upper and Lower Limits */}
          {mode === "Automatic" && (
            <div className="space-y-2">
              <h3 className="font-semibold">Safety</h3>
              <div className="flex justify-between items-center">
                <span>Lower limit</span>
                <input
                  type="number"
                  value={lowerLimit}
                  onChange={(e) => setLowerLimit(Number(e.target.value))}
                  className="border p-1 rounded w-16 text-center"
                />
              </div>
              <div className="flex justify-between items-center">
                <span>Upper limit</span>
                <input
                  type="number"
                  value={upperLimit}
                  onChange={(e) => setUpperLimit(Number(e.target.value))}
                  className="border p-1 rounded w-16 text-center"
                />
              </div>
            </div>
          )}

          {/* Scheduled Mode - Time Selection */}
          {mode === "Scheduled" && (
            <div className="space-y-2">
              <h3 className="font-semibold">Schedule mode setting</h3>
              <div className="flex justify-between items-center">
                <span>From</span>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="border p-1 rounded"
                />
              </div>
              <div className="flex justify-between items-center">
                <span>To</span>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="border p-1 rounded"
                />
              </div>
            </div>
          )}

          {/* Manual Mode - Toggle Sunshade */}
          {mode === "Manual" && (
            <div className="flex justify-between items-center">
              <span>Sunshade</span>
              <Switch checked={isSunshadeOn} onCheckedChange={setIsSunshadeOn} />
            </div>
          )}
          <div className="flex justify-between items-center">
            <span>Send warning</span>
            <Switch checked={isNotify} onCheckedChange={setIsNotify} />
          </div>
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
