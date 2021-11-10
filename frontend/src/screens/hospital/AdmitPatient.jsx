import React, {useEffect, useState, Component} from 'react'
import { Container, Button, FormControl, InputGroup, Row, Card, Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { toastAction } from '../../store/toastActions';
import { loadPatients, getAllPatients, getPatientsLoadingStatus, admitPatient, getPatientAdmitState } from '../../store/entities/patients';

const AdmitPatient = ({history}) => {
    const dispatch = useDispatch()

    const patientsDetails = useSelector(getAllPatients);
    const patients = patientsDetails.list;

    const patientAdmitSate = useSelector(getPatientAdmitState)
    const [submitState, setSubmitSate] = useState(false)
   // console.log(patients)

    const auth = useSelector(state => state.auth);
    const { admin, user } = auth.data.user
    const {wards } = admin.hospital
   // console.log(wards)
    //console.log(admin)

    const [searchKeyword, setSearchKeyword ] = useState('');
    const [patientName, setPatientName] = useState();
    console.log(patientName)
    const [ward, setWard] = useState(wards[0].name);
    //const [wardId, setWardId] = useState(wards[0]._id);
  //  console.log(ward)
    const [isKid, setIsKid] = useState(false)
   // console.log(isKid)
    const [patient, selectedPatient] = useState();

    const serachPatient =() =>{
        const filteredPatient = getFilteredSearchedPatients(patients, searchKeyword, isKid)
        setPatientName(filteredPatient)
        selectedPatient(filteredPatient)
    }

    const AdmitPatient =() =>{
        if(patientName.length > 1){
            dispatch(toastAction({ message: "Please select only one patient", type: 'error' }))
        }
        else{
            if(patientName[0]){
                const patientDetails = {
                    patient: patientName[0]._id,
                    ward : getWardId(wards, ward)
                }
                dispatch(admitPatient(patientDetails))
                setSubmitSate(true)
                console.log(patientDetails)
            }
            else{
                const patientDetails = {
                    patient: patientName._id,
                    ward : getWardId(wards, ward)
                }
               dispatch(admitPatient(patientDetails))
               setSubmitSate(true)
               console.log(patientDetails)
            }
           
           // dispatch(admitPatient(patientName[0]._id, ward))
        }

    }

    // const selectPatient =(patient) => {

    // }

    // const handleSelected =(check) =>{
    //     if(check === true){
    //         setIsKid(true)
    //     }if(check === false){
    //         setIsKid(false)
    //     }
    // }

    useEffect(() => {
        if(!auth.loggedIn){
           history.push('/')
        }

        if(patientAdmitSate.medicalHistory && submitState){
            setSubmitSate(false)
            dispatch(toastAction({ message: "Patient admitted successfully", type: 'info' }))
        }
        dispatch(loadPatients())
    },[dispatch,patientAdmitSate, searchKeyword])


    return (
        <Container>
            <p className='m-3'>Check Whether Patient is Already Registered in the system</p>
            <Row>
                <div style={{width:'80%'}}>
                    <InputGroup id = 'search-bar' style={{padding:'0 0 10px 0', color:'blue'}}>
                    <FormControl
                        className='textBox'
                        placeholder="search patient by using name or NIC..."
                        aria-label="searchPatient"
                        aria-describedby="basic-addon2"
                        size = 'lg'
                     value = {searchKeyword}
                     onChange = { e => setSearchKeyword(e.target.value)}
                    />
                    </InputGroup>
                </div>

                <div style={{width: '15%',padding:'5px 10px'}}>
                    <Button 
                        className='text-center'
                        onClick= { ()=> serachPatient()}
                    >Search</Button>
                </div>
            </Row>

            <div>
                <input 
                    type='checkbox'
                    style={{width:'5%', marginTop:'5px', marginLeft:'50px'}}
                    onChange={(e) =>{
                        let checked = e.target.checked;
                        setIsKid(checked)
                    }}
                />
                <Form.Label className = 'form-label w-75'>IF Patient is kid add select in check box</Form.Label> 
            </div>
            {patient && patient.length !==0 &&
            <div> 
                {patient.length === 1 && 
                <Card style={{backgroundColor:'#0cce39', color:'#000f05', opacity:'0.5', padding:'10px', width:'80%'}}>
                    {patientName[0].nic.nicno} is already registered patient
                </Card>}

                {patient.length > 1 && 
                <div>
                    <p>There are more than one patient registered under this NIC number, Please select correct one</p>
                    <Card style={{backgroundColor:'#0cce39', color:'#000f05', opacity:'0.5', padding:'10px', width:'80%'}}>
                    {patient.map( p=> 
                                    <Button 
                                        className="btn btn-light"
                                        style={{width:'80%', borderRadius:'0px'}}
                                        onClick={()=>setPatientName(p)}
                                        >
                                        {p.user.name.firstName + " " + p.user.name.lastName}
                                    </Button>)}
                    </Card>
                </div>
                }

                <Form.Group className='mt-2 w-25'>
                    <Form.Control onChange = {(e) => {
                        if(e.target.value !== "Select ward"){
                            setWard(e.target.value);
                            //setWardId(e.target.value)
                        }
                    }} as="select">
                    {wards.map((c,index) => <option selected={index === 0? 'slected': null}>{`${c.name}`}</option>)}
                    </Form.Control>
                </Form.Group>

                <p>{ward} is selected</p>

                <Button 
                    className='text-center my-2'
                    onClick= { ()=> AdmitPatient()}
                >Admit Patient</Button>

            </div>}

            {patientName && patientName.length ===0 &&
            <div>
                <Card style={{backgroundColor:'#fca8a4', color:'#b73333', opacity:'0.5', padding:'10px', width:'80%'}}>
                    Not Found please register patient
                </Card>
                <Button 
                    className='text-center my-2'
                    onClick= { ()=> history.push('/hospital/addPatient')}
                >Register New Patient</Button>
            </div>}


           
        </Container>

    )
}

export default AdmitPatient

function getFilteredSearchedPatients(patients, filterBy, isKid){
    let name;
    if(!isKid){
        name =  patients.filter(p => 
            objectDestructure(p, "nic") === filterBy.toString()  && getAge(p) > 18
         );
        //  if(name.length === 1){
        //     return name[0]
        //  }
         return name
    }
    else{
        name =  patients.filter(p => 
            objectDestructure(p, "nic") === filterBy.toString() && getAge(p) < 18
        );
        // if(name.length === 1){
        //     return name[0]
        //  }
        return name
    }

}

function objectDestructure(patient, type){
    let newList = ""
    if(typeof(patient) === 'undefined' || patient.length === 0){
        return newList
    } 

    const { nic } = patient
    if(nic){
        if(type === "nic"){
            const { nicno } = nic;
            //console.log(nicno)
            return nicno.toString()
        }
    }else{
        return newList
    }
}

function getAge(patient){
    let age = null
    if(typeof(patient) === 'undefined' || patient.length === 0){
        return age
    } 

    const { birthday } = patient.user
    const onlyYear = birthday.split("/")[0]
    const currentYear = new Date().getFullYear()
    age =  (currentYear - parseInt(onlyYear))
    console.log(age)
    return age
}

function getWardId(wards, wardName){
    const wardId = wards.filter( p=> p.name === wardName)
    //console.log(wardId)
    return wardId[0]._id
}
