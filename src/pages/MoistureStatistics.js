import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Dot } from "recharts";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const data = [
  { date: "Jan", value: 20 },
  { date: "Feb", value: 25 },
  { date: "Mar", value: 15 },
  { date: "Apr", value: 10 },
  { date: "May", value: 80 }, // Highlight
  { date: "Jun", value: 40 },
  { date: "Jul", value: 70 },
  { date: "Aug", value: 50 },
  { date: "Sep", value: 90 },
  { date: "Oct", value: 85 },
  { date: "Nov", value: 95 },
  { date: "Dec", value: 100 },
];

export default function MoistureStatistics() {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const lastMeasured = "20%";
  const averageValue = "30%";
  const selectedDate = "2025-02-10";
  const selectedValue = "21%";
  const lastUpdated = "2025-02-20 11:40";
  const showingDataFrom = "2025-02-20";
  const navigate = useNavigate();

  const handleStatisticsClick = () => {
    navigate("/dashboard");
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button className="p-2 rounded-full hover:bg-gray-200">
          <ArrowLeft className="w-6 h-6" onClick={handleStatisticsClick} />
        </button>
        <h1 className="text-2xl font-semibold">Statistics</h1>
        <button className="p-2 rounded-full hover:bg-gray-200">
          <Download className="w-6 h-6" />
        </button>
      </div>

      {/* Chart */}
      <h2 className="text-xl font-semibold text-center">Moisture</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} onClick={(e) => setSelectedPoint(e.activePayload?.[0]?.payload)}>
          <XAxis dataKey="date" stroke="#A0A0A0" />
          <YAxis domain={[0, 100]} stroke="#A0A0A0" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Line type="monotone" dataKey="value" stroke="#66C2FF" strokeWidth={3} dot={({ cx, cy, payload }) => (
            <Dot cx={cx} cy={cy} r={payload.value === 80 ? 6 : 4} fill={payload.value === 80 ? "red" : "#66C2FF"} />
          )} />
        </LineChart>
      </ResponsiveContainer>

      {/* Details Section */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-50">
        <p>Showing data from <strong>{showingDataFrom}</strong></p>
        <p>Last updated: <strong>{lastUpdated}</strong></p>
        <hr className="my-2" />
        <p>Last measured: <strong>{lastMeasured}</strong></p>
        <p>Average value: <strong>{averageValue}</strong></p>
        <hr className="my-2" />
        <p>Selected date: <strong>{selectedDate}</strong></p>
        <p>Selected value: <strong>{selectedValue}</strong></p>
      </div>
    </div>
  );
}
