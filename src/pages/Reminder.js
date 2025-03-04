import React, {useState} from "react";
import { FaArrowLeft, FaCaretUp, FaCaretDown } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import ReminderPopup from "../components/ReminderPopup";
import TaskDetailPopup from "../components/TaskDetailPopup";
import { useNavigate } from "react-router-dom";

const Reminders = () => {

    const [tasks, setTasks] = useState([
        {
          id: 1,
          title: "Check moisture sensor",
          dateTime: "2025-03-21, 15:00",
          description: "Check sensor status",
          done: false,
        },
        {
          id: 2,
          title: "Check the pipe",
          dateTime: "2025-03-22, 15:00",
          description: "Inspect pipe integrity",
          done: false,
        },
        {
          id: 3,
          title: "Turn off light",
          dateTime: "2025-02-21, 15:00",
          description: "Remember to turn off lights",
          done: false,
        },
        {
          id: 4,
          title: "Clean the sunshade",
          dateTime: "2025-02-21, 15:00",
          description: "Clean thoroughly",
          done: false,
        },
        {
          id: 5,
          title: "Overdue: Check moisture sensor",
          dateTime: "2021-02-21, 15:00",
          description: "Overdue task detail",
          done: false,
        },
        {
          id: 6,
          title: "Overdue: Check the pipe",
          dateTime: "2021-02-21, 15:00",
          description: "Overdue task detail",
          done: false,
        },
    ]);

    const [showAddPopup, setShowAddPopup] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const [isUpcomingOpen, setIsUpcomingOpen] = useState(true);
    const [isOverdueOpen, setIsOverdueOpen] = useState(true);

    const isOverdue = (task) => {
        const dueDate = new Date(task.dateTime.replace(", ", "T"));
        const now = new Date();
        return dueDate < now;
    };
    
    const handleMarkAsDone = (taskId) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, done: true } : task
          )
        );
    };

    const handleAddReminder = (newReminder) => {
        setTasks((prevTasks) => [...prevTasks, newReminder]);
    };

    const upcomingTasks = tasks.filter(
        (task) => !task.done && !isOverdue(task)
    );
    const overdueTasks = tasks.filter((task) => !task.done && isOverdue(task));

    const navigate = useNavigate();
    const handleIconClick = () => {
        navigate("/dashboard"); 
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            {/* Left: Back arrow + Title */}
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                {/* Replace with your own back arrow if desired */}
                <FaArrowLeft className="text-xl" onClick={handleIconClick}/>
              </button>
              <h1 className="text-2xl font-semibold">Reminders</h1>
            </div>

            <button 
                className="flex items-center font-bold bg-green-700 text-white p-2 rounded hover:bg-green-800"
                onClick={() => setShowAddPopup(true)}
            >
                Add new remind
                <CiCirclePlus size={24} className="ml-1"/>
            </button>
          </div>
    
            {/* Upcoming Section */}
            <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-medium text-gray-800">
                    Upcoming ({upcomingTasks.length})
                </h2>
                <button
                    onClick={() => setIsUpcomingOpen(!isUpcomingOpen)}
                    className="focus:outline-none"
                >
                    {isUpcomingOpen ? (
                    <FaCaretUp className="text-xl" />
                    ) : (
                    <FaCaretDown className="text-xl" />
                    )}
                </button>
            </div>

            {isUpcomingOpen && (
                <div className="space-y-2">
                    {upcomingTasks
                    .filter((task) => !task.done)
                    .map((task) => (
                    <div
                        key={task.id}
                        className="flex items-center justify-between border-b border-gray-200 pb-2"
                    >
                        {/* Task title in blue */}
                        <span className="text-blue-600 hover:underline cursor-pointer w-2/5" onClick={() => setSelectedTask(task)}>
                        {task.title}
                        </span>
                        {/* Date/Time */}
                        <span className="text-gray-600">{task.dateTime}</span>
                        {/* Mark as done button */}
                        <button
                        onClick={() => handleMarkAsDone(task.id)}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
                        >
                        Mark as done
                        </button>
                    </div>
                    ))}
                </div>
            )}
            </div>
            
            {/* Overdue Section (gray background) */}
            <div className="bg-gray-100">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-medium text-gray-800">
                        Overdue ({overdueTasks.length})
                    </h2>
                    <button
                        onClick={() => setIsOverdueOpen(!isOverdueOpen)}
                        className="focus:outline-none"
                    >
                        {isOverdueOpen ? (
                        <FaCaretUp className="text-xl" />
                        ) : (
                        <FaCaretDown className="text-xl" />
                        )}
                    </button>
                </div>

                {isOverdueOpen && (
                    <div className="space-y-2">
                        {overdueTasks
                        .filter((task) => !task.done)
                        .map((task) => (
                            <div
                                key={task.id}
                                className="flex items-center justify-between border-b border-gray-200 pb-2"
                            >
                                <span className="text-red-600 hover:underline cursor-pointer w-2/5" onClick={() => setSelectedTask(task)}>{task.title}</span>
                                <span className="text-gray-600">{task.dateTime}</span>
                                <button
                                onClick={() => handleMarkAsDone(task.id)}
                                className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
                                >
                                Mark as done
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Conditionally render the Add Reminder Popup */}
            {showAddPopup && (
                <ReminderPopup
                onClose={() => setShowAddPopup(false)}
                onSave={handleAddReminder}
                />
            )}

            {/* Conditionally render the Task Detail Popup */}
            {selectedTask && (
                <TaskDetailPopup
                task={selectedTask}
                onClose={() => setSelectedTask(null)}
                />
            )}
        </div>
    );
};

export default Reminders;
