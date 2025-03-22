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
import { useEffect } from "react";
import axios from "axios";
import CustomDot from "../components/CustomDot";

export default function DashboardStatistics() {
    const [activeChart, setActiveChart] = useState("Moisture");
    const [curData, setCurData] = useState([]);
    const [infoMap, setInfoMap] = useState({
        showingDataFrom: "2025-02-20",
        lastUpdated: "2025-02-20 11:40",
        lastMeasured: "20%",
        averageValue: "30%",
        selectedDate: "Tue Jan 21 2025 07:00:00 GMT+0700 (Giờ Đông Dương)",
        selectedValue: "21%",
    });

    const navigate = useNavigate();

    const handleStatisticsClick = () => {
        navigate("/dashboard");
    }

    const constructData = (data) => {
        console.log(data);
        if (!data || data.length === 0) {
            return {
                transformedData: [],
                minDate: null,
                maxDate: null,
                averageValue: null,
                mostRecentValue: null,
            };
        }

        const transformedData = data
            .map((record) => {
                if (record.recordTime === null) {
                    record.recordTime = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString();
                }
                const date = new Date(record.recordTime);
                if(!record) return {};
                return {
                    date,
                    day: date.getDate(),
                    value: record.recordValue,
                };
            })
            .sort((a, b) => a.date - b.date);

        const minDate = transformedData[0].date;
        const maxDate = transformedData[transformedData.length - 1].date;
        const total = transformedData.reduce((sum, record) => sum + record.value, 0);
        const averageValue = total / transformedData.length;
        const mostRecentValue = transformedData[transformedData.length - 1].value;

        return {
            transformedData,
            minDate,
            maxDate,
            averageValue,
            mostRecentValue,
        };
    };

    useEffect(() => {
        const fetchMoistureData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_HOST}/api/records/moisture/1`);
                const data = constructData(response.data);
                console.log(data);
                setCurData(data.transformedData);
                setInfoMap({
                    showingDataFrom: data.minDate,
                    lastUpdated: data.maxDate,
                    averageValue: data.averageValue,
                    lastMeasured: data.mostRecentValue,
                    selectedDate: infoMap.selectedDate,
                    selectedValue: infoMap.selectedValue
                },)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const fetchTemperaturData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_HOST}/api/records/temperature/1`);
                const data = constructData(response.data);
                setCurData(data.transformedData);
                setInfoMap({
                    showingDataFrom: data.minDate,
                    lastUpdated: data.maxDate,
                    averageValue: data.averageValue,
                    lastMeasured: data.mostRecentValue,
                    selectedDate: infoMap.selectedDate,
                    selectedValue: infoMap.selectedValue
                },)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const fetchLightningData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_HOST}/api/records/light/1`);
                const data = constructData(response.data);
                setCurData(data.transformedData);
                setInfoMap({
                    showingDataFrom: data.minDate,
                    lastUpdated: data.maxDate,
                    averageValue: data.averageValue,
                    lastMeasured: data.mostRecentValue,
                    selectedDate: infoMap.selectedDate,
                    selectedValue: infoMap.selectedValue
                },)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (activeChart === "Moisture") fetchMoistureData();
        else if (activeChart === "Temperature") fetchTemperaturData();
        else fetchLightningData();
    }, [activeChart]);

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

            <h2 className="text-xl font-semibold text-center mb-2">{activeChart}</h2>

            <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="md:flex-1 h-[300px]">
                    {activeChart === "Moisture" && (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={curData}>
                                <XAxis dataKey="day" stroke="#A0A0A0" />
                                <YAxis domain={[0, 100]} stroke="#A0A0A0" />
                                {/* <Tooltip cursor={{ strokeDasharray: "3 3", pointerEvents: "none" }} /> */}
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#66C2FF"
                                    strokeWidth={3}
                                    dot={(dotProps) => (
                                        <CustomDot
                                            key={`dot-${dotProps.index}`}
                                            {...dotProps}
                                            selectedDate={infoMap.selectedDate}
                                            onClick={(payload) =>
                                                setInfoMap((prev) => ({
                                                    ...prev,
                                                    selectedValue: payload.value,
                                                    selectedDate: payload.date,
                                                }))
                                            }
                                        />
                                    )}
                                />
                            </LineChart>

                        </ResponsiveContainer>
                    )}

                    {activeChart === "Temperature" && (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={curData}>
                                <XAxis dataKey="day" stroke="#A0A0A0" />
                                <YAxis domain={[0, 100]} stroke="#A0A0A0" />
                                <Tooltip cursor={{ fill: "rgba(200,200,200,0.2)" }} />
                                <Bar dataKey="value" fill="#F97316">
                                    {curData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill="#F97316" />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )}

                    {activeChart === "Lighting" && (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={curData}>
                                <XAxis dataKey="day" stroke="#A0A0A0" />
                                <YAxis domain={[250, 2000]} stroke="#A0A0A0" />
                                {/* <Tooltip cursor={{ strokeDasharray: "3 3" }} /> */}
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#A020F0"
                                    strokeWidth={3}
                                    dot={(dotProps) => (
                                        <CustomDot
                                            key={`dot-${dotProps.index}`}
                                            {...dotProps}
                                            selectedDate={infoMap.selectedDate}
                                            onClick={(payload) =>
                                                setInfoMap((prev) => ({
                                                    ...prev,
                                                    selectedValue: payload.value,
                                                    selectedDate: payload.date,
                                                }))
                                            }
                                        />
                                    )}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>

                <div className="mt-4 md:mt-0 md:w-64 p-4 border rounded-lg bg-gray-50">
                    <p>
                        Showing data from <strong>{new Date(infoMap.showingDataFrom).toLocaleDateString("vi-VN")}</strong>
                    </p>
                    <p>
                        Last updated: <strong>{new Date(infoMap.lastUpdated).toLocaleDateString("vi-VN")}</strong>
                    </p>
                    <hr className="my-2" />
                    <p>
                        Last measured: <strong>{infoMap.lastMeasured}</strong>
                    </p>
                    {infoMap && <p>
                        Average value: <strong>{Number(infoMap.averageValue).toFixed(2)}</strong>
                    </p>}
                    <hr className="my-2" />
                    <p>
                        Selected date: <strong>{new Date(infoMap.selectedDate).toLocaleDateString("vi-VN")}</strong>
                    </p>
                    <p>
                        Selected value: <strong>{infoMap.selectedValue}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}
