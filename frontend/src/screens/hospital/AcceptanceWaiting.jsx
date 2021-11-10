import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import { Table, Container, Button, Row, Card} from 'react-bootstrap'
import {  getPatientsLoadingStatus, updateTransferPatient,
    updateSelectedTransferPatient, getAllWaitingPatients, loadWaitingPatients} from '../../store/entities/patients';
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux';



const AcceptanceWaiting = ({}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const auth = useSelector(state => state.auth);
    const [userType, setUserType] = useState('')

    const patientsDetails = useSelector(getAllWaitingPatients);
    const patientsList = patientsDetails.waiting
    console.log(patientsList)
    const [patients, setPatients] = useState([...patientsList]);
    const [patientState, setPatientState] = useState([...patientsList]);
    const [selected, setSelected] = useState([]);
    //console.log(selected)
    //console.log(patientState)
    const [allSelected, setAllSelected] = useState(false);
    //console.log(allSelected)
    const patientsLoading = useSelector(getPatientsLoadingStatus);

    // const pageSize = 3;
    // const [currentPage, setCurrentPage] = useState(1);
    // let [paginated, setPaginated] = useState(patients);

    useEffect(() => {
        if(!auth.loggedIn){
            window.location='/'
        }
        setUserType(auth.data.user.role)
        dispatch(loadWaitingPatients())

        setPatientState(
            patientsList.map( p=>{
                return {
                     select: false,
                    _id: p._id,
                    name: p.name,
                    age: p.age,
                    'tel':p.name,
                    'address':p.name
                }
            })
        )

    },[dispatch])

    const Aproval = (decision, patientId)=>{
        const transferUpdate = {
            patientId,
            transferDetails:{
                transferState : decision
            }
        }
        dispatch(updateTransferPatient(transferUpdate));
        setPatientState(patientState.filter(p=>p._id !== patientId))
    }

    const AproveSelected =(dicision) =>{
        const transferUpdate = {
            dicision:dicision,
            selectedPatients: selected
        }
        dispatch(updateSelectedTransferPatient(transferUpdate));
        setPatientState(patientState.filter(p=>p.select === false))
        setSelected([]);
    }

    const handleSelected =(value, data)=>{
        if(value === false && selected.length === patientsList.length){
            setAllSelected(false);
        }
        if(value === true && selected.length === patientsList.length-1){
            setAllSelected(true);
        }
        if(value == true){
            let selectedList = [...selected]
            let patient = patientsList.filter(p => p._id === data._id );
            selectedList.push(patient[0]);
            setSelected(selectedList);
        }else{
            setSelected(selected.filter(p=>p._id !== data._id));
        }
    }

    const handleSelectAll =(check)=>{
        if(check == true){
            setAllSelected(check);
            setSelected(patientsList)
        }else{
            setAllSelected(check);
            setSelected([]);
        }
    }

    return (
        <>
        {auth.loggedIn && patientsLoading && (<Loader></Loader>)}
        {auth.loggedIn /*&& userType === 'hospitalAdmin' */? 

        <Container>
           
            <h4 style={{textAlign:'center', marginBottom:'40px', fontWeight:'700'}}>PATIENTS WAITING FOR APROVAL</h4>
        {patientState.length === 0 ? <Card style={{backgroundColor:'#fca8a4', color:'#b73333', opacity:'0.5', padding:'10px'}}>No data</Card>:
        <div>
            <Row className='ml-3 mb-2'>
                <Button
                    value = {selected}
                    disabled={selected.length === 0}
                    onClick = { () => AproveSelected('accept')}
                    className="btn btn-primary w-25 mr-2"
                >Accept Selected</Button>
                <Button
                    value = {selected}
                    disabled={selected.length === 0}
                    onClick = { () => AproveSelected('declined')}
                    className="btn btn-danger w-25"
                    style={{opacity:'0.7'}}
                >Decline Selected</Button>
            </Row>

            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                    <th><input 
                        type='checkBox'
                        onChange ={(e) =>{
                            let checked = e.target.checked
                            setPatientState(patientState.map(p=>{
                                p.select = checked;
                                return p;
                            }))
                            handleSelectAll(checked)
                        }}
                        checked={allSelected}
                    /></th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Tel</th>
                    <th>Address</th>
                    <th>Profile</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patientState.map( p =>
                    
                        <tr>
                            {/* <td>{p._id}</td> */}
                            <td><input 
                                type='checkBox' 
                                onChange={(e) =>{
                                    let checked = e.target.checked;
                                    handleSelected(checked, p)
                                    setPatientState(patientState.map( data=>{
                                        if(data._id == p._id){
                                            data.select = checked;
                                        }
                                        return data;
                                    }))
                                }}
                                checked ={p.select}
                            /></td>
                            <td>{p.name}</td>
                            <td>{p.age}</td>
                            <td>{p.name}</td>
                            <td>{p.name}</td>
                            <td>
                                <Button 
                                    value = {p._id}
                                    onClick = { () => history.push(`/hospital/profile/${p._id}`)}
                                    className="btn btn-light mr-2 ml-2">Profile</Button>
                            </td>
                            <td>
                                <Row>
                                    <Button 
                                        value = {p._id}
                                        onClick = { () => Aproval('accept', p._id)}
                                        className="btn btn-primary mr-2 ml-2 text-center"
                                        style={{width:'40%'}}>Accept</Button>
                                    <Button 
                                        value = {p._id}
                                        style={{opacity:'0.8'}}
                                        onClick = { () => Aproval('declined',p._id)}
                                        className="btn btn-danger text-center"
                                        style={{width:'40%',opacity:'0.7'}}>Decline</Button>
                                </Row>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
        }
      

        {/* <Pagination
            itemsCount = {filtered.length} 
            pageSize = {pageSize} 
            currentPage = {currentPage}
            onPageChange = {(page) => {
                setCurrentPage(page);
                setPaginated(paginate(filtered, page, pageSize));
            }}
        /> */}
        
        </Container>
        : /*history.push('/')*/history.goBack()}

    </>
    )
}

export default AcceptanceWaiting
