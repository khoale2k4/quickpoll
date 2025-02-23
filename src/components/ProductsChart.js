import React from "react";
import { Doughnut } from "react-chartjs-2";

const ProductsChart = () => {
  const data = {
    labels: ["Basic Tees", "Custom Short Pants", "Super Hoodies"],
    datasets: [
      {
        data: [55, 31, 14],
        backgroundColor: ["#28a745", "#f39c12", "#e74c3c"],
      },
    ],
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Top Products</h3>
      <Doughnut data={data} />
    </div>
  );
};

export default ProductsChart;
