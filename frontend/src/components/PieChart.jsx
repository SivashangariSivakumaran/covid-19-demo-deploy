import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import ReactApexChart from "react-apexcharts";

const PieChart = ({values}) => {
  console.log(values)
  const firstValue = 50;
  const secondValue = 50;
 // const { firstValue, secondValue} = values
    const series = [firstValue,secondValue];
    const options = {
        labels: ['Total Beds Assign','Free Beds'],
        colors: ['#226EFC','#7dca53'],
        legend: {
            position: 'bottom',
        }
    };

    return (
      <>
        {firstValue  && secondValue ? 
        <div
          style={{
            backgroundColor: "white",
            position:'bottom'
          }}
        >
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            height={390}
          />
        </div> : "No data"}
      </>
    );
  }
  
  export default PieChart;
  