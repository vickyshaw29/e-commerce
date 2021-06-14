import React from 'react'
import {Container,Col,Row} from 'react-bootstrap'
const Footer = () => {
    return (
       <footer style={{backgroundColor:'#343a40',color:'#fff'}}>
           <Container>
               <Row>
                   <Col className="text-center py-3">
                            Copywright &copy; Ekart
                   </Col>
               </Row>
           </Container>
       </footer>
    )
}

export default Footer
