import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const ReminderPopup = ({ onClose, onSave }) => {
  const localDate = new Date().toISOString().split("T")[0];
  const localTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [date, setDate] = useState(localDate);
  const [time, setTime] = useState(localTime);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function formatDateTime(isoString) {
    // isoString === "2025-04-20T12:00:00"
    const [date, time] = isoString.split("T"); // ["2025-04-20", "12:00:00"]
    const [hour, minute] = time.split(":"); // ["12","00","00"] → we only need the first two
    return `${date}, ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
  }

  const handleSave = () => {
    const reminderTime = new Date(`${date}T${time}`).toISOString();

    const payload = {
      id: {
        id: 12, // Ideally use proper ID from backend
        username: "username1",
      },
      title,
      reminderDescription: description,
      reminderTime,
      isDone: false,
    };

    fetch("http://localhost:8080/api/reminders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create reminder");
        return res.json();
      })
      .then((data) => {
        console.log(">>>> data: ", data);
        const formattedTask = {
          id: data.reminder.id,
          username: data.reminder.id.username,
          title: data.reminder.title,
          dateTime: formatDateTime(data.reminder.reminderTime), // or call formatDateTime if passed
          rawDateTime: data.reminder.reminderTime,
          description: data.reminder.reminderDescription,
          done: data.reminder.isDone,
        };
        if (onSave) onSave(formattedTask);
        onClose(); // Close popup
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-md shadow-lg relative">
        <button
          className="absolute top-3 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <IoMdClose size={24} />
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
