import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    Bar,
    Cell,
    ResponsiveContainer,
    Dot,
} from "recharts";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Dữ liệu mẫu cho từng chart
const moistureData = [
    { month: "Jan", value: 20 },
    { month: "Feb", value: 25 },
    { month: "Mar", value: 15 },
    { month: "Apr", value: 10 },
    { month: "May", value: 80 }, // highlight
    { month: "Jun", value: 40 },
    { month: "Jul", value: 70 },
    { month: "Aug", value: 50 },
    { month: "Sep", value: 90 },
    { month: "Oct", value: 85 },
    { month: "Nov", value: 95 },
    { month: "Dec", value: 100 },
];

const temperatureData = [
    { month: "Jan", value: 450 },
    { month: "Feb", value: 550 },
    { month: "Mar", value: 500 },
    { month: "Apr", value: 400 },
    { month: "May", value: 700 },
    { month: "Jun", value: 900 },
    { month: "Jul", value: 750 },
    { month: "Aug", value: 600 },
    { month: "Sep", value: 650 },
    { month: "Oct", value: 800 },
    { month: "Nov", value: 900 },
    { month: "Dec", value: 1000 },
];

const lightingData = [
    { day: "MON", value: 1200 },
    { day: "TUE", value: 2500 },
    { day: "WED", value: 4800 }, // highest
    { day: "THU", value: 1000 },
    { day: "FRI", value: 3000 },
    { day: "SAT", value: 4000 },
    { day: "SUN", value: 3500 },
];

export default function DashboardStatistics() {
    // Loại chart đang hiển thị
    const [activeChart, setActiveChart] = useState("Moisture");

    const navigate = useNavigate();

    const handleStatisticsClick = () => {
        navigate("/dashboard");
    }

    // Thông tin hiển thị bên phải (có thể tuỳ chỉnh theo API thực tế)
    const infoMap = {
        Moisture: {
            showingDataFrom: "2025-02-20",
            lastUpdated: "2025-02-20 11:40",
            lastMeasured: "20%",
            averageValue: "30%",
            selectedDate: "2025-02-10",
            selectedValue: "21%",
        },
        Temperature: {
            showingDataFrom: "2025-02-20",
            lastUpdated: "2025-02-20 11:40",
            lastMeasured: "20°C",
            averageValue: "25°C",
            selectedDate: "2025-02-10",
            selectedValue: "22°C",
        },
        Lighting: {
            showingDataFrom: "2025-02-20",
            lastUpdated: "2025-02-20 11:40",
            lastMeasured: "650 W/m2",
            averageValue: "620 W/m2",
            selectedDate: "2025-02-10",
            selectedValue: "21%",
        },
    };

    const { showingDataFrom, lastUpdated, lastMeasured, averageValue, selectedDate, selectedValue } =
        infoMap[activeChart];

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <button onClick={handleStatisticsClick} className="p-2 rounded-full hover:bg-gray-200">
                    <ArrowLeft className="w-6 h-6" />
                </button>

                <h1 className="text-2xl font-semibold">Statistics</h1>
                <button className="p-2 rounded-full hover:bg-gray-200">
                    <Download className="w-6 h-6" />
                </button>
            </div>

            {/* Tabs (3 nút) */}
            <div className="flex space-x-2 mb-4 justify-center">
                {["Moisture", "Temperature", "Lighting"].map((chart) => (
                    <button
                        key={chart}
                        onClick={() => setActiveChart(chart)}
                        className={`px-4 py-2 rounded ${activeChart === chart ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                            }`}
                    >
                        {chart}
                    </button>
                ))}
            </div>

            {/* Chart Title */}
            <h2 className="text-xl font-semibold text-center mb-2">{activeChart}</h2>

            {/* Biểu đồ */}
            <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="md:flex-1 h-[300px]">
                    {activeChart === "Moisture" && (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={moistureData}>
                                <XAxis dataKey="month" stroke="#A0A0A0" />
                                <YAxis domain={[0, 100]} stroke="#A0A0A0" />
                                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#66C2FF"
                                    strokeWidth={3}
                                    dot={({ cx, cy, payload }) => (
                                        <Dot
                                            cx={cx}
                                            cy={cy}
                                            r={payload.value === 80 ? 6 : 4}
                                            fill={payload.value === 80 ? "red" : "#66C2FF"}
                                        />
                                    )}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}

                    {activeChart === "Temperature" && (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={temperatureData}>
                                <XAxis dataKey="month" stroke="#A0A0A0" />
                                <YAxis domain={[200, 1000]} stroke="#A0A0A0" />
                                <Tooltip cursor={{ fill: "rgba(200,200,200,0.2)" }} />
                                <Bar dataKey="value" fill="#F97316">
                                    {temperatureData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill="#F97316" />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )}

                    {activeChart === "Lighting" && (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={lightingData}>
                                <XAxis dataKey="day" stroke="#A0A0A0" />
                                <YAxis domain={[0, 5000]} stroke="#A0A0A0" />
                                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#A020F0"
                                    strokeWidth={3}
                                    dot={({ cx, cy, payload }) => (
                                        <Dot
                                            cx={cx}
                                            cy={cy}
                                            r={payload.value === 4800 ? 6 : 4}
                                            fill={payload.value === 4800 ? "red" : "#A020F0"}
                                        />
                                    )}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Thông tin bên phải */}
                <div className="mt-4 md:mt-0 md:w-64 p-4 border rounded-lg bg-gray-50">
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
        </div>
    );
}
