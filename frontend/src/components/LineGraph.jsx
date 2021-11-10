import React from 'react'
import ReactApexChart from "react-apexcharts";


function LineGraph({myProp1, myProp2, myProp3, myProp4}) {
  const series = [
    {
      name: "Cases",
       data: myProp2,
    },
    {
      name: "Recovered",
      data: myProp4,
    },
    {
      name: "Deaths",
      data: myProp3,
    },
  ];
  const options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: myProp1,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
    colors: ['#226EFC','#7dca53','#ff8c84'],
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={370}
      />
      {/* <br />
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      /> */}
    </div>
  );
}

export default LineGraph;

