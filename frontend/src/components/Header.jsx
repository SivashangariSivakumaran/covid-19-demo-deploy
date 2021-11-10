import React, {useEffect, useState} from 'react'
import { Navbar, Nav, Container, NavDropdown, Dropdown} from 'react-bootstrap'
import { LinkContainer,Link } from 'react-router-bootstrap';
import {  useSelector } from 'react-redux';

function Header() {
    const userDetails = useSelector(state => state.auth);
    const usertoken = userDetails.token
    let auth = "";
    if(userDetails.loggedIn){
        const { user } = userDetails.data.user
        auth = user
    }

    console.log(userDetails)
    const [userType, setUsertype] = useState('');

    useEffect(() => {
        if(userDetails.loggedIn){
            setUsertype(auth.role)
        }
    },[userType]);

    return (
        <header>
            <Navbar className="back" >
                <Container className='headerContainer'>
                    <Navbar.Brand><h2 class="sitename">Covid-19 Patient Tracker</h2></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        
                        {!userDetails.loggedIn && <LinkContainer to = '/signin'>
                            <Nav.Link className = 'navbar-item'><span>Login</span></Nav.Link>
                        </LinkContainer>}

                        {userDetails.loggedIn && <LinkContainer to = '/logout'>
                            <Nav.Link className = 'navbar-item'><span>Log Out</span></Nav.Link>
                        </LinkContainer>}

                        {userDetails.loggedIn && userType === 'patient' && <LinkContainer to = '/hospital/patientProfile'>
                            <Nav.Link className = 'navbar-item'><span>Profile</span></Nav.Link>
                        </LinkContainer>}

                        {userDetails.loggedIn && userType === 'patient' && <LinkContainer to = {'/resetpasswordloggedin'}>
                            <Nav.Link className = 'navbar-item'><span>Reset Password</span></Nav.Link>
                        </LinkContainer>}

                        
                        {userDetails.loggedIn && userType === 'hospitalAdmin' && <Dropdown className="my-2 dropdown">
                        {/* {auth.loggedIn &&  <Dropdown className="my-2 dropdown"> */}
                        <Dropdown.Toggle   className='dropdown-toogle'>Hospital Admin</Dropdown.Toggle>

                        <Dropdown.Menu  className='dropdown-menu'>
                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/dashboard'>
                                    <Nav.Link ><span>Dashboard</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = {'/resetpasswordloggedin'}>
                                    <Nav.Link ><span>Reset Password</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/admittedPatients'>
                                    <Nav.Link ><span>Admitted Patients</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/patients'>
                                    <Nav.Link ><span>Patients</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/addPcrResults'>
                                    <Nav.Link ><span>Add PCR Results</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/aprovePcrResults'>
                                    <Nav.Link ><span>Aprove PCR Results</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/searchPCR'>
                                    <Nav.Link ><span>Search PCR</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>
                            
                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/acceptanceWaiting'>
                                    <Nav.Link ><span>Acceptance Waiting</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/wards'>
                                    <Nav.Link ><span>Wards</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/addHospitalStaff'>
                                    <Nav.Link ><span>Add Staffs</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>


                        </Dropdown.Menu>
                        </Dropdown>}

                        {userDetails.loggedIn && userType === 'hospital user' && <Dropdown className="my-2 dropdown">
                        {/* {auth.loggedIn &&  <Dropdown className="my-2 dropdown"> */}
                        <Dropdown.Toggle   className='dropdown-toogle'>Hospital Staff</Dropdown.Toggle>

                        <Dropdown.Menu  className='dropdown-menu'>
                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/patients'>
                                    <Nav.Link ><span>Patients</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = {'/resetpasswordloggedin'}>
                                    <Nav.Link ><span>Reset Password</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>
                        

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/addPcrResults'>
                                    <Nav.Link ><span>Add PCR Results</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/searchPCR'>
                                    <Nav.Link ><span>Search PCR</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            {/* <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/wards'>
                                    <Nav.Link ><span>Wards</span></Nav.Link>
                            </LinkContainer></Dropdown.Item> */}
{/* 
                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/healthMinistry/hospital'>
                                    <Nav.Link ><span>Hospitals</span></Nav.Link>
                            </LinkContainer></Dropdown.Item> */}

                            {/* <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/staffs'>
                                    <Nav.Link ><span>Staffs</span></Nav.Link>
                            </LinkContainer></Dropdown.Item> */}


                        </Dropdown.Menu>
                        </Dropdown>}

                        {userDetails.loggedIn && userType === 'admin' && <Dropdown className="my-2 dropdown">
                        {/* {auth.loggedIn &&  <Dropdown className="my-2 dropdown"> */}
                        <Dropdown.Toggle   className='dropdown-toogle'>Admin</Dropdown.Toggle>

                        <Dropdown.Menu  className='dropdown-menu'>
                            {/* <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/patients'>
                                    <Nav.Link ><span>Patients</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>
                            
                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/acceptanceWaiting'>
                                    <Nav.Link ><span>Acceptance Waiting</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/addPcrResults'>
                                    <Nav.Link ><span>Add PCR Results</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/aprovePcrResults'>
                                    <Nav.Link ><span>Aprove PCR Results</span></Nav.Link>
                            </LinkContainer></Dropdown.Item> */}

                            
                        <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/healthMinistry/dashboard'>
                                    <Nav.Link ><span>Dasboard</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = {'/resetpasswordloggedin'}>
                                    <Nav.Link ><span>Reset Password</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/healthMinistry/hospital'>
                                    <Nav.Link ><span>Hospitals</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/healthMinistry/confirmData'>
                                    <Nav.Link ><span>Confirm Data</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>


                        </Dropdown.Menu>
                        </Dropdown>}

                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
        </header>
    )
}

export default Header
