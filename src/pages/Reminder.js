import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaCaretUp, FaCaretDown } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import ReminderPopup from "../components/ReminderPopup";
import TaskDetailPopup from "../components/TaskDetailPopup";
import { useNavigate } from "react-router-dom";

const Reminders = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isUpcomingOpen, setIsUpcomingOpen] = useState(true);
  const [isOverdueOpen, setIsOverdueOpen] = useState(true);
  const [isDoneOpen, setIsDoneOpen] = useState(true);

  function formatDateTime(isoString) {
    // isoString === "2025-04-20T12:00:00"
    const [date, time] = isoString.split("T"); // ["2025-04-20", "12:00:00"]
    const [hour, minute] = time.split(":"); // ["12","00","00"] → we only need the first two
    return `${date}, ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
  }

  const navigate = useNavigate();
  const handleIconClick = () => navigate("/dashboard");

  const fetchReminders = () => {
    fetch("http://localhost:8080/api/reminders/user/username1")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        // console.log(">>>> data", data);
        const formatted = data.map((task) => ({
          id: task.id.id,
          title: task.title,
          username: task.id.username,
          dateTime: formatDateTime(task.reminderTime),
          rawDateTime: task.reminderTime,
          description: task.reminderDescription,
          done: task.isDone,
        }));
        setTasks(formatted);
      })
      .catch((err) => {
        console.error("Error fetching reminders:", err);
      });
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const isOverdue = (task) => {
    const dueDate = new Date(task.dateTime.replace(", ", "T"));
    const now = new Date();
    return dueDate < now;
  };

  const handleMarkAsDone = async (reminder) => {
    // console.log(">>>>> ", reminder);
    try {
      const updatedReminder = {
        id: {
          id: reminder.id,
          username: reminder.username,
        },
        title: reminder.title,
        reminderDescription: reminder.description,
        reminderTime: reminder.rawDateTime,
        isDone: !reminder.done,
      };

      const response = await fetch("http://localhost:8080/api/reminders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedReminder),
      });

      if (!response.ok) {
        throw new Error("Failed to update reminder");
      }

      await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === reminder.id ? { ...task, done: !task.done } : task
        )
      );
      // Optionally update UI state here, e.g., refresh reminders list
    } catch (error) {
      console.error("Error marking reminder as done:", error);
    }
  };

  const handleAddReminder = (newReminder) => {
    setTasks((prevTasks) => [...prevTasks, newReminder]);
  };

  const upcomingTasks = tasks.filter((t) => !t.done && !isOverdue(t));
  const overdueTasks = tasks.filter((t) => !t.done && isOverdue(t));
  const completedTasks = tasks.filter((t) => t.done);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {/* Left: Back arrow + Title */}
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            {/* Replace with your own back arrow if desired */}
            <FaArrowLeft className="text-xl" onClick={handleIconClick} />
          </button>
          <h1 className="text-2xl font-semibold">Reminders</h1>
        </div>

        <button
          className="flex items-center font-bold bg-green-700 text-white p-2 rounded hover:bg-green-800"
          onClick={() => setShowAddPopup(true)}
        >
          Add new remind
          <CiCirclePlus size={24} className="ml-1" />
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
                  <span
                    className="text-blue-600 hover:underline cursor-pointer w-2/5"
                    onClick={() => setSelectedTask(task)}
                  >
                    {task.title}
                  </span>
                  {/* Date/Time */}
                  <span className="text-gray-600">{task.dateTime}</span>
                  {/* Mark as done button */}
                  <button
                    onClick={() => handleMarkAsDone(task)}
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
                  <span
                    className="text-red-600 hover:underline cursor-pointer w-2/5"
                    onClick={() => setSelectedTask(task)}
                  >
                    {task.title}
                  </span>
                  <span className="text-gray-600">{task.dateTime}</span>
                  <button
                    onClick={() => handleMarkAsDone(task)}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
                  >
                    Mark as done
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Done Section */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-medium text-gray-800">
            Done ({completedTasks.length})
          </h2>
          <button
            onClick={() => setIsDoneOpen(!isDoneOpen)}
            className="focus:outline-none"
          >
            {isDoneOpen ? (
              <FaCaretUp className="text-xl" />
            ) : (
              <FaCaretDown className="text-xl" />
            )}
          </button>
        </div>
        {isDoneOpen && (
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between border-b border-gray-200 pb-2"
              >
                <span
                  className="text-green-600 hover:underline cursor-pointer w-2/5"
                  onClick={() => setSelectedTask(task)}
                >
                  {task.title}
                </span>
                <span className="text-gray-600">{task.dateTime}</span>
                <button
                  onClick={() => handleMarkAsDone(task)}
                  className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-200"
                >
                  Undo
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
          onRefresh={fetchReminders}
        />
      )}
    </div>
  );
};

export default Reminders;
