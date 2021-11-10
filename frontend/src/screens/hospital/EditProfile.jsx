import React, {useEffect, useState} from 'react'
import {Container, Button, Card, Row, Col, Nav, Form, FormControl} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {  Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
//import { updateUser } from '../../store/entities/users';
import { updateUser } from '../../store/auth';
//import  { getPatientById,  updatePatient} from '../../store/entities/patients';
import { toastAction } from '../../store/toastActions';

const EditProfile = ({match, history}) => {

    const dispatch = useDispatch()
    const patientId = match.params.id

   // const auth = useSelector(state => state.auth);
   // console.log(auth)

    const userDetails = useSelector(state => state.auth);
    const { user } = userDetails.data.user
    const patient = user

   // console.log(patient)

   const districts = [{id:'0', name:'Ampara'},{ id:'1', name:'Anuradhapura'},{id:'2',name:'Badulla'},
   {id:'3', name:'Batticaloa'},{id:'4', name:'Colombo'},{id:'5', name:'Galle'},{id:'6', name:'Gampaha'}, 
   {id:'7', name:'Hambanthota'},{id:'8', name:'Jaffna'},{id:'9', name:'Kalutara'},{id:'10', name:'Kandy'},
   {id:'11', name:'Kegalle'},{id:'12', name:'Kilinochchi'},{id:'13', name:'Kurunegala'},{id:'14', name:'Mannar'},
   {id:'15', name:'Matale'},{id:'16', name:'Matara'},{id:'17', name:'Monaragala'},{id:'18', name:'Mullativu'},
   {id:'19', name:'Nuwara Eliya'},{id:'20', name:'Polonnaruwa'},{id:'21', name:'Puttalam'},
   {id:'22', name:'Ratnapura'},{id:'23', name:'Trincomalee'},{id:'24', name:'Vavuniya'},  ]

   const [currentDistrict, setDistrict] = useState()
   console.log(currentDistrict)
  

    const { address, birthday, contactNo, name } = patient
    const birthDay = birthday.split("-")
    const dateFormat = birthDay[0]+"-"+birthDay[1]+"-"+birthDay[2][0]+birthDay[2][1]

    const { line1, line2, city, district} = address
    const districtId = getDistrict(districts, district)
    //setDistrict(districtId)
    console.log(districtId)
    const { firstName, lastName} = name


    const [ schema, setSchema ] = useState({ 
        first_name : Yup.string().required('First Name is required...'),
        last_name : Yup.string().required("Last Name is required..."),
        Tel_number : Yup.string().matches(/^(?:7|0|(?:\+94))[0-9]{9,9}$/, 'Invalid Phone Number. Ex:- 0123458907')
                        .required('Phone number is required...'),
       // address: Yup.string().required('Address is required'),
        line1: Yup.string().required('Address is required'),
        line2: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required')


    });

    const [initialValues, setInitialValues ] = useState({
        first_name: firstName,
        last_name: lastName,
        Tel_number: contactNo,
        line1: line1,
        line2: line2,
        city: city,
        birthday: dateFormat,
        district: currentDistrict
    });

    const submitForm = (values) => {
        const {first_name, last_name, Tel_number, birthday, line1, line2, city } = values;
        //const dis = districts[currentDistrict].name
        let patientDistrict = ''
        if(typeof(currentDistrict) === 'number'){
            patientDistrict  = districts[currentDistrict].name
        }else{
            patientDistrict  = currentDistrict
        }
        const Result = {
                name : {
                    firstName: first_name,
                    lastName : last_name,
                },
                contactNo : parseInt(Tel_number),
                birthday: birthday,
                address : {
                    line1: line1,
                    line2: line2,
                    city: city,
                    district: patientDistrict 
                },
              //  city,
              //  patientDistrict ,
        }
        console.log(Result)
        dispatch(updateUser(Result))
      //  dispatch(updatePatient(Result, patientId));
        //dispatch(toastAction({ message: "Profile Updated Successfully", type: 'info' }))
    }


    useEffect(() => {
        // const fetchPatient = async () => {
        //     const {data} = await axios.get(`http://localhost:8000/api/v1/patients/${patientId}`)
        //     setPatient(data.data)
        // }

        // fetchPatient()
    }, [dispatch])

    return (

            <Container className=' formContainer mt-3'>
                 {userDetails.loggedIn ? 
            <Formik
                validationSchema = {Yup.object().shape(schema)}
                onSubmit = {submitForm}
                initialValues = {initialValues}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    dirty,
                    errors
                }) => (
                <Form noValidate onSubmit={handleSubmit}>
                <h3 style={{textAlign:'center', fontWeight:'700'}}>EDIT PATIENT PERSONAL DETAILS</h3>
    
       
            <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
                <div className="vs-col vs-xs- vs-sm-12 vs-lg-6"style={{margin:'0%',width:'100%', position:'relative'}}>
                    <div className="set-animation from-left animate">
                        <Form.Group controlId = 'firstName' className='m-2' style={{width:'100%'}}>
                            <Form.Label className = 'form-label m-2'>First Name</Form.Label>
                                <Form.Control 
                                    className='textBox'
                                    type='text'
                                    name='first_name'
                                    value={values.first_name}
                                    onChange={handleChange}
                                    placeholder='First Name'
                                    isValid={touched.first_name && !errors.first_name}
                                    isInvalid={!!errors.first_name}
                                    size = {'lg'} 
                                    autoComplete='disabled'
                                />
                                <FormControl.Feedback type='invalid'>{errors.first_name}</FormControl.Feedback>
                        </Form.Group>
                    </div>
                </div>
    
                <div className="vs-col vs-xs- vs-sm-12 vs-lg-6"style={{margin:'0%',width:'100%', position:'relative'}}>
                    <div className="set-animation from-left animate">
    
                        <Form.Group controlId = 'lastName' className='m-2 float-right' style={{width:'100%', float:'right'}}>
                        <Form.Label className = 'form-label m-2'>Last Name</Form.Label>
                            <Form.Control 
                                className='textBox'
                                type='text'
                                name='last_name'
                                value={values.last_name}
                                onChange={handleChange}
                                placeholder='Last Name'
                                isValid={touched.last_name && !errors.last_name}
                                isInvalid={!!errors.last_name}
                                size = {'lg'} 
                                autoComplete = 'disabled'
                            />
                            <FormControl.Feedback type='invalid'>{errors.last_name}</FormControl.Feedback>
                        </Form.Group>
                    </div>
                </div>
            </div>

            <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
                <div className="vs-col vs-xs- vs-sm-12 vs-lg-6"style={{margin:'0%',width:'100%', position:'relative'}}>
                    <div className="set-animation from-left animate">
                        <Form.Group controlId = 'telNumber' className='m-2 float-right' style={{width:'100%', float:'right'}}>
                            <Form.Label className = 'form-label'>Birthday</Form.Label>
                                <Form.Control 
                                    className='textBox'
                                    type='date'
                                    name='birthday'
                                    value={values.birthday}
                                    onChange={handleChange}
                                    placeholder='Birthday'
                                    isValid={touched.birthday && !errors.birthday}
                                    isInvalid={!!errors.birthday}
                                    size = {'lg'} 
                                    autoComplete = 'off'
                                />
                            <FormControl.Feedback type='invalid'>{errors.birthday}</FormControl.Feedback>
                        </Form.Group>
                    </div>
                </div>

                <div className="vs-col vs-xs- vs-sm-12 vs-lg-6"style={{margin:'0%',width:'100%', position:'relative'}}>
                    <div className="set-animation from-left animate">
    
                        <Form.Group controlId = 'telNumber' className='m-2 float-right' style={{width:'100%', float:'right'}}>
                            <Form.Label className = 'form-label'>Telephone Number</Form.Label>
                                <Form.Control 
                                    className='textBox'
                                    type='text'
                                    name='Tel_number'
                                    value={values.Tel_number}
                                    onChange={handleChange}
                                    placeholder='Telephone Number'
                                    isValid={touched.Tel_number && !errors.Tel_number}
                                    isInvalid={!!errors.Tel_number}
                                    size = {'lg'} 
                                    autoComplete = 'off'
                                />
                            <FormControl.Feedback type='invalid'>{errors.Tel_number}</FormControl.Feedback>
                        </Form.Group>
                    </div>
                </div>
            </div>

            <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
                <div className="vs-col vs-xs- vs-sm-12 vs-lg-4"style={{margin:'0%',width:'100%', position:'relative'}}>
                    <div className="set-animation from-left animate">
    
                        <Form.Group controlId = 'address' className='m-2 float-right' style={{width:'100%', float:'right'}}>
                        <Form.Label className = 'form-label'>Line 1</Form.Label>
                            <Form.Control 
                                className='textBox'
                                type='text'
                                name='age'
                                value={values.line1}
                                onChange={handleChange}
                                placeholder='Address'
                                isValid={touched.line1 && !errors.line1}
                                isInvalid={!!errors.line1}
                                size = {'lg'} 
                                autoComplete = 'disabled'
                            />
                            <FormControl.Feedback type='invalid'>{errors.line1}</FormControl.Feedback>
                        </Form.Group>
                    </div>
                </div>

                <div className="vs-col vs-xs- vs-sm-12 vs-lg-4"style={{margin:'0%',width:'100%', position:'relative'}}>
                    <div className="set-animation from-left animate">
    
                        <Form.Group controlId = 'address' className='m-2 float-right' style={{width:'100%', float:'right'}}>
                        <Form.Label className = 'form-label'>Line 2</Form.Label>
                            <Form.Control 
                                className='textBox'
                                type='text'
                                name='age'
                                value={values.line2}
                                onChange={handleChange}
                                placeholder='Address'
                                isValid={touched.line2 && !errors.line2}
                                isInvalid={!!errors.line2}
                                size = {'lg'} 
                                autoComplete = 'disabled'
                            />
                            <FormControl.Feedback type='invalid'>{errors.line2}</FormControl.Feedback>
                        </Form.Group>
                    </div>
                </div>

                <div className="vs-col vs-xs- vs-sm-12 vs-lg-4"style={{margin:'0%',width:'100%', position:'relative'}}>
                    <div className="set-animation from-left animate">
    
                        <Form.Group controlId = 'city' className='m-2 float-right' style={{width:'100%', float:'right'}}>
                        <Form.Label className = 'form-label'>City</Form.Label>
                            <Form.Control 
                                className='textBox'
                                type='text'
                                name='city'
                                value={values.city}
                                onChange={handleChange}
                                placeholder='Address'
                                isValid={touched.city && !errors.city}
                                isInvalid={!!errors.city}
                                size = {'lg'} 
                                autoComplete = 'disabled'
                            />
                            <FormControl.Feedback type='invalid'>{errors.city}</FormControl.Feedback>
                        </Form.Group>
                    </div>
                </div>

                <div className="vs-col vs-xs- vs-sm-12 vs-lg-4"style={{margin:'0%',width:'100%', position:'relative'}}>
                    <div className="set-animation from-left animate">
                        <Form.Group controlId = 'city' className='m-2 float-right' style={{width:'100%', float:'right'}}>
                            <Form.Label >District</Form.Label>
                            <Form.Control 
                                className='textBox'
                                style={{height:'48px'}}
                               // value={values.district}
                                onChange = {(e) => {
                                    setDistrict(e.target.value)
                                }} as="select">
                                {districts.map((c,index) => <option selected={index === values.district ? 'slected': null}>{`${c.name}`}</option>)}
                        </Form.Control>
                        </Form.Group>
                    </div>
                </div>
            </div>

                <br/><br/>
                <div class="col-md-12 text-center">
                    <Button 
                        type='submit'
                        className='mb-3'
                        style={{float:'center'}}
                    >
                    Submit
                    </Button>
                </div>
                </Form>
                )}
            </Formik>: history.push('/')}
            </Container>
        )
}

export default EditProfile

function getDistrict(districtList, district){
    if( typeof(district) !== 'undefined'){
        const value = districtList.filter( p=> p.name === district )
        console.log(value)
        return value.id
    }
    return ''
}

