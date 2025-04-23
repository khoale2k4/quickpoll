import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const TaskDetailPopup = ({ task, onClose, onRefresh }) => {
//   console.log(">>> task", task);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        setTitle(task.title);
        setDescription(task.description);
        setDateTime(task.rawDateTime);
        setIsEditMode(false);
      }, [task]);

  const handleUpdate = () => {
    if (!isEditMode) {
        setIsEditMode(true); // Enter edit mode
        return;
    }
    console.log(">>> time", dateTime);

    fetch("http://localhost:8080/api/reminders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: {
                id: task.id,
                username: task.username
            },
            title,
            reminderDescription: description,
            reminderTime: dateTime,
            isDone: task.done
        })
    })
        .then((res) => {
            if (!res.ok) throw new Error("Update failed");
            return res.json();
        })
        .then(() => {
            setIsEditMode(false); // Switch back to view mode
            onRefresh();
            onClose(); // Optionally close popup or trigger refresh
        })
        .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    fetch("http://localhost:8080/api/reminders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: task.id,
            username: task.username
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Delete failed");
          onRefresh();
          onClose();
        })
        .catch((err) => console.error(err));
  };

  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-md shadow-lg relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-4">
            {isEditMode ? "Edit Task" : "Task Details"}
        </h2>

        <div className="mb-4">
          <label className="text-gray-700 font-medium block mb-1">Title</label>
          {isEditMode ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          ) : (
            <p className="text-lg">{title}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-medium block mb-1">Date & Time</label>
          {isEditMode ? (
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          ) : (
            <p className="text-lg">{dateTime}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-medium block mb-1">Description</label>
          {isEditMode ? (
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          ) : (
            <p className="text-lg">{description}</p>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isEditMode ? "Save" : "Update"}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPopup;
