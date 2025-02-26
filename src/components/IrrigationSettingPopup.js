import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const IrrigationSettingPopup = ({ onClose }) => {
    const [moistureMode, setMoistureMode] = useState("Automatic");
    const [moistureLevel, setMoistureLevel] = useState("Dry");
    const [dangerBehavior, setDangerBehavior] = useState("Warn and take action");

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
                    <div>
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

                    {/* Danger-safe behaviors */}
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
