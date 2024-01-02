import React from "react";
import { Line } from "react-chartjs-2";

const RevenueChart = () => {
  const data = {
    labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
    datasets: [
      {
        label: "My Area Dataset",
        data: [300, 400, 500, 200, 600],
        fill: true, // Enable filling under the line
        backgroundColor: "rgba(75,192,192,1)", // Area fill color
        borderColor: "rgba(2, 158, 95,1)",
        borderWidth: 1,
        pointRadius: 3, // Set point radius to 0 to hide points
        tension: 0.3,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
  <Line data={data} options={options} />
  );
};

export default RevenueChart;
