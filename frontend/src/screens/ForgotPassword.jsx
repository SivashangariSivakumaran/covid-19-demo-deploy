import React, {useEffect, useState} from 'react'
import {Container, Button, Card, Row, Col, Nav, Form, FormControl} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, getEmailSentState } from '../store/entities/users'
import {  Formik } from 'formik';
import * as Yup from 'yup';
import { toastAction } from './../store/toastActions';

const ForgotPassword = () => {

    const dispatch = useDispatch()

    const emailSentState = useSelector(getEmailSentState);

    const [submitState, setSubmitState] = useState(false)

    const [ schema, setSchema ] = useState({ 
        email : Yup.string().required('email is required...').matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Invalid Email. EX :- john@gmail.com"),
    });

    const [initialValues, setInitialValues ] = useState({
        email: ''
    });

    const submitForm = (values) => {
        const {email} = values

        const result = {
            email: email
        }

        dispatch(forgotPassword(result))
        setSubmitState(true)

    }

    useEffect(() => {
        if(emailSentState.isEmailSent && submitState){
            setSubmitState(false)
            dispatch(toastAction({ message: "Email sent Successfully...", type: 'info' }));
        }
    },[emailSentState ]);

    return (
        
    <Container className=' formContainer mt-3'>
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
        <h3 style={{textAlign:'center', fontWeight:'700'}}>FORGOT PASSWORD</h3>


    <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
        <div className="vs-col vs-xs- vs-sm-12 vs-lg-6"style={{margin:'0%',width:'100%', position:'relative'}}>
            <div className="set-animation from-left animate">
                <Form.Group controlId = 'firstName' className='m-2' style={{width:'100%'}}>
                    <Form.Label className = 'form-label m-2'>Email</Form.Label>
                        <Form.Control 
                            className='textBox'
                            type='email'
                            name='email'
                            value={values.email}
                            onChange={handleChange}
                            placeholder='Email'
                            isValid={touched.email && !errors.email}
                            isInvalid={!!errors.email}
                            size = {'lg'} 
                            autoComplete='disabled'
                        />
                        <FormControl.Feedback type='invalid'>{errors.email}</FormControl.Feedback>
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
    </Formik>
   </Container>
  )
}

export default ForgotPassword
