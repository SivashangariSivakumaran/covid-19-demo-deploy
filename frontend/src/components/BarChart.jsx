import React from 'react'
import ReactApexChart from "react-apexcharts";


function BarGraph({myProp1, myProp2,myProp3}) {
  const series = [
    {
      name: "Patient Admitt",
      data: [555,
        12038,
        69030,
        88369,
        167466,
        932638,
        2055423,
        3343777,
        3845718,]
    },
    {
      name: "Recovered",
      data: [28, 284, 9394, 42710, 76026, 191853, 501538, 1029651, 1255481]
    },
  ];
  const options = {
    dataLabels: {
      enabled: false,
    },
    colors: ['#226EFC','#7dca53'],
    
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [ "1/22/20",
      "2/1/20",
      "2/15/20",
      "3/1/20",
      "3/15/20",
      "4/1/20",
      "4/15/20",
      "5/1/20",
      "5/7/20"],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
      {/* <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={370}
      /> */}
      <br />
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
}

export default BarGraph;
