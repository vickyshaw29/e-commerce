import React, { useState ,useEffect} from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../actions/user'
import { listProducts } from '../actions/index'

const Header = () => {
    const [key, setkey] = useState('')
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    console.log(userInfo, 'from the header.js')

    const logoutHandler = () => {
        dispatch(userLogout())
    }
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(listProducts(key))
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top" collapseOnSelect >
                <Container>
                    <LinkContainer to="/"><Navbar.Brand>Ekart</Navbar.Brand></LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* <SearchBox/> */}
                        <Form inline onChange={submitHandler}>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2 ml-sm-5" onChange={(e)=>setkey(e.target.value)} />
                            <Button type="submit" variant="outline-success" className='py-2'>Search</Button>
                        </Form>
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'><Nav.Link ><i className="fas fa-shopping-cart"></i>cart</Nav.Link></LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.user.name} id="username">
                                    <LinkContainer to="/Profile" >
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/">
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            ) : (<>
                                <LinkContainer to='/login'><Nav.Link href="/signin"><i className="fas fa-user"></i>signin</Nav.Link></LinkContainer>
                            </>)}
                            {userInfo && userInfo.user.isAdmin && (
                                <NavDropdown title='Admin' id="adminmenu">
                                    <LinkContainer to="/admin/userlist" >
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orders">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{ marginBottom: '6em' }}></div>
        </header>
    )
}

export default Header
