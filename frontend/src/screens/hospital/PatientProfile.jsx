// import React, {useEffect, useState} from 'react'


// import {Container, Button, Card, Row, Col, Nav, Form} from 'react-bootstrap'
// import Loader from '../../components/Loader'
// import { useDispatch, useSelector } from 'react-redux';
// //import { listPatientDetails } from '../../actions/patientActions'
// import { loadPatients , getPatientById, getAllPatients, getPatientsLoadingStatus, updateTransferPatient} from '../../store/entities/patients';
// import { Scrollbars } from 'react-custom-scrollbars';

// const PatientProfile = ({value, history}) => {
//     const dispatch = useDispatch()
//     const patientId = (window.location.href.split('/')).pop()


//     const patients = useSelector(getPatientById(patientId))

//     const [ symptoms, setSymptoms ] = useState(['']);
//     const [ drugs, setDrugs ] = useState(['']);

//     const [tranferSt, transferState ] = useState('false');
//     console.log(tranferSt);

//     const hospitals = [{id:'1', name:'National Hospital of Sri Lanka'},{ id:'2', name:'Lady Ridgeway Hospital for Children'},
//     {id:'3',name:'Castle Street Hospital for Women'}]

//     const [hospitalName, setTransferHospital] = useState(hospitals[0].name)
//     console.log(hospitalName)


//    const patient = useSelector(getAllPatients);
//   // console.log(patient)
//    const patientsLoading = useSelector(getPatientsLoadingStatus);
//    const [patientHistory, changeHistory ] = useState(patient[0]) 

//     const transferPatient = (TransferState) => {
//         const transferUpdate = {
//             patientId,
//             transferDetails:{
//                 hospitalName : hospitalName,
//                 transferState : TransferState
//             }
//         }
//         dispatch(updateTransferPatient(transferUpdate));
//         if(TransferState == 'pending'){
//             transferState(TransferState)
//         }else{
//             transferState('false')
//         }
//         console.log(hospitalName);
//     }

//     // const changeHistory = (patientDetails) =>{
//     //     console.log(patientDetails);
//     // }

//     useEffect(() => {
//         dispatch(loadPatients())

//         if(symptoms.length ===1 && symptoms[0] ===''){
//             if(patient.length !==0){
//                 const selected = [patients.name];
//                 setSymptoms(selected);
//             }
//         }

//         if(drugs.length ===1 && drugs[0] ===''){
//             if(patient.length !==0){
//                 const selected = [patients.name];
//                 setDrugs(selected);
//             }
//         }
        
//     }, [dispatch])

//     return (

//         <Container>
//             <h1 style={{textAlign:'center'}}>Patient Profile</h1>
//             <Col>
//                 <div style={{width:'100%'}}>
//                     <Row>
//                         <div /*className="vs-col vs-xs- vs-sm-12"*/style={{margin:'0%',width:'30%', position:'relative'}}>
//                             <div className="set-animation from-left animate">
//                             <Card  className="m-2" bg="#ffffff" text="black" style={{ width: '100%'}}>
//                                 <h3 className="m-2" style={{textAlign:'center'}}>Personal Details</h3>
//                                 <Card.Body>
//                                     <Card.Title>Name</Card.Title>
//                                     <Card.Text>{patients.name}</Card.Text>
//                                     <Card.Title>Date of Birth</Card.Title>
//                                     <Card.Text>{patients.name}</Card.Text>
//                                     <Card.Title>Age</Card.Title>
//                                     <Card.Text>{patients.age}</Card.Text>
//                                     <Card.Title>Address</Card.Title>
//                                     <Card.Text>{patients.name}</Card.Text>
//                                     <Card.Title>Phone number</Card.Title>
//                                     <Card.Text>{patients.name}</Card.Text>
//                                     <Button type='submit'  className='btn btn-primary' onClick={()=> window.location=`/hospital/editProfile/${patientId}`}>Edit Profile</Button><br/><br/>
//                                 </Card.Body>
//                             </Card>
//                             </div>
//                         </div>

//                         <div /*className="vs-col vs-xs- vs-sm-12"*/style={{margin:'0%',width:'70%', position:'relative'}}>
//                             <div className="set-animation from-left animate">
//                             <Card className="m-2" bg="#ffffff" text="black" style={{ width: '100%'}}>
//                                 <h3 className="m-2" style={{textAlign:'center'}}>Current Details</h3>
//                                 <Card.Body>
//                                     <Row>
//                                         <div style={{width:'50%',float:'left'}}>
//                                             <div className='ml-2 mb-2'>
//                                                 <Card.Title>Hospital Name</Card.Title>
//                                                 <Card.Text>{patients.name}</Card.Text>
//                                                 <Card.Title>Admitted Date</Card.Title>
//                                                 <Card.Text>{patients.name}</Card.Text>
//                                                 <Card.Title>Doctor</Card.Title>
//                                                 <Card.Text>{patients.name}</Card.Text>
//                                                 <Card.Title>Symptoms</Card.Title>
//                                                 <Card.Text>{patients.name}</Card.Text>
//                                             </div>
//                                         </div>

//                                         <div style={{width:'50%',float:'left'}}>
//                                             <div className='ml-2 mb-2'>
//                                                 <Card.Title>Ward No</Card.Title>
//                                                 <Card.Text>{patients.age}</Card.Text>
//                                                 <Card.Title>Discharged Date</Card.Title>
//                                                 <Card.Text>{patients.name}</Card.Text>
//                                                 <Card.Title>Transfer Details</Card.Title>
//                                                 <Card.Text>Hospital Name: {hospitalName} </Card.Text>
//                                                 <Card.Text>Transfer Status: {tranferSt} </Card.Text>
//                                                 <Card.Text>Transfer Date:  </Card.Text>
//                                                 <Card.Title>Drug Details</Card.Title>
//                                                 <Card.Text>{patients.name}</Card.Text>
//                                             </div>
//                                         </div>
//                                     </Row>
//                                     <Row>
//                                     <br></br><Button 
//                                         type='submit'  
//                                         className='btn btn-primary m-2' 
//                                         onClick = { () => history.push(`/hospital/editCurrentDetails/${patients._id}`)}
//                                     >Update Details</Button>

//                                     <br></br><Button 
//                                         type='submit'  
//                                         className='btn btn-primary m-2' 
//                                         onClick = { () => history.push(`/hospital/editCurrentDetails/${patients._id}`)}
//                                     >Discharge</Button>
                                
//                                     <br></br><Col style={{marginLeft:'10%'}}>
//                                         <Form.Group>
//                                                 <Form.Control onChange = {(e) => {
//                                                     if(e.target.value !== "Select Hospital"){
//                                                         setTransferHospital(e.target.value);
//                                                     }
//                                                 }} as="select">
//                                                      {hospitals.map((c,index) => <option selected={index === 0? 'slected': null}>{`${c.name}`}</option>)}
//                                                 </Form.Control>
//                                         </Form.Group>
//                                     </Col>
//                                     <br></br><Row style={{float:'right', marginRight:'5px'}}>
//                                         <Button className='btn btn-primary m-2' disabled={tranferSt === 'pending' ? true : false} onClick={()=>transferPatient('pending')}>Transfer</Button>
//                                         <Button className='btn btn-danger m-2' disabled={tranferSt === 'false'? true : false} onClick={()=>transferPatient('canceled')}>Cancel</Button>
//                                     </Row>
                                
//                                     </Row>
//                                 </Card.Body>
//                             </Card>
//                             </div>
//                         </div>
                       
//                     </Row>
//                 </div>

//                 <div style={{width:'100%'}}>
                                            
//                     <Row>
//                         <div /*className="vs-col vs-xs- vs-sm-12"*/style={{margin:'0%',width:'30%', position:'relative'}}>
//                             <div className="set-animation from-left animate">
//                             <Card className="m-2" bg="#ffffff" text="black" style={{ width: '100%'}}>
//                                 <h3 className="m-2" style={{textAlign:'center'}}>Patient History</h3>
//                                 <Scrollbars style={{ width: '100%', height: '26rem' , border:'1px black'}}>
//                                     <ul className="m-2">
//                                     {patient.map( p=> 
//                                         <Button 
//                                             className="btn btn-light"
//                                             style={{width:'80%', borderRadius:'0px'}}
//                                             onClick={()=>changeHistory(p)}
//                                             >{p.name}</Button>)}
//                                     </ul>
//                                 </Scrollbars>
//                             </Card>
//                             </div>
//                         </div>


//                         <div /*className="vs-col vs-xs- vs-sm-12"*/style={{margin:'0%',width:'70%', position:'relative'}}>
//                             <div className="set-animation from-left animate">
//                             <Card className="m-2" bg="#ffffff" text="black" style={{ width: '100%'}}>
//                                 <h3 className="m-2" style={{textAlign:'center'}}>Patient History</h3>
//                                 <Card.Body>
//                                     <Row>
//                                         <div style={{width:'50%',float:'left'}}>
//                                             <div className='ml-2 mb-2 details'>
//                                                 <Card.Title>Hospital Name</Card.Title>
//                                                 <Card.Text>{patientHistory.name}</Card.Text>
//                                                 <Card.Title>Admitted Date</Card.Title>
//                                                 <Card.Text>{patientHistory.name}</Card.Text>
//                                                 <Card.Title>Doctor</Card.Title>
//                                                 <Card.Text>{patientHistory.name}</Card.Text>
//                                                 <Card.Title>Symptomes</Card.Title>
//                                                 <Card.Text>{patientHistory.name}</Card.Text>
//                                             </div>
//                                         </div>

//                                         <div style={{width:'50%',float:'left'}}>
//                                             <div className='ml-2 mb-2'>
//                                                 <Card.Title>Ward No</Card.Title>
//                                                 <Card.Text>{patientHistory.age}</Card.Text>
//                                                 <Card.Title>Discharged Date</Card.Title>
//                                                 <Card.Text>{patientHistory.name}</Card.Text>
//                                                 <Card.Title>Transfer Details</Card.Title>
//                                                 <Card.Text>Hospital Name:  </Card.Text>
//                                                 <Card.Text>Transfer Status: </Card.Text>
//                                                 <Card.Text>Transfer Date:  </Card.Text>
//                                                 <Card.Title>Drug Details</Card.Title>
//                                                 <Card.Text>{patientHistory.name}</Card.Text>
//                                             </div>
//                                         </div>
//                                     </Row>
//                                 </Card.Body>
//                             </Card>
//                             </div>
//                         </div>

//                     </Row>
//                 </div>
//         </Col>
//         </Container>    
    
//     )
// }

// export default PatientProfile

import React, {useEffect, useState} from 'react'
import {Container, Button, Card, Row, Col, Nav, Form,FormControl} from 'react-bootstrap'
import axios from 'axios';
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { loadPatient, getAllPatients} from '../../store/entities/patients';
import {getAllHospitals, loadHospitals} from '../../store/entities/hospitals'
import { Scrollbars } from 'react-custom-scrollbars';
import PersonalInfo from '../../components/patientProfile/PersonalInfo'
import CurrentInfo from '../../components/patientProfile/CurrentInfo'
import History from '../../components/patientProfile/History'


const PatientProfile =  ({match, history}) => {
    const dispatch = useDispatch()
    const patientId = match.params.id
    
    const userDetails = useSelector(state => state.auth);
    const { user } = userDetails.data
    const auth = user

    console.log(user)

    //const patients = useSelector(getAllPatients)
    const [patients , setPatients] = useState([])
    const hospitals = useSelector(getAllHospitals)
    console.log(patients)

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

   const [filteredHistory, setFilteredHistory] = useState([])
   const [patientHistory, changeHistory ] = useState(filteredHistory) 
   const [findHistory, setfindHistory] = useState(false)

    const setDates = (date, type) =>{
        if(type === 'start'){
            setStartDate(date);
        }else{
            setEndDate(date)
        }
    }

    const searchHistory =() =>{
        if(startDate <= endDate){
            let medicalHistories = getMedicalHistories(startDate, endDate, patients);
           // console.log(medicalHistories)
            changeHistory(medicalHistories)
            setFilteredHistory(medicalHistories);
            setfindHistory(true)
        }

    }


    useEffect(() => {
        //dispatch(loadPatient())
        const fetchPatient = async () => {
            const {data} = await axios.get(`http://localhost:8000/api/v1/patients/${patientId}`)
            setPatients(data.data)
        }

        fetchPatient()

        dispatch(loadHospitals())
        
    }, [patients])

    return (
        <Container>
            {userDetails.loggedIn ? 
            <div>
                <h4 style={{textAlign:'center', fontWeight:'700'}}>PATIENT PROFILE</h4>
                <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
                    
                    <div className="vs-col vs-xs- vs-sm-12 vs-lg-3"style={{margin:'0%',width:'100%', position:'relative'}}>
                        <div className="set-animation from-left animate">
                            <PersonalInfo patients={objectDestructure(auth, "user")} /*currentHospital={currentHospital_id}
                                userHospital={userHospital_id} id={patients ._id}*/>
                            </PersonalInfo>
                        </div>
                    </div>

                    <div className="vs-col vs-xs- vs-sm-12 vs-lg-6"style={{margin:'0%',width:'100%', position:'relative'}}>
                        <div className="set-animation from-left animate">
                            {patients.currentMedicalHistory ?
                                <CurrentInfo patients={objectDestructure(patients, "history").slice(-1)[0]}
                                   /* userHospital={userHospital_id} currentHospital={currentHospital_id} hospitals={hospitals}*/
                                ></CurrentInfo> : 

                                <CurrentInfo patients={""} currentHospital={""}
                                    userHospital={""}
                                ></CurrentInfo>}
                        </div>
                    </div>


                    {/* {auth.role !== 'patient' &&
                    <div className="vs-col vs-xs- vs-sm-12 vs-lg-3" style={{margin:'0%',width:'100%', position:'relative'}}>
                            <div className="set-animation from-left animate">
                            {currentHospital_id === userHospital_id ? 
                                <Actions patients={patients} hospitals={hospitals} wards ={wardsDetails} popUpHandler={setPopUp}></Actions> 
                               //<Card>rfergre</Card>
                                :''
                            }
                            </div>
                    </div> } */}
                </div>

                <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
                    <div className="vs-col vs-xs vs-sm-12 vs-lg-3" style={{marginLeft:'0%',marginRight:'0%',width:'100%'}}>
                        <Card className='m-2'>
                            <h5 className="m-2 font-weight-bold" style={{textAlign:'center'}}>SEARCH MEDICAL HISTORY</h5>
                            <Form.Group as={Col} controlId='sd'>
                                <Form.Label class="float-left" className = 'form-label'>Start Date:</Form.Label>
                                <Form.Control 
                                    type='date'
                                    name='start_date' 
                                    onChange={(e)=>{
                                        setDates(e.target.value, 'start')
                                    }}
                                    required
                                />
                            <FormControl.Feedback type='invalid'>This field is required!</FormControl.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId='ed'>
                                <Form.Label class="float-left" className = 'form-label'>End Date:</Form.Label>
                                <Form.Control 
                                    type='date'
                                    name='end_date' 
                                    onChange={(e)=>{
                                        setDates(e.target.value, 'end')
                                    }}
                                    required
                                />
                            <FormControl.Feedback type='invalid'>This field is required!</FormControl.Feedback>
                            </Form.Group>
                            
                            { startDate !== '' && endDate !== '' && startDate > endDate ?
                            <Card 
                                style={{backgroundColor:'#fca8a4', color:'#b73333', opacity:'0.5', padding:'10px', margin:'5px'}}
                                className='m-2'
                            >Start date must be past to the end date</Card> : ''}
                            { startDate !== '' && endDate !== '' && filteredHistory.length === 0 && findHistory?
                            <Card 
                                style={{backgroundColor:'#fca8a4', color:'#b73333', opacity:'0.5', padding:'10px', margin:'5px'}}
                                className='m-2'
                            >No Medical History Data</Card> : ''}
                            <Button 
                                className='btn btn-primary m-2'
                                disabled ={startDate === '' || endDate === ''}
                                onClick= {() => searchHistory()} 
                            >Search</Button>

                        </Card>
                    </div>


                    <div className="vs-col vs-xs vs-sm-12 vs-lg-6" style={{marginLeft:'0%',marginRight:'0%',width:'100%'}}>
                        <History patientHistory={patientHistory} filteredHistory={filteredHistory} hospital={getHospitalName(filteredHistory, hospitals)}></History>
                    </div>
                    
                    {filteredHistory.length !== 0 &&
                    <div className="vs-col vs-xs vs-sm-12 vs-lg-3" style={{marginLeft:'0%',marginRight:'0%',width:'100%'}}>
                    <Card className='m-2'>
                       
                        <div>
                            <h5 className='text-center m-2 font-weight-bold'>MEDICAL HISTORY LIST</h5>
                            <Scrollbars style={{ width: '100%',minHeight:'15rem', height:'auto', overflowX:'hidden', border:'1px black'}}>
                                <ul className="m-2">
                                {filteredHistory.map( p=> 
                                    <Button 
                                        className="btn btn-light"
                                        style={{width:'80%', borderRadius:'0px'}}
                                        onClick={()=>changeHistory(p)}
                                        >
                                        {p.admittedDate}
                                    </Button>)}
                                </ul>
                            </Scrollbars>
                        </div>
                    </Card>
                    </div>}

                    

                </div>
            </div>: history.push('/')}

             {/* <AlertDialog dialogSet={popup} closePopUp={setPopUp}  dischargeHandler={setDischargeHandler}/> */}
            
        </Container>    
    
    )
}


export default PatientProfile


export function getMedicalHistories(start_date, end_date, patients){
    const histories = objectDestructure(patients, "history")
    if(histories !== ""){
        //console.log(histories)
        return histories.filter ( p=> p.admittedDate >= start_date && p.admittedDate <= end_date)
    }
    return ""
}

export function objectDestructure ( patients, type){
    let newList = ""
    if(typeof(patients) === 'undefined' || patients.length === 0){
         return newList
    } 
 
    const {medicalHistory, user } = patients
    if(user){
         if(type === "user"){
            return user
         }
    }

    if(medicalHistory){
        if(type === "history"){
           return medicalHistory
        }
    }

    return newList
}

function getHospitalName(filteredhistory, hospitals){
   // console.log(filteredhistory)
    if(filteredhistory.length === 0){
        return ""
    }
    const hospitalName = hospitals.filter(p=> p._id === filteredhistory[0].hospital)
    return hospitalName[0]
}

function getCurrentHospitalId(patients){
    let id = ""
    if(typeof(patients) === 'undefined' || patients.length === 0){
         return id
    } 

    if(patients.currentMedicalHistory){
        const lastHistory = patients.medicalHistory.slice(-1)[0]
        return lastHistory.hospital
    }
}

