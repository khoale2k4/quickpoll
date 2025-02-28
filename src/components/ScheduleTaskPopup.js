import { useState } from "react";
import { X } from "lucide-react";

const ScheduleTaskPopup = ({ onClose, onSave }) => {
  const [type, setType] = useState("daily");
  const [time, setTime] = useState("16:00");
  const [duration, setDuration] = useState(30);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [daysOfMonth, setDaysOfMonth] = useState([]);

  const toggleDay = (day) => {
    setDaysOfMonth((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSave = () => {
    const newTask = {
      type,
      time,
      duration,
      daysOfWeek: type === "weekly" ? daysOfWeek : null,
      daysOfMonth: type === "monthly" ? daysOfMonth.sort((a, b) => a - b) : null,
    };
    onSave(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Create new task</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chọn loại lịch trình */}
        <div className="mt-4 space-y-2">
          {["daily", "weekly", "monthly"].map((option) => (
            <label key={option} className="block">
              <input
                type="radio"
                name="scheduleType"
                value={option}
                checked={type === option}
                onChange={() => setType(option)}
              />{" "}
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          ))}
        </div>

        {/* Chọn thời gian */}
        <div className="mt-4">
          <label className="block font-medium">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Chọn ngày trong tuần */}
        {type === "weekly" && (
          <div className="mt-4">
            <label className="block font-medium">Days of the week</label>
            <select
              multiple
              value={daysOfWeek}
              onChange={(e) =>
                setDaysOfWeek([...e.target.selectedOptions].map((o) => o.value))
              }
              className="w-full border p-2 rounded"
            >
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                (day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                )
              )}
            </select>
          </div>
        )}

        {/* Chọn ngày trong tháng */}
        {type === "monthly" && (
          <div className="mt-4">
            <label className="block font-medium">Days of the month</label>
            <div className="grid grid-cols-7 gap-2 mt-2">
              {[...Array(31)].map((_, i) => (
                <button
                  key={i + 1}
                  className={`p-2 border rounded-full ${
                    daysOfMonth.includes(i + 1) ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
                  onClick={() => toggleDay(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Nhập thời lượng */}
        <div className="mt-4">
          <label className="block font-medium">Duration (seconds)</label>
          <input
            type="number"
            min="5"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Nút lưu */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTaskPopup;
