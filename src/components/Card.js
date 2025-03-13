import { Settings } from "lucide-react";

const Card = ({ title, value, unit, description, mode, bgColor, icon, onSettingsClick }) => {
    const available = !(value === -1);
    return (
        <div className={`relative p-4 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-center ${available?bgColor:"bg-gray-400"} text-white transition-transform hover:scale-105 `}>
            <Settings
                className="absolute top-2 right-2 text-white cursor-pointer"
                onClick={available?onSettingsClick:null}
            />

            <div className="flex-1 text-center md:text-left ">
                <h3 className="text-lg font-semibold flex items-center justify-center md:justify-start ">{icon} {title}</h3>
                <p className="text-4xl font-bold">
                    {available?value:"No data"} <span className="text-xl">{available ?unit:""}</span>
                </p>
                <p className="text-sm opacity-80">{available?description:"No data"}</p>
            </div>
            <div className="text-lg font-semibold mt-2 pr-10 md:mt-0 ">{mode}</div>
        </div>
    )
};

export default Card;