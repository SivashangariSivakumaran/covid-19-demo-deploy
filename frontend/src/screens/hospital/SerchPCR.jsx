import React, {useEffect, useState, Component} from 'react'
import { Table, Container, Button, InputGroup, FormControl, Form} from 'react-bootstrap'
import { paginate } from '../../utils/paginate';
import Loader from '../../components/Loader'
import Pagination from '../../components/Pagination';
import {getAllPcrs, loadPcrs, getPcrLoadingStatus,changeStatus} from '../../store/entities/pcr';
import { useDispatch, useSelector } from 'react-redux';


const SearchPCR = ({history}) => {
    const dispatch = useDispatch()

    const auth = useSelector(state => state.auth);
   // console.log(auth)

    const pcrList = useSelector(getAllPcrs);
    console.log(pcrList)

    const pcrLoading = useSelector(getPcrLoadingStatus);
    const [filtered, setFiltered] = useState(pcrList);

    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);
    let [paginated, setPaginated] = useState(pcrList);

    const [searchKeyword, setSearchKeyword ] = useState('');

    const status = ['select status', 'active', 'recovered', 'death']
    const [patientStatus, setStatus] = useState('')
    // console.log(patientStatus)

    const changePatientStatus = (id) => {
        console.log(patientStatus)
        if(patientStatus === '' || patientStatus === 'select status'){
            alert("Please select valid status")
        }
        else{
            dispatch(changeStatus(id, patientStatus))
        }
    }


    useEffect(() => {
        if(!auth.loggedIn){
           history.push('/')
        }
        dispatch(loadPcrs())
        const updatedSearchFiltered = getFilteredSearchedPatients(pcrList, searchKeyword)
        setFiltered(updatedSearchFiltered);
        setPaginated(paginate(updatedSearchFiltered, currentPage, pageSize));

    },[dispatch, searchKeyword, pcrList])


    return (
        <>
            {/* {auth.loggedIn && patientsLoading && (<Loader></Loader>)}
            {auth.loggedIn ?  */}
            {(typeof(pcrList) === 'undefined' || pcrList.length == 0) && pcrLoading && (<Loader></Loader>)}
            <Container>
                <h3 style={{textAlign:'center', marginBottom:'40px', fontWeight:'700'}}>PCR DETAILS</h3>

                <Button 
                    className="btn btn-success"
                    style={{float:'right',padding:'10px'}}
                    onClick = { () => history.push('/hospital/addPcrResults')}
                >+ add pcr result</Button>

                <InputGroup id = 'search-bar' style={{padding:'0px 200px 20px 200px', color:'blue'}}>
                            <FormControl
                                className='textBox'
                                placeholder="search pcr by using name or NIC..."
                                aria-label="searchPatient"
                                aria-describedby="basic-addon2"
                                size = 'lg'
                                value = {searchKeyword}
                                onChange = { e => setSearchKeyword(e.target.value)}
                            />
                </InputGroup>

            {pcrList.length === 0 ? <h1>No data</h1>:

            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>NIC</th>
                    <th>Tel</th>
                    <th>Result</th>
                    <th>Status</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginated.map( p =>
                        <tr>
                            <td>
                               {(objectDestructure(p , "name"))}
                            </td>
                            <td>{(objectDestructure(p , "nic"))}</td>
                            <td>{p.contactNumber}</td>
                            <td>{p.result}</td>
                            {/* <td>{p.name}</td> */}
                            <td>
                                <Form.Label>{p.status || 'No status'}</Form.Label>
                                <Form.Group>
                                    <Form.Control onChange = {(e) => {
                                        setStatus(e.target.value);
                                    }} as="select">
                                    {status.map((c,index) => <option selected={index === 0? 'slected': null}>{`${c}`}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </td>
                            <td>
                                {//patientStatus && 
                                    <Button 
                                        value = {p._id}
                                        onClick = { () => changePatientStatus(p._id)}
                                        className="btn btn-primary">Change</Button>
                                }
                            </td>
                        </tr>
                    //)
                    )}
                </tbody>
            </Table>

            }

            <Pagination
                itemsCount = {filtered.length} 
                pageSize = {pageSize} 
                currentPage = {currentPage}
                onPageChange = {(page) => {
                    setCurrentPage(page);
                    setPaginated(paginate(filtered, page, pageSize));
                }}
            />

            </Container>
            {/* : history.push('/')} */}

        </>
    )
}

export function getFilteredSearchedPatients(pcr, filterBy){

    if(typeof(pcr) === 'undefined' || pcr.length === 0){
       return {}
    }
    return pcr.filter(p => objectDestructure(p, "name").toLowerCase().includes(filterBy) || getNic(p).includes(filterBy.toString()));
}

export function objectDestructure ( pcr, type){
    let newList = ""
    if(typeof(pcr) === 'undefined' || pcr.length === 0){
        return newList
    } 

    if(type === "name"){
        const { firstName , lastName } = pcr.name;
        const patientName = firstName + " " + lastName
        return patientName;
    }
    
    if(type === "nic"){
        const { nicno } = pcr.nic;
            return nicno
    }

    if(type === "tel"){
        const { contactNumber } = pcr;
        return contactNumber
    }
}

function getNic(patient){
    const { nic } = patient
    if(nic){
        const {nicno} = nic
        return nicno.toString()
    }
    return ""
}

export default SearchPCR 

