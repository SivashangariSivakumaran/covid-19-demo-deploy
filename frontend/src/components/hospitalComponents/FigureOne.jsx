import React from 'react'
import { Link } from 'react-router-dom'

const FigureOne = ({values}) => {
    const { overallData, recoveredData, deathData} = values
    return (
        <div>
            <div style={{justifyContent:'center'}}>
                <h4 style={{textAlign:'center',margin:'1%'}}>Hospital Figures</h4>
            </div>
            <div style={{margin:'1%',justifyContent:'center'}}>
                <div className='figures-div' style={{display:'flex'}}>
                    <div>
                        <i className='fa fa-hospital-alt' style={{fontSize:'30px', color:'#6b85de',margin:'20px'}}></i>
                        {/* <Link to={{ pathname :"/hospital/patients" ,  category : "All" }}>
                            <i className='fa fa-hospital-alt' style={{fontSize:'30px', color:'#6b85de',margin:'20px'}}></i>
                        </Link> */}
                    </div>
                    <div>
                        <h3 style={{fontSize:'14px'}}>Total Covid Patient</h3>
                        {/* <Link to={{ pathname :"/hospital/patients" ,  category : "All" }}>
                            <h3 style={{fontSize:'14px', color:'#444444'}}>Total Covid Patient</h3>
                        </Link> */}
                        <h1 style={{color:'#6b85de', float:'left'}}>{formatNumber(overallData)}</h1>
                    </div>
                </div>
                <div className='figures-div' style={{display:'flex'}}>
                    <div>
                        <i className='fa fa-bed' style={{fontSize:'30px', color:'#ff8c84',margin:'20px'}}></i>
                        {/* <Link to={{ pathname :"/hospital/patients" ,  category : "Deaths" }}>
                            <i className='fa fa-bed' style={{fontSize:'30px', color:'#ff8c84',margin:'20px'}}></i> 
                        </Link> */}
                    </div>
                    <div>
                        {/* <Link to={{ pathname :"/hospital/patients" ,  category : "Deaths" }}> */}
                            <h3 style={{fontSize:'14px', color:'#444444'}}>Deaths</h3>
                        {/* </Link> */}
                        <h1 style={{color:'#ff8c84', float:'left'}}>{formatNumber(deathData)}</h1>
                    </div>
                </div>
                <div className='figures-div' style={{display:'flex'}}>
                    <div>
                        {/* <Link to={{ pathname :"/hospital/patients" ,  category : "Recovered" }}> */}
                            <i className='fa fa-running' style={{fontSize:'40px', color:'#7dca53',margin:'20px'}}></i>
                        {/* </Link> */}
                    </div>
                    <div>
                        {/* <Link to={{ pathname :"/hospital/patients" ,  category : "Recovered" }}> */}
                            <h3 style={{fontSize:'14px', color:'#444444'}}>Recovered</h3>
                        {/* </Link> */}
                        <h1 style={{color:'#7dca53', float:'left'}}>{formatNumber(recoveredData)}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FigureOne

export const formatNumber = inputNumber => {
    let formetedNumber=(Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let splitArray=formetedNumber.split('.');
    if(splitArray.length>1){
      formetedNumber=splitArray[0];
    }
    return(formetedNumber);
  };