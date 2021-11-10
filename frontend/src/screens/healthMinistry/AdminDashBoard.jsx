import React, { useState, useEffect } from 'react'
import axios from 'axios';
import FigureOne from '../../components/healthMinistryComponents/FigureOne'
import FigureTwo from '../../components/healthMinistryComponents/FigureTwo'
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
import HorizontalBarChart from '../../components/HorizontalBarChart'
import { Card } from 'react-bootstrap'

const Dashboard = () => {

    const [figureOne, setFigureOne] = useState('')
    const [figureTwo, setFigureTwo] = useState('')
    const [chart, setChart] = useState('')
    const [district, setDistrict] = useState([])
   // console.log(district)
    const [districtValues, setDistrictValues] = useState([])
    //console.log(districtValues)


    const hospitals = [ 'National Hospital of Sri Lanka', 'Lady Ridgeway Hospital for Children',
                        'Castle Street Hospital for Women', 'Base Hospital Mulleriyawa',
                        'North Colombo Teaching Hospital','District General Hospital Negombo',
                        'District General Hospital Gampaha','National Hospital Kandy',
                        'Teaching Hospital Karapitiya','District General Hospital Hambantota']
    ///const districts = ['Colombo','Gampaha','Kalutara','Galle','Kandy','Matara','Kurunegala','Jaffna','Anuradhapura','Puttalam']

    useEffect(() => {

        const fetchOverall = async () => {
            const response = await axios.request({
                url: 'http://localhost:8000/api/v1/dashboard/publicdashboard',
                method: 'get',
                data: {},
            });

            const response2 = await axios.request({
                url: 'http://localhost:8000/api/v1/dashboard/1',
                method: 'get',
                data: {},
            });


            if (response){
                const {dashboard, history, hospital} = response.data.data;

                const {totalActiveCases, totalDeaths, totalRecovered} = dashboard
                const valueSet_1 = {
                    totalActiveCases:totalActiveCases,
                    totalDeaths:totalDeaths,
                    totalRecovered : totalRecovered
                }
                setFigureOne(valueSet_1)

                const {nohospital, totalBeds, freeBeds, admittedPatients} = hospital
                const valueSet_2 = {
                    nohospital:nohospital,
                    totalBeds:totalBeds,
                    freeBeds : freeBeds
                }
                setFigureTwo(valueSet_2)
                
                const valueSet_4 = {
                    firstValue:admittedPatients,
                    secondValue : freeBeds
                }
                setChart(valueSet_4)

              //  console.log(dashboard)
               // const {districtTotals} = data.total
                setDistrict(Object.keys(dashboard['districtTotals']))
                setDistrictValues(Object.values(dashboard['districtTotals']))
               // setCases(Object.values(data2['timeline']['cases']))
                //console.log(districtTotals)
            }
        }

        fetchOverall()

     },[])

    return (
        <div>
            <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
                    <div className="vs-col vs-xs- vs-sm-12 vs-lg-3"style={{margin:'0%',width:'100%', position:'relative'}}>
                         <div className="set-animation from-left animate">
                            <Card className='m-2 con-vs-card text-center'>
                                <FigureOne values={figureOne}></FigureOne>
                            </Card>
                         </div>

                     </div>

                    <Card className="vs-col vs-xs vs-sm-12 vs-lg-6 mt-2 mb-2" style={{margin:'0%',width:'100%'}}>
                         <div>
                             <h3 style={{textAlign:'center', margin:'2%'}}>Total vs Active Cases (SL)</h3>
                         </div>
                         <div style={{position:'relative' ,margin:'2%'}}>
                            <PieChart values={chart}/>
                         </div> 
                    </Card>
        
                     <div className="vs-col vs-xs- vs-sm-12 vs-lg-3" style={{margin:'0%',width:'100%', position:'relative'}}>
                        <div className="set-animation from-left animate">
                            <Card className='m-2 con-vs-card text-center'>
                                <FigureTwo values={figureTwo}></FigureTwo>
                            </Card>
                         </div>
                     </div>
            </div>

            <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
                <div className="vs-col vs-xs vs-sm-12 vs-lg-6" style={{marginLeft:'0%',marginRight:'0%',width:'100%'}}>
                    <Card className='m-2'>
                        <div style={{position:'relative' ,margin:'2%'}}>
                        <h3 style={{textAlign:'center', margin:'2%'}}>Most Covid Patient Admitted Hospitals</h3>
                        </div>
                        <div style={{position:'relative' ,margin:'2%'}}>
                            <HorizontalBarChart keys={hospitals} values={districtValues}></HorizontalBarChart>
                        </div>
                    </Card>
                </div>


                <div className="vs-col vs-xs vs-sm-12 vs-lg-6" style={{marginLeft:'0%',marginRight:'0%',width:'100%'}}>
                    <Card className='m-2'>
                        <div style={{position:'relative' ,margin:'2%'}}>
                        <h3 style={{textAlign:'center', margin:'2%'}}>Most Covid Patient Recorded Districts</h3>
                        </div>
                        <div style={{position:'relative' ,margin:'2%'}}>
                            <HorizontalBarChart keys={district} values={districtValues}></HorizontalBarChart>
                        </div>
                    </Card>
                </div>
            </div>

         </div>
    )
}

export default Dashboard
