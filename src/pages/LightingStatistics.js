import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Dot,
} from "recharts";
import { ArrowLeft, Download } from "lucide-react";

// Dữ liệu mẫu (Monday -> Sunday)
const data = [
    { day: "MON", value: 1200 },
    { day: "TUE", value: 2500 },
    { day: "WED", value: 4800 }, // Điểm cao nhất
    { day: "THU", value: 1000 },
    { day: "FRI", value: 3000 },
    { day: "SAT", value: 4000 },
    { day: "SUN", value: 3500 },
];

export default function LightingStatistics() {
    // Khi người dùng click vào 1 điểm, ta lưu lại state
    const [selectedPoint, setSelectedPoint] = useState(null);

    // Thông tin hiển thị bên phải
    const lastMeasured = "650 W/m2";
    const averageValue = "620 W/m2";
    const selectedDate = "2025-02-10";
    const selectedValue = "21%";
    const lastUpdated = "2025-02-20 11:40";
    const showingDataFrom = "2025-02-20";

    const handleClickLine = (e) => {
        // e.activePayload: mảng payload
        if (e && e.activePayload) {
            setSelectedPoint(e.activePayload[0].payload);
            console.log("Selected data:", e.activePayload[0].payload);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <button className="p-2 rounded-full hover:bg-gray-200">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-semibold">Statistics</h1>
                <button className="p-2 rounded-full hover:bg-gray-200">
                    <Download className="w-6 h-6" />
                </button>
            </div>

            {/* Chart Title */}
            <h2 className="text-xl font-semibold text-center mb-2">Lighting</h2>

            {/* Biểu đồ đường */}
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} onClick={handleClickLine}>
                    <XAxis dataKey="day" stroke="#A0A0A0" />
                    <YAxis domain={[0, 5000]} stroke="#A0A0A0" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#A020F0" // màu tím
                        strokeWidth={3}
                        dot={({ cx, cy, payload }) => (
                            <Dot
                                cx={cx}
                                cy={cy}
                                r={payload.value === 4800 ? 6 : 4} // Điểm WED cao nhất
                                fill={payload.value === 4800 ? "red" : "#A020F0"}
                            />
                        )}
                    />
                </LineChart>
            </ResponsiveContainer>

            {/* Thông tin bên phải (có thể đặt cạnh chart tùy layout) */}
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                <p>
                    Showing data from <strong>{showingDataFrom}</strong>
                </p>
                <p>
                    Last updated: <strong>{lastUpdated}</strong>
                </p>
                <hr className="my-2" />
                <p>
                    Last measured: <strong>{lastMeasured}</strong>
                </p>
                <p>
                    Average value: <strong>{averageValue}</strong>
                </p>
                <hr className="my-2" />
                <p>
                    Selected date: <strong>{selectedDate}</strong>
                </p>
                <p>
                    Selected value: <strong>{selectedValue}</strong>
                </p>
            </div>
        </div>
    );
}
