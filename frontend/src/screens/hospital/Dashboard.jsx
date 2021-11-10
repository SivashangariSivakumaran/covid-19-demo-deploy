import React, {useEffect, useState, Component} from 'react'
import axios from 'axios';
import FigureOne from '../../components/hospitalComponents/FigureOne'
import FigureTwo from '../../components/hospitalComponents/FigureTwo'
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
    const dispatch = useDispatch()

    //const {patients} = useSelector(getAllPatients);
    const [figureOne, setFigureOne] = useState('')
    const [figureTwo, setFigureTwo] = useState('')
    // const [active, setActive] = useState('')
    // const [recovered, setRecovered] = useState('')
    // const [death, setDeath] = useState('')
    let activeData = ""
    let deathData = ""
    let recoveredData = ""
    let dateData = ""

    useEffect(() => {
        //dispatch(listPatients())
       // dispatch(loadPatients())

        //  const updatedFiltered = getFilteredPatients(patients, categories, selectedCategory);
        //  setFiltered(updatedFiltered);
        //   //console.log(patients)
        //  setPaginated(paginate(updatedFiltered, currentPage, pageSize));
        const fetchOverall = async () => {
            // const response = await axios.request({
            //     url: 'http://localhost:8000/api/v1/dashboard/publicdashboard',
            //     method: 'get',
            //     data: {},
            // });

            const response = await axios.request({
                url: 'http://localhost:8000/api/v1/dashboard/1',
                method: 'get',
                data: {},
            });

            console.log(response)

            if (response){
              //  console.log(response)
                const {test} = response.data.data;
                console.log(test)

                if(test.length > 0){
                    const { active, death, recovered, date} = test[0]
                    activeData = active.length
                    deathData = death.length
                    recoveredData = recovered.length
                    dateData = date
                }
                

                const valueSet_1 = {
                    overallData : activeData+ deathData+recoveredData,
                    recoveredData: recoveredData,
                    deathData: deathData
                }

                const valuesSet_2 = {
                    activeData: activeData,
                    staffData: '',
                    transferedData: ''
                }

                setFigureOne(valueSet_1)
                setFigureTwo(valuesSet_2)

              //  console.log(data)
               // const {districtTotals} = data.total
               // setDistrict(Object.keys(data['total']['districtTotals']))
               // setDistrictValues(Object.values(data['total']['districtTotals']))
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
                             <h3 style={{textAlign:'center', margin:'2%'}}>Total vs Active Cases</h3>
                         </div>
                         <div style={{position:'relative' ,margin:'2%'}}>
                            <PieChart />
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

            <div style={{margin:'0%',width:'100%', position:'relative'}}>
                <Card className="m-2" style={{margin:'0%'}}>
                    <BarChart></BarChart>
                </Card>
            </div>

        </div>
    )
}

export default Dashboard
