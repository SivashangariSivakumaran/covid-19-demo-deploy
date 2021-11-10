import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import { Table, Container, Button, Row, Card} from 'react-bootstrap'
import Loader from '../../components/Loader'
import {getAllPcrs, loadPcrs, updatePcrAproval, getPcrLoadingStatus} from '../../store/entities/pcr';
import { getAllHospitals, getHospitalLoadingStatus, loadHospitals} from '../../store/entities/hospitals';
import { useDispatch, useSelector } from 'react-redux';

const ConfirmData = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const auth = useSelector(state => state.auth);
    const [userType, setUserType] = useState('')
   // console.log(userType)

    const hospital = useSelector(getAllHospitals)
    const hospitalsLoading = useSelector(getHospitalLoadingStatus);

  //  const patientsList = useSelector(getAllPcrs);
  //  console.log(patientsList)

    const [hospitalState, setHospitalState] = useState(hospital);
    const [selected, setSelected] = useState([]);
    console.log(selected)
    const [allSelected, setAllSelected] = useState(false);
   // const patientsLoading = useSelector(getPcrLoadingStatus);

    useEffect(() => {
       if(!auth.loggedIn){
           window.location='/'
       }
       setUserType(auth.data.user.role)
       dispatch(loadPcrs());

        setHospitalState(
            hospital.map( p=>{
                return {
                     select: false,
                    _id: p._id,
                    name: p.name,
                    // age: p.age,
                    // telephone:p.telephone,
                    // result:p.result
                    'newCases': 50,
                    'deaths': 0,
                    'recover': 22
                }
            })
        )

    },[dispatch])

    const Aproval = (decision, patientId)=>{
        // const updateAprove = {

        //     ids: [
        //         patientId
        //     ],
        //     token: auth.token
        // }

        // dispatch(updatePcrAproval(updateAprove));
        // setHospitalState(hospitalState.filter(p=>p._id !== patientId))
    }

    const AproveSelected =(dicision) =>{
    //     const updateAprove = {

    //          ids : selected
    //     }
    //     console.log(updateAprove)
    //     dispatch(updatePcrAproval(updateAprove));
    //    // dispatch(updateTransferPatient(transferUpdate))
    //     setSelected([]);
    //     setPatientState(patientState.filter(p=>p.select === false))

        //console.log(selected)
    }

    const handleSelected =(value, data)=>{
        if(value === false && selected.length === hospital.length){
            setAllSelected(false);
        }
        if(value === true && selected.length === hospital.length-1){
            setAllSelected(true);
        }
        if(value === true){
            let selectedList = [...selected]
            let hospitalDetail = hospital.filter(p => p._id === data._id );
            selectedList.push(hospitalDetail[0]);
            setSelected(selectedList);
        }else{
            setSelected(selected.filter(p=>p._id !== data._id));
          // setSelected(selected.filter(p=>p !== data._id));
        }
    }

    const handleSelectAll =(check)=>{
        if(check === true){
            setAllSelected(check);
            //setSelected(patientsList)
            setSelected(hospital)
        }else{
            setAllSelected(check);
            setSelected([]);
        }
    }

    return (
        <>
        {auth.loggedIn && hospitalsLoading && (<Loader></Loader>)}
        {auth.loggedIn /*&& userType === 'admin'*/ ? 
        <Container>
           
        <h2 style={{textAlign:'center', marginBottom:'40px', fontWeight:'700'}}>APROVE UPDATED DETAILS</h2>
        {hospitalState.length === 0 ? <Card style={{backgroundColor:'#fca8a4', color:'#b73333', opacity:'0.5', padding:'10px'}}>No data</Card>:
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
                            setHospitalState(hospitalState.map(p=>{
                                p.select = checked;
                                return p;
                            }))
                            handleSelectAll(checked)
                        }}
                        checked={allSelected}
                    /></th>
                    <th>Name</th>
                    <th>Total Cases</th>
                    <th>Deaths</th>
                    <th>Recovery</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {hospitalState.map( p =>
                    
                        <tr>
                            {/* <td>{p._id}</td> */}
                            <td><input 
                                type='checkBox' 
                                onChange={(e) =>{
                                    let checked = e.target.checked;
                                    handleSelected(checked, p)
                                    setHospitalState(hospitalState.map( data=>{
                                        if(data._id == p._id){
                                            data.select = checked;
                                        }
                                        return data;
                                    }))
                                }}
                                checked ={p.select}
                            /></td>
                            <td>{p.name}</td>
                            <td className='text-warning font-weight-bold'>{p.newCases}</td>
                            <td className='text-danger font-weight-bold'>{p.deaths}</td>
                            <td className='text-success font-weight-bold'>{p.recover}</td>
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
            itemsCount = {patientsList.length} 
            pageSize = {pageSize} 
            currentPage = {currentPage}
            onPageChange = {(page) => {
                setCurrentPage(page);
                setPaginated(paginate(patientsList, page, pageSize));
            }}
        /> */}
        
        </Container>
         : history.goBack()/*window.location='/'*/}
        
    </>
    )

}

export default ConfirmData

// function getOnlyIds(patientsList){
//     let list =[]

//     if ( patientsList.length === 0) return list;

//     for ( let i =0; i<= patientsList.length-1 ; i++){
//         list.push(patientsList[i]._id)
//     }
//     //console.log(list)
//     return list;
// }
