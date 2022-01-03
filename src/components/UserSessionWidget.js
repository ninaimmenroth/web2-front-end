import React, { Component } from "react";
import { connect } from 'react-redux';
import profilePic from '../pics/pizza.jpeg'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import * as AuthenticationActions from '../actions/AuthenticationActions';
import { bindActionCreators } from "@reduxjs/toolkit";
import { Dropdown } from "bootstrap";
//import style from '../styles/usersessionwidget.module.css';
//import style from "../styles/usersessionwidget.module.css";


const mapStateToProps = state => {
    return state
}

class UserSessionWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    canLogin() {
        const { username, password } = this.state;
        if (username && password) {
            return true;
        }
        return false;
    }

    handleShow() {

        //this.setState({show: true})
        const { showLoginDialogAction } = this.props;
        showLoginDialogAction();
    }

    handleClose() {
        //this.setState({show: false})
        const { hideLoginDialogAction } = this.props;
        hideLoginDialogAction();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
        //console.log(JSON.stringify(this.state));
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        const { authenticateUserAction } = this.props;
        authenticateUserAction(username, password)
    }

    render() {
        const { user, loginPending } = this.props.authReducer;
        var showDialog = this.props.authReducer.showLoginDialog;
        if (showDialog === undefined) {
            showDialog = false;
        }

        let loginButton;
        if (this.canLogin()) {
            loginButton = <Button variant="primary" type="submit" onClick={this.handleSubmit}>Login</Button>
        } else {
            loginButton = <Button variant="primary" type="submit" disabled>Login</Button>
        }

        let widgetButton;
        if (user) {
            const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
            const navIcon = <img src={profilePic} width="50" className="rounded-circle z-depth-0" alt="avatar" />
            const userName = user.username;
            widgetButton =
                (<div>
                    <Nav variant="pills" activeKey="1" onSelect={handleSelect}>
                    <NavDropdown title={navIcon} id="my-top-menu-drop-down">
                        <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                        <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </div>);
        }
        else {
            widgetButton = <Link to="#" onClick={this.handleShow}>
                Login
            </Link>
            /*<a href="*"><i style={{ color: 'black', fontSize: '30px' }} onClick={this.handleShow}
                className="fa fa-user-circle loginMenuText"></i>
            </a>*/
        }
/*
<Nav.Link href="#home" id="my-top-menu-drop-down" className="color_ff">
                        <i className="color_ff fa fa-envelope mr-3 fa-fw"></i>
                    </Nav.Link>
<NavDropdown.Item><i className="fa fa-user fa-fw"></i>: {user.userName}</NavDropdown.Item> <NavDropdown.Divider />
<NavDropdown.Item href="*" onClick={this.handleLogout}>
<i className="fa fa-sign-out fa-fw"></i> Logout</NavDropdown.Item>*/

        return (
            <div>

                {widgetButton}

                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>User ID</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" name='username' onChange={this.handleChange} />

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name='password' onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="Message">
                                <div className="d-flex align-items-center">

                                    {loginButton}
                                    {/*isError && <Form.Label style={{ color: "red" }}>Invalid user ID or password</Form.Label>*/}
                                    {loginPending && <Spinner animation="border" variant="primary" />}
                                </div> </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        Passwort vergessen?
                    </Modal.Footer>
                </Modal>            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showLoginDialogAction: AuthenticationActions.getShowLoginDialogAction,
    hideLoginDialogAction: AuthenticationActions.getHideLoginDialogAction,
    authenticateUserAction: AuthenticationActions.authenticateUser
}, dispatch)

const ConnectedUserSessionWidget = connect(mapStateToProps, mapDispatchToProps)(UserSessionWidget)

export default ConnectedUserSessionWidget;
