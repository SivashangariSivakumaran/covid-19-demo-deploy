import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
           <Container>
               <Row>
                   <Col className='text-center py-1'>Copyright &copy; Covid-19 Patient Tracker</Col>
               </Row>
           </Container>
        </footer>
    )
}

export default Footer
