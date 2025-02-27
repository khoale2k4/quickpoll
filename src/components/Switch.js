import React from "react";

const Switch = ({ checked, onCheckedChange }) => {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input 
                type="checkbox" 
                checked={checked} 
                onChange={(e) => onCheckedChange(e.target.checked)} 
                className="sr-only peer"
            />
            <div className="w-10 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer-checked:bg-blue-500 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform"></div>
        </label>
    );
};

export default Switch;
