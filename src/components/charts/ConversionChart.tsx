import React from 'react'
import { Line } from 'react-chartjs-2';

const ConversionChart = () => {

    const data = {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [
          {
            label: 'My Area Dataset',
            data: [200, 150, 400, 200, 80],
            fill: true, // Enable filling under the line
            backgroundColor: 'orange', // Area fill color
            borderColor:"rgba(201, 131, 2,1)",
            borderWidth:2,
            pointRadius: 3, // Set point radius to 0 to hide points
tension:0.3
          },
        ],
      };




  return (
    <Line data={data}/>
  )
}

export default ConversionChart