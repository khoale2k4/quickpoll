import { Bell, BarChart, User, Settings } from "lucide-react";

const Card = ({ title, value, unit, description, mode, bgColor, icon, onSettingsClick }) => (
    <div className={`p-4 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-center ${bgColor} text-white transition-transform hover:scale-105`}>
        <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-semibold flex items-center justify-center md:justify-start">{icon} {title}</h3>
            <p className="text-4xl font-bold">
                {value} <span className="text-xl">{unit}</span>
            </p>
            <p className="text-sm opacity-80">{description}</p>
        </div>
        <div className="text-lg font-semibold mt-2 md:mt-0">{mode}</div>
        <Settings className="text-white opacity-80 cursor-pointer" onClick={onSettingsClick}  />
    </div>
);

export default Card;