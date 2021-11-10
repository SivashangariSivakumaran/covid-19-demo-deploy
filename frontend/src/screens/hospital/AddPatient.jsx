import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button, Container, Col, Row} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getUserAddedStatus} from '../../store/entities/users';
import { toastAction } from '../../store/toastActions';
import Box from '@mui/material/Box';


export default function AddPatient(props) {
    const current = new Date().toISOString().split("T")[0]
    console.log(current)
    const validateFirstName = (firstName) =>{
        const reg = /^[A-Za-z\b]+$/;
        return reg.test(firstName)
    }

    const validateLastName = (lastName) =>{
        const reg = /^[A-Za-z\b]+$/;
        return reg.test(lastName)
    }

    const validateEmail = (email) => {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(email);
    }

    const validatePassword = (password) => {
        const regpw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regpw.test(password);
    }
    const validateContact = (contact) => {
        const reg = /^(0)([0-9]{9})$/;
        return reg.test(contact);
    }

    const validateCity = (city) =>{
        const reg = /^[A-Za-z\b]+$/;
        return reg.test(city)
    }

    function validateNIC(nicno) {
        const regex = /^([0-9]{9})(V|v)$/;
        const regex2 = /^([0-9]{12})$/;
    
        if (regex.test(nicno)) {
            return regex.test(nicno);
        }
    
        else if (regex2.test(nicno)) {
            return regex2.test(nicno);
        }
    }

    const dispatch = useDispatch();
    const userAddedStatus = useSelector(getUserAddedStatus);
    const [userState, setUserState] = useState(false)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [contact, setContact] = useState('');
    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [nicno, setNicno] = useState('');
    const [person, setPerson] = useState('');
    
    const submitHandler = (e) => {
      e.preventDefault();
      let user= {
        name: {
            firstName: firstName,
            lastName: lastName
        },
        email: email,
        birthday: birthday,
        contact: contact,
        address:{
            line1: line1,
            line2: line2,
            city: city,
            province: province
        },
        password: password,
        passwordConfirm: passwordConfirm,
        role: 'patient',
        nic:{
          nicno: nicno,
          person: birthday.split('-')[0]
        },
        //hospital_id: window.location.pathname.split('/')[3],
      }

        if (!validateFirstName(firstName)) {
        alert("First Name should not include digits");
        }
        else if (!validateLastName(lastName)) {
            alert("Last Name should not include digits");
        }
        else if (!validateEmail(email)) {
            alert("Enter valid email address");
        }
        else if (!validateContact(contact)) {
            alert("Enter valid telephone number");
        }
        else if (!validateNIC(nicno)) {
            alert("Enter valid NIC number");
        }
        else if (!validateCity(city)) {
            alert("City should not include digits");
        }
        else if (!validatePassword(password)) {
            alert("Enter valid password");
        }
        else if (password != passwordConfirm) {
            alert("Your passwords don't match");
        }
        else{
            dispatch(addUser(user));
            setUserState(true);
            console.log(user);
            //window.location.href = "/healthMinistry/hospital";
    };
    }
    useEffect(() => {
        if(userAddedStatus.userAdded && userState){
            setUserState(false)
            dispatch(toastAction({ message: "Patient Added Successfully", type: 'info' }))
            window.location.href = "/";
        }
        // else{
        //     dispatch(toastAction({ message: "Pattient Adding Failed", type: 'error' }))
        // }
    },[userAddedStatus])

    return (
        <Container fluid > 
                <Box sx={{ bgcolor: '#cfe8fc', height: '1390px' }}>
                <div className="col-10 mx-auto banner text-center"><br/>
                    <h3 className="text-capitalize">
                            <strong className="banner-title">Want to Add NEW PATIENT?</strong></h3></div>
                <Form className="form" onSubmit={submitHandler}>
    
                    <Form.Group as={Col}  controlId='firstName'>
                    <Form.Label className = 'form-label' ><strong>FIRST NAME:</strong> </Form.Label>
                    <Col sm={10}>
                    <Form.Control 
                        type='text'
                        id='firstName' 
                        placeholder='Enter your First Name'
                        required
                        size='sm'
                        onChange={(e) => setFirstName(e.target.value)}
                    /></Col>
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId='lastName'>
                    <Form.Label className = 'form-label'> <strong>LAST NAME:</strong></Form.Label>
                    <Col sm={10}>
                    <Form.Control 
                        type='text'
                        id='lastName' 
                        placeholder='Enter your Last Name'
                        required
                        size='sm'
                        onChange={(e) => setLastName(e.target.value)}
                    /></Col>
                    </Form.Group>

                    <Form.Group as={Col} controlId='email'>
                    <Form.Label class="float-left" className = 'form-label'><strong>EMAIL ADDRESS:</strong></Form.Label>
                    <Col sm={10}>
                    <Form.Control 
                        type='email'
                        id='email' 
                        placeholder='example@gmail.com'
                        required
                        size='sm'
                        onChange={(e) => setEmail(e.target.value)}
                    /></Col>
                    </Form.Group>

                    <Form.Group as={Col} controlId='birthday'>
                    <Form.Label class="float-left" className = 'form-label'><strong>DATE OF BIRTH:</strong></Form.Label>
                    <Col sm={10}>
                    <Form.Control 
                        type='date'
                        id='birthday' 
                        placeholder='Enter Date of Birth'
                        required
                        size='sm'
                        max={current}
                        onChange={(e) => setBirthday(e.target.value)}
                    /></Col>
                    </Form.Group>

                    <Form.Group as={Col} controlId='contact'>
                    <Form.Label class="float-left" className = 'form-label' ><strong>CONTACT NUMBER:</strong></Form.Label>
                    <Col sm={10}>
                    <Form.Control 
                        type='number'
                        id='contact'
                        placeholder="0XXXXXXXXX"  
                        //pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" 
                        required
                        size='sm'
                        onChange={(e) => setContact(e.target.value)} 
                    />
                    <small>*Should start with 0 <br/>*Should consist of 10 digits</small></Col>
                    </Form.Group>

                    <Form.Group as={Col} controlId='nicno'>
                            <Form.Label class="float-left" className = 'form-label' ><strong>NIC NUMBER:</strong></Form.Label>
                            <Col sm={10}>
                            <Form.Control 
                                type='text'
                                id='nicno'
                                placeholder="Enter NIC Number"  
                                required
                                size='sm'
                                onChange={(e) => setNicno(e.target.value)} 
                            />
                            </Col>
                    </Form.Group>

                    <Form.Group as={Col} controlId="line1">
                                <Form.Label class="float-left" className = 'form-label'><strong>ADDRESS:</strong></Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                    type="text"
                                    id="line1"
                                    required 
                                    placeholder='Enter Line 1'
                                    size='sm'
                                    onChange={(e) => setLine1(e.target.value)}/>
                                </Col><br/>
                                <Col sm={10}>
                                    <Form.Control
                                    type="text"
                                    id="line2"
                                    size='sm'
                                    placeholder='Enter Line 2'
                                    onChange={(e) => setLine2(e.target.value)}/></Col>
                    </Form.Group>

                    {/* <Form.Group as={Col} controlId="line2">
                                <Form.Label class="float-left" className = 'form-label'>ADDRESS LINE 2:</Form.Label>
                                <Col sm={10}>
                                <Form.Control
                                type="text"
                                id="line2"
                                size='sm'
                                placeholder='Enter Line 2'
                                onChange={(e) => setLine2(e.target.value)}/></Col>
                    </Form.Group> */}

                    <Form.Group as={Col} controlId="formCity">
                                <Form.Label class="float-left" className = 'form-label'><strong>CITY:</strong></Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                    type="text"
                                    id="city"
                                    required 
                                    size='sm'
                                    placeholder='Enter City'
                                    onChange={(e) => setCity(e.target.value)}/>
                                </Col>
                    </Form.Group>

                    <Form.Group as={Col}  controlId="formProvince">
                                <Form.Label class="float-left" className = 'form-label' ><strong>PROVINCE:</strong></Form.Label>
                                <Col sm={10}>
                                <Form.Control 
                                as="select" 
                                id="province" 
                                onChange={(e) => setProvince(e.target.value)}
                                required>
                                    <option value="" disabled selected>Choose </option>
                                    <option value="Central">Central Province</option>
                                    <option value="Eastern">Eastern Province</option>
                                    <option value="Northern">Northern Province</option>
                                    <option value="Southern">Southern Province </option>
                                    <option value="Western">Western Province </option>
                                    <option value="North Western">North Western Province </option>
                                    <option value="North Central">North Central Province </option>
                                    <option value="Uva">Uva Province </option>
                                    <option value="Sabaragamuwa">Sabaragamuwa Province </option>
                                    
                                    </Form.Control></Col>
                                </Form.Group>

                    <Form.Group as={Col} controlId="password">
                            <Form.Label class="float-left" className = 'form-label'><strong>PASSWORD:</strong></Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                type="password"
                                id="password"
                                required 
                                size='sm'
                                placeholder='Enter Password'
                                onChange={(e) => setPassword(e.target.value)}/>
                            </Col><br/>
                            <Col sm={10}>
                                <Form.Control
                                type="password"
                                id="passwordConfirm"
                                required 
                                size='sm'
                                placeholder='Re enter Password'
                                onChange={(e) => setPasswordConfirm(e.target.value)}/>
                                <small>*Password should atleast be of 6 characters <br/>
                           *Should include atleast one simple letter, capital letter, special character and number </small> 
                            </Col>
                    </Form.Group>

                    {/* <Form.Group as={Col} controlId="passwordConfirm">
                                <Form.Label class="float-left" className = 'form-label'>RE-ENTER PASSWORD:</Form.Label>
                                <Col sm={10}>
                                <Form.Control
                                type="password"
                                id="passwordConfirm"
                                required 
                                size='sm'
                                placeholder='Re enter Password'
                                onChange={(e) => setPasswordConfirm(e.target.value)}/></Col>
                    </Form.Group> */}
                        <div>
                        <Button variant="primary" type="submit">ADD PATIENT</Button>
                        </div>
                
                </Form>
                </Box> 
            </Container>
            // </div>
            
        );
    }
