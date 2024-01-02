import React from 'react'
import { Doughnut } from "react-chartjs-2";

const BotoomPieChart = () => {
    const data = {
        labels: ["Label 1", "Label 2", "Label 3"],
        datasets: [
          {
            label: "My Area Dataset",
            data: [300, 400, 500,],
            fill: true, // Enable filling under the line
            backgroundColor: ["rgba(132, 0, 255,1)","rgba(0, 60, 255,1)","rgba(0, 255, 213,1)"], // Area fill color
            borderWidth: 0,
            pointRadius: 3, // Set point radius to 0 to hide points
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
    <Doughnut data={data} options={options} />
  )
}

export default BotoomPieChart