import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const ActivityChart = () => {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Guest",
        data: [400, 300, 200, 400],
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
      {
        label: "User",
        data: [300, 400, 100, 300],
        backgroundColor: "rgba(75, 192, 192, 0.7)",
      },
    ],
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Activities</h3>
      <Bar data={data} />
    </div>
  );
};

export default ActivityChart;
