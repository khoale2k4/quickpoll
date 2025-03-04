import React, {useState} from "react";
import { FaPen } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const ReminderPopup = ({ onClose, onSave }) => {

    const localDate = new Date().toISOString().split("T")[0];
    const localTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const [date, setDate] = useState(localDate);
    const [time, setTime] = useState(localTime);
    const [title, setTitle] = useState(""); 
    const [description, setDescription] = useState(""); 

    const handleSave = () => {
        const newReminder = {
            id: Date.now(),
            title,
            description,
            dateTime: `${date}, ${time}`,
        };
        onSave(newReminder);
        onClose();
      };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded-md shadow-lg relative">
                <button
                className="absolute top-3 right-2 text-gray-600 hover:text-gray-800"
                onClick={onClose}
                >
                <IoMdClose size={24}/>
                </button>

                <h2 className="text-2xl font-semibold mb-4">Add New Reminder</h2>

                {/* Date/Time Inputs */}
                <div className="flex space-x-4 mb-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Date</label>
                        <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border p-1 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Time</label>
                        <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="border p-1 w-full"
                        />
                    </div>
                </div>

                {/* Title */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Title</label>
                    <input
                        type="text"
                        placeholder="What should we remind you do?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border-b border-gray-300 focus:outline-none focus:border-black px-1 pb-1"
                    />
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="flex items-center text-gray-700 font-medium mb-1">
                        Description
                        <FaPen className="w-4 h-4 ml-2 text-gray-500" />
                    </label>
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border-b border-gray-300 focus:outline-none focus:border-black px-1 pb-1"
                    />
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="text-lg font-bold text-green-500 hover:text-green-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReminderPopup;