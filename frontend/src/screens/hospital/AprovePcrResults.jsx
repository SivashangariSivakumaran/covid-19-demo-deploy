import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Table, Container, Button, Row, Card} from 'react-bootstrap'
import Loader from '../../components/Loader'
import { updatePcrAproval, getPcrLoadingStatus, getToConfirmPcrLoadingStatus, getToConfirmPcrs, loadToConfirmPcrs} from '../../store/entities/pcr';
import { useDispatch, useSelector } from 'react-redux';



const AprovePcrResults = ({}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const auth = useSelector(state => state.auth);
    const [userType, setUserType] = useState('')

    const pcrList = useSelector(getToConfirmPcrs);

    const [patientState, setPatientState] = useState(getOnlyIds(pcrList));
    const [selected, setSelected] = useState([]);
    const [allSelected, setAllSelected] = useState(false);
    const patientsLoading = useSelector(getToConfirmPcrLoadingStatus);

    useEffect(() => {
       if(!auth.loggedIn){
           window.location='/'
       }
       setUserType(auth.data.user.role)
       dispatch(loadToConfirmPcrs());

       if(pcrList){
            setPatientState(
                pcrList.map( p=>{
                    return {
                        select: false,
                        _id: p._id,
                        name: objectDestructure(p, "name"),
                        age: p.age,
                        telephone:p.contactNumber,
                        result:p.result
                    }
                })
            )
       }


    },[dispatch, pcrList])

    const Aproval = (decision, patientId)=>{
        const updateAprove = {

            ids: [
                patientId
            ],
        }
        console.log(updateAprove)

        dispatch(updatePcrAproval(updateAprove));
       // setPatientState(patientState.filter(p=>p._id !== patientId))
    }

    const AproveSelected =(dicision) =>{
        const updateAprove = {

             ids : selected
        }
        console.log(updateAprove)
        dispatch(updatePcrAproval(updateAprove));
       // dispatch(updateTransferPatient(transferUpdate))
        setSelected([]);
        setPatientState(patientState.filter(p=>p.select === false))

        //console.log(selected)
    }

    const handleSelected =(value, data)=>{
        if(value === false && selected.length === pcrList.length){
            setAllSelected(false);
        }
        if(value === true && selected.length === pcrList.length-1){
            setAllSelected(true);
        }
        if(value === true){
            let selectedList = [...selected]
            let patient = pcrList.filter(p => p._id === data._id );
            selectedList.push(patient[0]._id);
            setSelected(selectedList);
        }else{
           // setSelected(selected.filter(p=>p._id !== data._id));
           setSelected(selected.filter(p=>p !== data._id));
        }
    }

    const handleSelectAll =(check)=>{
        if(check === true){
            setAllSelected(check);
            //setSelected(pcrList)
            setSelected(getOnlyIds(pcrList))
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
           
        <h2 style={{textAlign:'center', marginBottom:'40px', fontWeight:'700'}}>APROVE PCR RESULTS</h2>
        {patientState.length === 0 ? <Card style={{backgroundColor:'#fca8a4', color:'#b73333', opacity:'0.5', padding:'10px'}}>No data</Card>:
        <div>
            <Row className='ml-3 mb-2'>
                <Button
                    value = {selected}
                    disabled={selected.length === 0}
                    onClick = { () => AproveSelected('accept')}
                    className="btn btn-primary w-25 mr-2"
                >Confirm Selected</Button>
                {/* <Button
                    value = {selected}
                    disabled={selected.length === 0}
                    onClick = { () => AproveSelected('declined')}
                    className="btn btn-danger w-25"
                    style={{opacity:'0.7'}}
                >Decline Selected</Button> */}
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
                    {/* <th>Age</th> */}
                    <th>Telephone</th>
                    <th>PCR Result</th>
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
                            {/* <td>{p.name}</td> */}
                            <td>{p.telephone}</td>
                            <td>{p.result}</td>
                            <td>
                                <Row>
                                    <Button 
                                        value = {p._id}
                                        onClick = { () => Aproval('accept', p._id)}
                                        className="btn btn-primary mr-2 ml-2 text-center"
                                        style={{width:'80%'}}>Confirm</Button>
                                    {/* <Button 
                                        value = {p._id}
                                        style={{opacity:'0.8'}}
                                        onClick = { () => Aproval('declined',p._id)}
                                        className="btn btn-danger text-center"
                                        style={{width:'40%',opacity:'0.7'}}>Decline</Button> */}
                                </Row>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div> 
        }
      

        {/* <Pagination
            itemsCount = {pcrList.length} 
            pageSize = {pageSize} 
            currentPage = {currentPage}
            onPageChange = {(page) => {
                setCurrentPage(page);
                setPaginated(paginate(pcrList, page, pageSize));
            }}
        /> */}
        
        </Container>
         : history.goBack()/*window.location='/'*/}
        
    </>
    )
}

export default AprovePcrResults

function getOnlyIds(pcrList){
    let list =[]

    if(pcrList){
        if ( pcrList.length === 0) return list;

        for ( let i =0; i<= pcrList.length-1 ; i++){
            list.push(pcrList[i]._id)
        }

        return list;
    }
    //console.log(list)
    return list;
}

function objectDestructure ( pcr, type){
    let newList = ""
    if(typeof(pcr) === 'undefined' || pcr.length === 0){
        return newList
    } 

    const { name, contactNumber } = pcr
    if(name){
        if(type === "name"){
            const { firstName , lastName } = pcr.name;
            const patientName = firstName + " " + lastName
           // console.log(patientName)
            return patientName;
        }
    }
    if(contactNumber){
        if(type === "tel"){
            return contactNumber
        }
    }
    else{
        return newList
    }
}
