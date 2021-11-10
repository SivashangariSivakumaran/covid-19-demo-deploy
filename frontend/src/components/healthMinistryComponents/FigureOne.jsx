import React from 'react'

const FigureOne = ({values}) => {
    const {totalActiveCases, totalDeaths, totalRecovered } = values
    return (
        <div>
            <div style={{justifyContent:'center'}}>
                <h4 style={{textAlign:'center',margin:'1%'}}>Total Figures</h4>
            </div>
            <div style={{margin:'1%',justifyContent:'center'}}>
                <div className='figures-div' style={{display:'flex'}}>
                    <div>
                        <i className='fa fa-hospital-alt' style={{fontSize:'30px', color:'#6b85de',margin:'20px'}}></i>
                    </div>
                    <div>
                        <h3 style={{fontSize:'14px'}}>Total Cases</h3>
                        <h1 style={{color:'#6b85de', float:'left'}}>{formatNumber(totalActiveCases)}</h1>
                    </div>
                </div>
                <div className='figures-div' style={{display:'flex'}}>
                    <div>
                        <i className='fa fa-bed' style={{fontSize:'30px', color:'#ff8c84',margin:'20px'}}></i>
                    </div>
                    <div>
                        <h3 style={{fontSize:'14px'}}>Deaths</h3>
                        <h1 style={{color:'#ff8c84', float:'left'}}>{formatNumber(totalDeaths)}</h1>
                    </div>
                </div>
                <div className='figures-div' style={{display:'flex'}}>
                    <div>
                        <i className='fa fa-running' style={{fontSize:'40px', color:'#7dca53',margin:'20px'}}></i>
                    </div>
                    <div>
                        <h3 style={{fontSize:'14px'}}>Recovered</h3>
                        <h1 style={{color:'#7dca53', float:'left'}}>{formatNumber(totalRecovered)}</h1>
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