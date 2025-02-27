import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Intergration = () => {

    const [IntergrationData, setIntergrationData] = useState({
        soil_sensor: false,
        weather_api: false,
        predictive_analytic: false
    });

    const handleChange = (e) => {
        setIntergrationData({ ...IntergrationData, [e.target.name]: e.target.value });
    };

    const handleIconClick = () => {
        navigate("/register/setup"); 
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        alert("Clicking submit");
    }

    return (
        <div className="h-screen flex flex-col">
            <div className="flex items-center gap-8 top-6 left-6 px-8 py-8 ">
                <FaArrowLeft className="text-3xl cursor-pointer" onClick={handleIconClick} />
                <h1 className="text-3xl font-semibold">Intergrations</h1>
            </div>

            <div className="flex gap-10 justify-center">
                <div className="h-2 w-16 rounded-full bg-green-500"></div>
                <div className="h-2 w-16 rounded-full bg-green-500"></div>
            </div>

            <div className="max-w-2xl mx-auto p-6 space-y-8 mt-8">
                {/* 1) Soil sensors */}
                <div className="flex items-start justify-between">
                    <div className="pr-4 ">
                        <h2 className="text-lg font-semibold">Soil sensors</h2>
                        <p className="text-gray-600 opacity-70">
                            AI soil sensors and analysis tools offer precise details on soil
                            health factors like moisture, nutrients, pH, and compaction.
                        </p>
                    </div>

                    {/* Toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div
                        className="
                        w-11 h-6 
                        bg-gray-200 
                        rounded-full
                        peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 
                        after:border 
                        after:rounded-full 
                        after:h-5 
                        after:w-5 
                        after:transition-all
                        "
                    ></div>
                    </label>
                </div>

                {/* 2) Weather APIs */}
                <div className="flex items-start justify-between">
                    <div className="pr-4">
                    <h2 className="text-lg font-semibold">Weather APIs</h2>
                    <p className="text-gray-600 opacity-70">
                        Integration with weather APIs allows the app to access real-time
                        weather data and forecasts.
                    </p>
                    </div>

                    {/* Toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div
                        className="
                        w-11 h-6 
                        bg-gray-200 
                        rounded-full
                        peer-checked:bg-green-500
                        peer-checked:after:translate-x-full
                        peer-checked:after:border-white 
                        after:content-[''] 
                        after:absolute 
                        after:top-0.5 
                        after:left-[2px] 
                        after:bg-white 
                        after:border-gray-300 
                        after:border 
                        after:rounded-full 
                        after:h-5 
                        after:w-5 
                        after:transition-all
                        "
                    ></div>
                    </label>
                </div>

                {/* 3) Predictive Analytics for Yield Optimization */}
                <div className="flex items-start justify-between">
                    <div className="pr-4">
                    <h2 className="text-lg font-semibold">
                        Predictive Analytics for Yield Optimization
                    </h2>
                    <p className="text-gray-600 opacity-70">
                        AI algorithms use past farm data like crop yields, weather, soil
                        conditions, and farming methods to predict future yields and improve
                        farming plans.
                    </p>
                    </div>

                    {/* Toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div
                        className="
                        w-11 h-6 
                        bg-gray-200 
                        rounded-full
                        peer-checked:bg-green-500
                        peer-checked:after:translate-x-full
                        peer-checked:after:border-white 
                        after:content-[''] 
                        after:absolute 
                        after:top-0.5 
                        after:left-[2px] 
                        after:bg-white 
                        after:border-gray-300 
                        after:border 
                        after:rounded-full 
                        after:h-5 
                        after:w-5 
                        after:transition-all
                        "
                    ></div>
                    </label>
                </div>
            </div>

            <div className="mt-4 flex justify-center">
                <button
                className="w-1/2 font-bold bg-green-700 text-white p-2 rounded hover:bg-green-800"
                onClick={handleSubmit}
                >
                Finish
                </button>
            </div>
            
        </div>
    );
};

export default Intergration;