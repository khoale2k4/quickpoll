import React, {useState, useEffect} from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Setup = () => {

    const [farmData, setFarmData] = useState({
        farm_name: "",
        size: "",
        crop: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFarmData({ ...farmData, [e.target.name]: e.target.value });
    };

    const handleIconClick = () => {
        navigate("/register"); 
      };

    const handleSubmit = async (e) => {
        navigate("/register/intergration");
    }

    return (
        <div className="h-screen items-center justify-center">
            <div className="flex items-center gap-8 top-6 left-6 px-8 py-8 ">
                <FaArrowLeft className="text-3xl cursor-pointer" onClick={handleIconClick} />
                <h1 className="text-3xl font-semibold">Set up your farm</h1>
            </div>

            <div className="flex gap-10 justify-center">
                <div className="h-2 w-16 rounded-full bg-green-500"></div>
                <div className="h-2 w-16 rounded-full bg-gray-300"></div>
            </div>

            <div className="flex-1 flex items-center justify-center mt-10">
                <div className="w-1/2 space-y-6">
                    {/* 1) Farm Name */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">
                        Farm Name
                        </label>
                        <input
                        type="text"
                        name="farm_name"
                        value={farmData.farm_name}
                        placeholder="Ex: Group 72's garden"
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                        />
                    </div>

                    {/* 2) Size (m²) */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">
                        Size (m²)
                        </label>
                        <input
                        type="text"
                        name="farm_size"
                        value={farmData.farm_size}
                        placeholder="Ex: 200"
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                        />
                    </div>

                    {/* 3) Crop Dropdown */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Crop</label>
                        <select
                        name="crop"
                        value={farmData.crop}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        >
                        <option value="">Select a crop</option>
                        <option value="rice">Rice</option>
                        <option value="corn">Corn</option>
                        <option value="wheat">Wheat</option>
                        </select>
                    </div>

                    <button
                        className="w-full font-bold bg-green-700 text-white p-2 rounded hover:bg-green-800"
                        onClick={handleSubmit}
                    >
                        Continue
                    </button>
                </div>
            </div>

            
        </div>
    );
};

export default Setup;