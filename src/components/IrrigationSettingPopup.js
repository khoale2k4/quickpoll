import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Switch from "../components/Switch.js";
import ScheduleTaskPopup from "../components/ScheduleTaskPopup.js";

const IrrigationSettingPopup = ({ onClose }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [moistureMode, setMoistureMode] = useState("Automatic");
    const [moistureLevel, setMoistureLevel] = useState("Dry");
    const [customMoisture, setCustomMoisture] = useState(50); // Mặc định 50%
    const [dangerBehavior, setDangerBehavior] = useState("Warn and take action");
    const [isWateringOn, setIsWateringOn] = useState(false);
    const [currentSchedule, setCurrentSchedule] = useState(null);

    const updateSchedule = (newSchedule) => {
        setCurrentSchedule(newSchedule);
        setShowPopup(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md"
            >
                <div className="flex items-center justify-between mb-4">
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-xl font-semibold">Irrigation Setting</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Moisture Regulation Mode */}
                    <div>
                        <h3 className="font-medium text-gray-700">Moisture Regulation Mode</h3>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {['Automatic', 'Scheduled', 'Manual'].map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setMoistureMode(mode)}
                                    className={`py-2 px-4 rounded-lg border ${moistureMode === mode ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"} transition`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Moisture Level */}
                    {moistureMode === "Automatic" && <div>
                        <h3 className="font-medium text-gray-700">Moisture Level</h3>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                            {['Dry', 'Average', 'Wet', 'Custom'].map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setMoistureLevel(level)}
                                    className={`py-2 px-4 rounded-lg border ${moistureLevel === level ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"} transition`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                    }
                    
                    {/* Custom Moisture Level */}
                    {moistureLevel === "Custom" && moistureMode === "Automatic" && (
                        <div className="mt-4">
                            <h3 className="font-medium text-gray-700">Custom Moisture Level</h3>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={customMoisture}
                                    onChange={(e) => setCustomMoisture(e.target.value)}
                                    className="w-full"
                                />
                                <span className="text-gray-700 font-medium">{customMoisture}%</span>
                            </div>
                        </div>
                    )}

                    {moistureMode === "Scheduled" &&
                        (<div className="mt-4">
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
                        </div>)
                    }

                    {/* Danger-safe behaviors */}
                    {moistureMode !== "Manual" && (
                        <div>
                            <h3 className="font-medium text-gray-700">Danger-safe Behaviors</h3>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {['Warn and take action', 'Warn only', 'Do nothing'].map((behavior) => (
                                    <button
                                        key={behavior}
                                        onClick={() => setDangerBehavior(behavior)}
                                        className={`py-2 px-4 rounded-lg border ${dangerBehavior === behavior ? "bg-red-500 text-white" : "bg-gray-100 hover:bg-gray-200"} transition`}
                                    >
                                        {behavior}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {moistureMode === "Manual" && (
                        <div className="flex justify-between items-center">
                            <span>Turn on watering</span>
                            <Switch checked={isWateringOn} onCheckedChange={setIsWateringOn} />
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
}


export default IrrigationSettingPopup;

