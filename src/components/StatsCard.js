import React from "react";

const StatsCard = ({ title, value, change }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-xl text-center">
      <h3 className="text-gray-600 text-md">{title}</h3>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-green-500 text-sm font-medium">{change}</p>
    </div>
  );
};

export default StatsCard;
