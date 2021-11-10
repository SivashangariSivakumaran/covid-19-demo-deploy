import React, {useEffect, useState} from 'react'
import {Container, Button, Card, Row, Col, Nav, Form, FormControl} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, getPasswordResetState } from '../store/entities/users'
import {  Formik } from 'formik';
import * as Yup from 'yup';
import { ref } from "yup";
import { toastAction } from './../store/toastActions';
import { logout} from '../store/auth';

const ResetPassword = ({match}) => {
    const userDetails = useSelector(state => state.auth);

    const dispatch = useDispatch()
    const token = match.params.token
    const [submitState, setSubmitState] = useState(false)

    const resetPasswordState = useSelector(getPasswordResetState);

    const [ schema, setSchema ] = useState({ 
        password : Yup.string().required('password is required...').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password should atleast be of 6 characters. Should include atleast one simple letter, capital letter, special character and number"),
        confirmPassword : Yup.string().required("Please confirm your password").oneOf([ref("password")], "Passwords do not match")
    });

    const [initialValues, setInitialValues ] = useState({
        password : '',
        confirmPassword : ''
    });

    const submitForm = (values) => {
        const {password, confirmPassword} = values

        const result = {
            password: password,
            passwordConfirm: confirmPassword
        }

        dispatch(resetPassword(result, token))
        setSubmitState(true)
      //  dispatch(toastAction({ message: "Password reset successfully...", type: 'info' }));
        // console.log(token)
        // console.log(result)
    }

    useEffect(() => {
        if(resetPasswordState.isPasswordReset && submitState){
            setSubmitState(false)
            dispatch(toastAction({ message: "Password Reset Successfully...", type: 'info' }));

            if(userDetails.loggedIn){
                dispatch(logout())
                window.location = '/signin';
            }
            else{
                window.location = '/signin'
            }
        }
    },[resetPasswordState]);

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
            <h3 style={{textAlign:'center', fontWeight:'700'}}>ADD NEW PASSWORD</h3>
    
    
        <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
            <div className="vs-col vs-xs- vs-sm-12 vs-lg-6"style={{margin:'0%',width:'100%', position:'relative'}}>
                <div className="set-animation from-left animate">
                    <Form.Group controlId = 'password' className='m-2' style={{width:'100%'}}>
                        <Form.Label className = 'form-label m-2'>Password</Form.Label>
                            <Form.Control 
                                className='textBox'
                                type='password'
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                placeholder='password'
                                isValid={touched.password && !errors.password}
                                isInvalid={!!errors.password}
                                size = {'lg'} 
                                autoComplete='disabled'
                            />
                            <FormControl.Feedback type='invalid'>{errors.password}</FormControl.Feedback>
                    </Form.Group>
                </div>
            </div>

            <div className="vs-col vs-xs- vs-sm-12 vs-lg-6"style={{margin:'0%',width:'100%', position:'relative'}}>
                <div className="set-animation from-left animate">
                    <Form.Group controlId = 'confirmPassword' className='m-2' style={{width:'100%'}}>
                        <Form.Label className = 'form-label m-2'>Confirm Password</Form.Label>
                            <Form.Control 
                                className='textBox'
                                type='password'
                                name='confirmPassword'
                                value={values.confirmPassword}
                                onChange={handleChange}
                                placeholder='confirm password'
                                isValid={touched.confirmPassword && !errors.confirmPassword}
                                isInvalid={!!errors.confirmPassword}
                                size = {'lg'} 
                                autoComplete='disabled'
                            />
                            <FormControl.Feedback type='invalid'>{errors.confirmPassword}</FormControl.Feedback>
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

export default ResetPassword
