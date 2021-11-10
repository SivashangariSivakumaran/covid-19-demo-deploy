import React from 'react'
import { useLocation } from "react-router-dom";
import { Container, Card} from 'react-bootstrap'

const PcrView = () => {
    const location = useLocation();
    const result = location.state.pcr
    console.log(location.state.pcr)
    return (
        <Container className=' formContainer mt-3'>
            {result.length > 0 ? 
            <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
                {result.map(p=> 
                <div className="vs-col vs-xs- vs-sm-12 vs-lg-6"style={{margin:'0%',width:'100%', position:'relative'}}>
                    <div className="set-animation from-left animate">
                        <Card  className="m-2" bg="#ffffff" text="black" style={{ width: '100%'}}>
                            <ul className="profile-info-list mt-2">
                                <li className="title ">PCR Test</li>
                                <li>
                                    <div className="field">Name:</div>
                                    <div className="value">{p.name.firstName +" "+ p.name.lastName}</div>
                                </li>
                                <li>
                                    <div className="field">Contact Number:</div>
                                    <div className="value">{p.contactNumber}</div>
                                </li>
                                <li>
                                    <div className="field">Result:</div>
                                    <div className="value">{p.result}</div>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </div>)}
            </div> : <h1>No Data</h1>}
       </Container>
    )
}

export default PcrView
