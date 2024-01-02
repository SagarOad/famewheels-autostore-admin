import React from 'react'
import { Bar } from 'react-chartjs-2';
import "chart.js/auto";
const CustomerChart = () => {

    const data = {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [300, 400, 500],
            backgroundColor: [
              'rgba(200, 10, 10, 1)',
            ],
 },
        ],
      };



      const options:any = {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top', // Change the legend position
          },
          title: {
            display: true,
            text: 'Customized Bar Chart', // Add a title to the chart
          },
        },
      };

  return (
    <div>
        
        <Bar data={data} options={options}/>
    </div>
  )
}

export default CustomerChart