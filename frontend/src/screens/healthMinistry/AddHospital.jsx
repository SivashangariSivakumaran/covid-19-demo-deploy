import Container from 'react-bootstrap/Container';
import {Form, Button, Col, FormControl, Row} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHospital, getHospitalAddedStatus} from '../../store/entities/hospitals';
import { toastAction } from '../../store/toastActions';
import Box from '@mui/material/Box';

export default function AddHospital(props) {
    const validateContact = (contact) => {
        const reg = /^(0)([0-9]{9})$/;
        return reg.test(contact);
    }

    const validateName = (name) =>{
        const reg = /^[A-Za-z\b]+$/;
        return reg.test(name)
    } 
    
    const validateCity = (city) =>{
        const reg = /^[A-Za-z\b]+$/;
        return reg.test(city)
    } 

    const dispatch = useDispatch();
    const hospitalAddedStatus = useSelector(getHospitalAddedStatus);

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [userState, setUserState] = useState(false)


    const submitHandler = (e) => {
      e.preventDefault();
      let hospital= {
          name: name,
          Contact: [contact],
          address: {
              district : district,
              city : city,
              province : province
          },
      }
      if (!validateName(name)) {
        alert("Hospital Name should not include digits");
        }
        else if (!validateContact(contact)) {
            alert("Enter valid telephone number");
        }
        else if (!validateCity(city)) {
            alert("City should not include digits");
        }else{
            dispatch(addHospital(hospital));
            setUserState(true);
        }     
    };

    useEffect(() => {
        if(hospitalAddedStatus.hospitalAdded && userState){
          setUserState(false)
          dispatch(toastAction({ message: "Hospital Added Successfully", type: 'info' }))
            window.location.href = "/healthMinistry/hospital";
        }
     },[dispatch, hospitalAddedStatus])
        
    return (
           <Container > 
        <Box sx={{ bgcolor: '#cfe8fc', height: '850px' }}>
        <div className="col-10 mx-auto banner text-center"><br/>
            <h3 className="text-capitalize">
                    <strong className="banner-title">Want to Add NEW HOSPITAL?</strong></h3></div>
                <Form className="form" onSubmit={submitHandler}>
                    <Form.Group as={Col} controlId='name'>
                    <Form.Label class="float-left" className = 'form-label'><strong>HOSPITAL NAME:</strong></Form.Label>
                    <Col sm={12}>
                    <Form.Control 
                        type='text'
                        id='name' 
                        placeholder='Enter Hospital Name'
                        onChange={(e) => setName(e.target.value)}
                        // size='sm'
                        required
                    />
                    </Col>
                    </Form.Group>

                    <Form.Group as={Col}  controlId='contact'>
                    <Form.Label class="float-left" className = 'form-label' ><strong>CONTACT NUMBER:</strong></Form.Label>
                    <Col sm={12}>
                    <Form.Control 
                        type='number'
                        id='contact'
                        placeholder="0XXXXXXXXX"  
                        // size = 'sm'
                        required
                        onChange={(e) => setContact(e.target.value)} 
                    />  
                    <small>*Should start with 0 <br/>*Should consist of 10 digits</small>
                    </Col>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formCity">
                                <Form.Label class="float-left" className = 'form-label'><strong>CITY:</strong></Form.Label>
                                <Col sm={12}>
                                <Form.Control
                                type="text"
                                id="city"
                                // size = 'sm'
                                required 
                                placeholder='Enter City'
                                onChange={(e) => setCity(e.target.value)}/>
                                </Col>
                    </Form.Group>
                    
                    <Form.Group  as={Col} controlId="formDistrict">
                                <Form.Label class="float-left" className = 'form-label'><strong>DISTRICT:</strong></Form.Label>
                                <Col sm={12}>
                                <Form.Control 
                                as="select" 
                                id="district" 
                                onChange={(e) => setDistrict(e.target.value)}
                                required>
                                    <option value="" disabled selected >Select Here </option>
                                    <option value="Colombo">Colombo</option>
                                    <option value="Gampaha">Gampaha</option>
                                    <option value="Kalutara">Kalutara</option>
                                    <option value="Kandy">Kandy </option>
                                    <option value="Matale">Matale </option>
                                    <option value="Nuwera-Eliya">Nuwera-Eliya</option>
                                    <option value="Galle">Galle </option>
                                    <option value="Matara">Matara</option>
                                    <option value="Hambantota">Hambantota </option>
                                    <option value="Jaffna">Jaffna </option>
                                    <option value="Mannar">Mannar</option>
                                    <option value="Vavuniya">Vauniya </option>
                                    <option value="Mulathivu">Mulathivu </option>
                                    <option value="Kilinochchi">Kilinochchi </option>
                                    <option value="Batticaloa">Batticaloa</option>
                                    <option value="Trincomalee">Trincomalee  </option>
                                    <option value="Kurunegala">Kurunegala   </option>
                                    <option value="Puttalam">Puttalam  </option>
                                    <option value="Anuradhapura">Anuradhapura   </option>
                                    <option value="Polonnaruwa">Polonnaruwa   </option>
                                    <option value="Badulla">Badulla  </option>
                                    <option value="Monaragala">Monaragala   </option>
                                    <option value="Rathnapura">Rathnapura   </option>
                                    <option value="Kegalle">Kegalle </option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Col}  controlId="formProvince">
                                <Form.Label class="float-left" className = 'form-label' ><strong>PROVINCE:</strong></Form.Label>
                                <Col sm={12}>
                                <Form.Control 
                                as="select" 
                                id="province" 
                                onChange={(e) => setProvince(e.target.value)}
                                required>
                                    <option value="" disabled selected >Select Here </option>
                                    <option value="Central">Central Province</option>
                                    <option value="Eastern">Eastern Province</option>
                                    <option value="Northern">Northern Province</option>
                                    <option value="Southern">Southern Province </option>
                                    <option value="Western">Western Province </option>
                                    <option value="North Western">North Western Province </option>
                                    <option value="North Central">North Central Province </option>
                                    <option value="Uva">Uva Province </option>
                                    <option value="Sabaragamuwa">Sabaragamuwa Province </option>
                                    
                                    </Form.Control>
                                </Col>
                                </Form.Group>
                            
                        <div class="horizontal-center"> 
                        <Button variant="primary" type="submit">ADD NEW HOSPITAL</Button>
                        </div>
                </Form>
                </Box>
            </Container>            
        );
    }
