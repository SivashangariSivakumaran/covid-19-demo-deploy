import React from 'react'
import ReactApexChart from "react-apexcharts";
import Loader from '../components/Loader'


function HorizontalBarGraph({keys, values}) {
  const districts = getTopTen(keys);
  const positiveCases = getTopTen(values)
 // console.log(districts)
   // const config = {
      const series = [{
         //data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
         data: positiveCases,
       }];
       const options= {
           plotOptions:{
               bar:{
                   horizontal:true,
                   dataLabels:{
                       enabled:true
                   },
               }
           },
           xaxis: {
            // categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
            //   'United States', 'China', 'Germany']
            categories : districts,
        }
       }
        
  //   } 

  return (
    <>
    {!districts && !positiveCases &&  (<Loader></Loader>)}
    <div
      style={{
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
      <br />
      <ReactApexChart 
        options={options} 
        series={series} 
        type="bar" 
      />
    </div>
    </>
  );
}

export default HorizontalBarGraph;

function getTopTen(list){
  if(list){
    return list.slice(0,10)
  }
  return 
}
