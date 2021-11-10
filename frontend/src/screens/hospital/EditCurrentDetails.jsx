import React, {useEffect, useState} from 'react'
import {Container, Button, Card, Row, Col, Nav, Form, FormControl} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {  Formik } from 'formik';
import * as Yup from 'yup';
import {updateDrugsInDB, updateSymptomsInDB} from '../../store/entities/patients';

const EditCurrentDetails = ({match,history}) => {
    const dispatch = useDispatch()
   // const patientId = (window.location.href.split('/')).pop()
   const medicalHistoryId = match.params.id

    const auth = useSelector(state => state.auth);

    const [ schema, setSchema ] = useState({ 
        symptom0: Yup.string().required("Symptom is required..."),
        drug0: Yup.string().required("Drug Details is required...")
    });

    const [initialValues, setInitialValues ] = useState({
        symptom0: '',
        drug0: ''
    });

    const [ symptoms, setSymptoms ] = useState([{}]);
  //  console.log(symptoms)
    const [ drugs, setDrugs ] = useState([{}]);
    const formElements = useState(4);  

    const [updateSymptoms, setUpdateSymptoms] = useState(true);

    const UpdateSymptoms =(value, sym)=>{
        for (var i =0; i< sym.length ; i++){
            var v = sym[i]
            if (!v.description){
                setUpdateSymptoms(true);
                return
            }else if (v.description == ""){
                setUpdateSymptoms(true);
                return
            } 
            setUpdateSymptoms(false);
        }

    }

    const handleSymptomsAdded = () => {
        const newSymptom = [...symptoms, {}];
        const newSchema = {...schema, 
                            [`symptom${symptoms.length}`]: Yup.string().required("Symptom is required..."),
        };

        const newInitialValues = {...initialValues,
                             [`symptom${symptoms.length}`]: ''
        };
        setSymptoms(newSymptom);
        setSchema(newSchema);
        setInitialValues(newInitialValues);

        for (var i =0; i< newSymptom.length ; i++){
            var v = newSymptom[i]
            if (!v.description){
                setUpdateSymptoms(true);
                return
            }else if (v.description == ""){
                setUpdateSymptoms(true);
                return
            } 
            setUpdateSymptoms(false);
        }

    }


    const handleSymptomsDeleted = (values) => {
        let newSymptoms = [...symptoms];
        newSymptoms = newSymptoms.splice(0,symptoms.length-1);
        const newSchema = {...schema};
        //Deleting from schema
        delete newSchema[`symptom${symptoms.length-1}`];

        const newInitialValues = {...initialValues};
        //Deleting from initial values
        delete newInitialValues[`symptom${symptoms.length-1}`];

        //Deleting from values of Formik
        delete values[`symptom${symptoms.length - 1}`];

        setInitialValues(newInitialValues);
        setSymptoms (newSymptoms);
        setSchema(newSchema);  

        for (var i =0; i< newSymptoms.length ; i++){
            var v = newSymptoms[i]
            if (!v.description){
                setUpdateSymptoms(true);
                return
            }else if (v.description == ""){
                setUpdateSymptoms(true);
                return
            } 
            setUpdateSymptoms(false);
        }
    }

    const [updateDrugs, setUpdateDrugs] = useState(true);


    const UpdateDrugs =(value, sym)=>{
        for (var i =0; i< sym.length ; i++){
            var v = sym[i]
            if (!v.description){
                setUpdateDrugs(true);
                return
            }else if (v.description == ""){
                setUpdateDrugs(true);
                return
            } 
            setUpdateDrugs(false);
        }

    }


    const handleDrugsAdded = () => {
        const newDrug = [...drugs, {}];
        const newSchema = {...schema, 
                            [`drug${drugs.length}`]: Yup.string().required("Drug is required..."),
        };

        const newInitialValues = {...initialValues,
                             [`drug${drugs.length}`]: ''
        };
        setDrugs(newDrug);
        setSchema(newSchema);
        setInitialValues(newInitialValues);

        for (var i =0; i< newDrug.length ; i++){
            var v = newDrug[i]
            if (!v.description){
                setUpdateDrugs(true);
                return
            }else if (v.description == ""){
                setUpdateDrugs(true);
                return
            } 
            setUpdateDrugs(false);
        }
    }


    const handleDrugsDeleted = (values) => {
        let newDrugs = [...drugs];
        newDrugs = newDrugs.splice(0,drugs.length-1);
        const newSchema = {...schema};
        //Deleting from schema
        delete newSchema[`drug${drugs.length-1}`];

        const newInitialValues = {...initialValues};
        //Deleting from initial values
        delete newInitialValues[`drug${drugs.length-1}`];

        //Deleting from values of Formik
        delete values[`drug${drugs.length - 1}`];

        setInitialValues(newInitialValues);
        setDrugs (newDrugs);
        setSchema(newSchema);
        
        for (var i =0; i< newDrugs.length ; i++){
            var v = newDrugs[i]
            if (!v.description){
                setUpdateDrugs(true);
                return
            }else if (v.description == ""){
                setUpdateDrugs(true);
                return
            } 
            setUpdateDrugs(false);
        }
        

    }

    const updateSymptom = () =>{
        let symList = [symptoms.length];
        for ( var i = 0; i< symptoms.length; i++){
            symList[i] = symptoms[i].description;
        }
        const data = { description: symList}
        dispatch(updateSymptomsInDB(data, medicalHistoryId))
    } 

    const updateDrug = () =>{
        let drugList = [drugs.length];
        for ( var i = 0; i< drugs.length; i++){
            drugList[i] = drugs[i].description;
        }
        const data = { description: drugList}
        dispatch(updateDrugsInDB(data, medicalHistoryId))
    }



    useEffect(() => {
        ////////////
    }, [dispatch])

    return (
        <>
        {auth.loggedIn ? 
        <Container className=' formContainer mt-3'>
        <Formik
            validationSchema = {Yup.object().shape(schema)}
           // onSubmit = {submitForm}
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
            <Form className='mt-2' noValidate onSubmit={handleSubmit}>
            <h2 className = 'heading text-center font-weight-bold mt-4'>UPDATE PATIENT MEDICAL DATA</h2>

            <Row className='m-5'>
                <Col>
                {symptoms.map( v =>{
                    const index = symptoms.findIndex(va => va === v );
                    return (
                    <>
                        <Row className=''>
                            <Col>
                                <Form.Group controlId= {`validationFormik${formElements + index + 1 >= 10 ? `${formElements + index + 1}`: `0${formElements + index + 1}` }`}>
                                    <Form.Label >Symptoms</Form.Label>
                                    <Form.Control 
                                        className = 'textBox'
                                        type='text'
                                        name={`symptom${index}`}
                                        value={values[`symptom${index}`]}
                                        onChange={(e) => {
                                            handleChange(e);
                                            const updated = {...symptoms[index]};
                                            updated.description= e.target.value;
                                            const newSymptoms = [...symptoms];
                                            newSymptoms[index] = updated;
                                            setSymptoms(newSymptoms);
                                            if ( e.target.value != ""){
                                                UpdateSymptoms(false,newSymptoms);
                                            }else{
                                                UpdateSymptoms(true, newSymptoms);
                                            }
                                            
                                        }}
                                        placeholder='Symptom'
                                        isValid={touched[`symptom${index}`] && !errors[`symptom${index}`]}
                                        isInvalid={!!errors[`symptom${index}`]}
                                        size = {'lg'} 
                                    />
                                    <FormControl.Feedback type='invalid'>{errors[`symptom${index}`]}</FormControl.Feedback>
                                </Form.Group>
                            </Col>

                        <Col className='mt-2'>
                            { index === 0 && <div>
                            <Button onClick= {() => handleSymptomsAdded()} className='mx-2 my-4' variant='primary'>+</Button>
                            { symptoms.length >1 && index ===0 && <Button onClick= {() => handleSymptomsDeleted(values)} className='mx-2 my-4' variant='danger'>-</Button>}
                            </div>}
                        </Col></Row></>


                )})}

                    <Button onClick= {() => updateSymptom()} 
                            className='mx-2 my-4' 
                            variant='primary'
                            disabled={updateSymptoms}
                    >Update Symptoms</Button>

                </Col>

                <Col>
                {drugs.map( v =>{
                    const index = drugs.findIndex(va => va === v );
                    return (
                    <>
                        <Row className=''>
                            <Col>
                            <Form.Group controlId= {`validationFormik${formElements + index + 1 >= 10 ? `${formElements + index + 1}`: `0${formElements + index + 1}` }`}>
                                <Form.Label className = 'form-label'>Drugs</Form.Label>
                                <Form.Control 
                                    className = 'textBox'
                                    type='text'
                                    name={`drug${index}`}
                                    value={values[`drug${index}`]}
                                    onChange={(e) => {
                                        handleChange(e);
                                        const updated = {...drugs[index]};
                                        updated.description = e.target.value;
                                        const newDrugs = [...drugs];
                                        newDrugs[index] = updated;
                                        setDrugs(newDrugs);
                                        if ( e.target.value != ""){
                                            UpdateDrugs(false,newDrugs);
                                        }else{
                                            UpdateDrugs(true, newDrugs);
                                        }
                                    }}
                                    placeholder='Drug'
                                    isValid={touched[`drug${index}`] && !errors[`drug${index}`]}
                                    isInvalid={!!errors[`drug${index}`]}
                                    size = {'lg'} 
                                />
                                <FormControl.Feedback type='invalid'>{errors[`drug${index}`]}</FormControl.Feedback>
                            </Form.Group>
                        </Col>

                        <Col className='mt-2'>
                            { index === 0 && <div>
                            <Button onClick= {() => handleDrugsAdded()} className='mx-2 my-4' variant='primary'>+</Button>
                            { drugs.length >1 && index ===0 && <Button onClick= {() => handleDrugsDeleted(values)} className='mx-2 my-4' variant='danger'>-</Button>}
                            </div>}
                        </Col></Row></>

                )})}


                    <Button onClick= {() => updateDrug()} 
                            className='mx-2 my-4' 
                            variant='primary'
                            disabled={updateDrugs}
                    >Update Drugs</Button>
                </Col>

                </Row>
    
            </Form>
            )}
        </Formik> 
        </Container>: history.push('/')}
        </>
    )
}
            

export default EditCurrentDetails
