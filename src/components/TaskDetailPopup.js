import React from "react";
import { IoMdClose } from "react-icons/io";

const TaskDetailPopup = ({ task, onClose }) => {
    if (!task) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md p-6 rounded-md shadow-lg relative">
            {/* Close button */}
            <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            onClick={onClose}
            >
            <IoMdClose size={24}/>
            </button>
            <h2 className="text-2xl font-semibold mb-4">Task Details</h2>
            <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700">Title</h3>
            <p className="text-xl">{task.title}</p>
            </div>
            <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700">Date & Time</h3>
            <p className="text-xl">{task.dateTime}</p>
            </div>
            <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700">Description</h3>
            <p className="text-xl">{task.description}</p>
            </div>
        </div>
        </div>
    );
};

export default TaskDetailPopup;