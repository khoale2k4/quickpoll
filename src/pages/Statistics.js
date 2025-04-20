import { useState, useEffect } from "react";
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
} from "recharts";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DashboardStatistics() {
    const [activeChart, setActiveChart] = useState("Moisture");
    const [timeRange, setTimeRange] = useState("week"); // week, month, year
    const [processedData, setProcessedData] = useState([]);
    const [infoMap, setInfoMap] = useState({
        showingDataFrom: "",
        lastUpdated: "",
        lastMeasured: "",
        averageValue: "",
    });

    const navigate = useNavigate();

    const handleStatisticsClick = () => {
        navigate("/dashboard");
    };

    // Process data based on selected time range
    const processData = (rawData, range) => {
        if (!rawData || rawData.length === 0) return [];

        // Convert and sort data
        const convertedData = rawData
            .map(record => ({
                date: new Date(record.recordTime),
                value: record.recordValue
            }))
            .sort((a, b) => a.date - b.date);

        const now = new Date();
        let filteredData = [];
        let groupedData = [];

        switch (range) {
            case "week":
                // Last 7 days
                const weekAgo = new Date(now);
                weekAgo.setDate(now.getDate() - 7);
                filteredData = convertedData.filter(item => item.date >= weekAgo);
                // Group by day
                groupedData = filteredData.reduce((acc, item) => {
                    const day = item.date.getDate();
                    if (!acc[day]) {
                        acc[day] = {
                            date: item.date,
                            day: `${item.date.getDate()}/${item.date.getMonth() + 1}`,
                            values: []
                        };
                    }
                    acc[day].values.push(item.value);
                    return acc;
                }, {});
                break;

            case "month":
                // Last 30 days
                const monthAgo = new Date(now);
                monthAgo.setDate(now.getDate() - 30);
                filteredData = convertedData.filter(item => item.date >= monthAgo);
                // Group by day
                groupedData = filteredData.reduce((acc, item) => {
                    const day = item.date.getDate();
                    if (!acc[day]) {
                        acc[day] = {
                            date: item.date,
                            day: `${item.date.getDate()}/${item.date.getMonth() + 1}`,
                            values: []
                        };
                    }
                    acc[day].values.push(item.value);
                    return acc;
                }, {});
                break;

            case "year":
                // Last 12 months
                const yearAgo = new Date(now);
                yearAgo.setFullYear(now.getFullYear() - 1);
                filteredData = convertedData.filter(item => item.date >= yearAgo);
                // Group by month and calculate average
                groupedData = filteredData.reduce((acc, item) => {
                    const month = item.date.getMonth();
                    const year = item.date.getFullYear();
                    const key = `${year}-${month}`;
                    
                    if (!acc[key]) {
                        acc[key] = {
                            date: item.date,
                            month: `${month + 1}/${year}`,
                            values: []
                        };
                    }
                    acc[key].values.push(item.value);
                    return acc;
                }, {});
                break;

            default:
                filteredData = convertedData;
        }

        // Calculate averages for grouped data
        const result = Object.values(groupedData).map(group => ({
            ...group,
            value: group.values.reduce((sum, val) => sum + val, 0) / group.values.length
        }));

        // Update info map
        if (result.length > 0) {
            const minDate = result[0].date;
            const maxDate = result[result.length - 1].date;
            const total = result.reduce((sum, item) => sum + item.value, 0);
            const average = total / result.length;
            const lastValue = result[result.length - 1].value;

            setInfoMap({
                showingDataFrom: minDate,
                lastUpdated: maxDate,
                lastMeasured: `${lastValue.toFixed(1)}${getUnit(activeChart)}`,
                averageValue: average.toFixed(1),
            });
        }

        return result;
    };

    const fetchData = async () => {
        try {
            let endpoint = "";
            switch (activeChart) {
                case "Moisture":
                    endpoint = "moisture";
                    break;
                case "Temperature":
                    endpoint = "temperature";
                    break;
                case "Lighting":
                    endpoint = "light";
                    break;
                case "Humidity":
                    endpoint = "humidity";
                    break;
                case "AmountOfWater":
                    endpoint = "amountofwater";
                    break;
                default:
                    endpoint = "moisture";
            }

            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/records/${endpoint}/1`);
            const processed = processData(response.data, timeRange);
            setProcessedData(processed);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeChart, timeRange]);

    const getYAxisDomain = () => {
        switch (activeChart) {
            case "Moisture":
                return [0, 100];
            case "Temperature":
                return [0, 50]; // Adjusted for more realistic temperature range
            case "Lighting":
                return [250, 2000];
            case "Humidity":
                return [0, 100];
            case "AmountOfWater":
                return [0, 5000]; // Assuming ml as unit
            default:
                return [0, 100];
        }
    };

    const getUnit = (chartType) => {
        switch (chartType) {
            case "Moisture":
                return "%";
            case "Temperature":
                return "°C";
            case "Lighting":
                return "lux";
            case "Humidity":
                return "%";
            case "AmountOfWater":
                return "ml";
            default:
                return "";
        }
    };

    const getChartColor = () => {
        switch (activeChart) {
            case "Moisture":
                return "#66C2FF";
            case "Temperature":
                return "#F97316";
            case "Lighting":
                return "#A020F0";
            case "Humidity":
                return "#4ADE80";
            case "AmountOfWater":
                return "#3B82F6";
            default:
                return "#66C2FF";
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <button onClick={handleStatisticsClick} className="p-2 rounded-full hover:bg-gray-200">
                    <ArrowLeft className="w-6 h-6" />
                </button>

                <h1 className="text-2xl font-semibold">Statistics</h1>
                <button className="p-2 rounded-full hover:bg-gray-200">
                    <Download className="w-6 h-6" />
                </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {["Moisture", "Temperature", "Lighting", "Humidity", "AmountOfWater"].map((chart) => (
                    <button
                        key={chart}
                        onClick={() => setActiveChart(chart)}
                        className={`px-4 py-2 rounded ${activeChart === chart ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                            }`}
                    >
                        {chart === "AmountOfWater" ? "Water Amount" : chart}
                    </button>
                ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {["week", "month", "year"].map((range) => (
                    <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-4 py-2 rounded ${timeRange === range ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                            }`}
                    >
                        {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                ))}
            </div>

            <h2 className="text-xl font-semibold text-center mb-2">
                {activeChart === "AmountOfWater" ? "Water Amount" : activeChart} ({timeRange}ly view)
            </h2>

            <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="md:flex-1 h-[300px]">
                    {activeChart === "Temperature" || activeChart === "AmountOfWater" ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={processedData}>
                                <XAxis dataKey={timeRange === "year" ? "month" : "day"} stroke="#A0A0A0" />
                                <YAxis domain={getYAxisDomain()} stroke="#A0A0A0" />
                                <Tooltip 
                                    formatter={(value) => [`${value} ${getUnit(activeChart)}`, activeChart === "AmountOfWater" ? "Water Amount" : activeChart]}
                                    labelFormatter={(label) => `Date: ${label}`}
                                />
                                <Bar dataKey="value" fill={getChartColor()}>
                                    {processedData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={getChartColor()} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={processedData}>
                                <XAxis dataKey={timeRange === "year" ? "month" : "day"} stroke="#A0A0A0" />
                                <YAxis domain={getYAxisDomain()} stroke="#A0A0A0" />
                                <Tooltip 
                                    formatter={(value) => [`${value} ${getUnit(activeChart)}`, activeChart === "AmountOfWater" ? "Water Amount" : activeChart]}
                                    labelFormatter={(label) => `Date: ${label}`}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke={getChartColor()}
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>

                <div className="mt-4 md:mt-0 md:w-64 p-4 border rounded-lg bg-gray-50">
                    <p>
                        Showing data from <strong>
                            {infoMap.showingDataFrom ? new Date(infoMap.showingDataFrom).toLocaleDateString("vi-VN") : "N/A"}
                        </strong>
                    </p>
                    <p>
                        Last updated: <strong>
                            {infoMap.lastUpdated ? new Date(infoMap.lastUpdated).toLocaleDateString("vi-VN") : "N/A"}
                        </strong>
                    </p>
                    <hr className="my-2" />
                    <p>
                        Last measured: <strong>{infoMap.lastMeasured || "N/A"}</strong>
                    </p>
                    <p>
                        Average value: <strong>
                            {infoMap.averageValue ? `${infoMap.averageValue}${getUnit(activeChart)}` : "N/A"}
                        </strong>
                    </p>
                </div>
            </div>
        </div>
    );
}