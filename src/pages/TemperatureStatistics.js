import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ArrowLeft, Download } from "lucide-react";

// Dữ liệu mẫu
const data = [
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

export default function TemperatureStatistics() {
    // Lưu trữ cột đang được chọn
    const [selectedData, setSelectedData] = useState(null);

    // Thông tin bên phải (có thể thay bằng props)
    const lastMeasured = "20%";
    const averageValue = "30%";
    const selectedDate = "2025-02-10";
    const selectedValue = "21%";
    const lastUpdated = "2025-02-20 11:40";
    const showingDataFrom = "2025-02-20";

    // Màu mặc định và màu khi hover
    const defaultColor = "#F97316"; // Màu cam
    const highlightColor = "#EF4444"; // Màu đỏ

    // Hàm xử lý khi người dùng click vào cột
    const handleClickBar = (entry) => {
        setSelectedData(entry);
        console.log("Selected bar:", entry);
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
            <h2 className="text-xl font-semibold text-center mb-2">Temperature</h2>

            {/* Biểu đồ cột */}
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={data}
                    onClick={(e) => {
                        if (e && e.activePayload) {
                            handleClickBar(e.activePayload[0].payload);
                        }
                    }}
                >
                    <XAxis dataKey="month" stroke="#A0A0A0" />
                    <YAxis domain={[200, 1000]} stroke="#A0A0A0" />
                    <Tooltip cursor={{ fill: "rgba(200,200,200,0.2)" }} />
                    <Bar dataKey="value" fill={defaultColor}>
                        {data.map((entry, index) => {
                            const isSelected = selectedData && selectedData.month === entry.month;
                            return (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={isSelected ? highlightColor : defaultColor}
                                />
                            );
                        })}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/* Thông tin bên phải (có thể đặt cạnh biểu đồ tùy ý) */}
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
