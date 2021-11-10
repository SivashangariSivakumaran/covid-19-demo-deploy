import React from 'react'
import { Link } from 'react-router-dom'

const FigureTwo = ({values}) => {
    const {activeData, staffData, transferedData} = values
    return (
        <div>
            <div style={{justifyContent:'center'}}>
                <h4 style={{textAlign:'center',margin:'1%'}}>Hospital Figures</h4>
            </div>
            <div style={{margin:'1%',justifyContent:'center'}}>
                <div className='figures-div' style={{display:'flex'}}>
                    <div>
                        {/* <Link to={{ pathname :"/hospital/patients" ,  category : "Transffered" }}> */}
                            <i className='fa fa-hospital-alt' style={{fontSize:'30px', color:'#6b85de',margin:'20px'}}></i>
                        {/* </Link> */}
                    </div>
                    <div>
                        {/* <Link to={{ pathname :"/hospital/patients" ,  category : "Transffered" }}> */}
                            <h3 style={{fontSize:'14px', color:'#444444'}}>Transfered Patients</h3>
                        {/* </Link> */}
                        <h1 style={{color:'#6b85de', float:'left'}}>{formatNumber(transferedData)}</h1>   
                    </div>
                </div>
                <div className='figures-div' style={{display:'flex'}}>
                    <div>
                        <i className="fa fa-plus-square" aria-hidden="true" style={{fontSize:'40px', color:'#ff8c84',margin:'20px'}}></i>
                    </div>
                    <div>
                        <h3 style={{fontSize:'14px'}}>Total Staff Members</h3>
                        <h1 style={{color:'#ff8c84', float:'left'}}>{formatNumber(staffData)}</h1>
                    </div>
                </div>
                <div className='figures-div' style={{display:'flex'}}>
                    <div>
                        {/* <Link to={{ pathname :"/hospital/patients" ,  category : "Active" }}> */}
                            <i className='fa fa-procedures' style={{fontSize:'30px', color:'#fdb01a',margin:'20px'}}></i>
                        {/* </Link> */}
                    </div>
                    <div>
                        {/* <Link to={{ pathname :"/hospital/patients" ,  category : "Active" }}> */}
                            <h3 style={{fontSize:'14px', color:'#444444'}}>Receiving Treatment</h3>
                        {/* </Link> */}
                        <h1 style={{color:'#fdb01a', float:'left'}}>{formatNumber(activeData)}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FigureTwo

export const formatNumber = inputNumber => {
    let formetedNumber=(Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let splitArray=formetedNumber.split('.');
    if(splitArray.length>1){
      formetedNumber=splitArray[0];
    }
    return(formetedNumber);
  };