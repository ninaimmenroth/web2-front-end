import React, { Component } from "react";
import { connect } from 'react-redux';
import config from '../../config/config'
import profilePic from '../../pics/pizza.jpeg'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import * as AuthenticationActions from '../../actions/AuthenticationActions';
import { bindActionCreators } from "@reduxjs/toolkit";

import style from '../../styles/usersessionwidget.module.css';


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
        this.handleShowLogout = this.handleShowLogout.bind(this);
        this.handleCloseLogout = this.handleCloseLogout.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    canLogin() {
        const { username, password } = this.state;
        if (username && password) {
            return true;
        }
        return false;
    }

    handleShow() {
        const { showLoginDialogAction } = this.props;
        showLoginDialogAction();
    }

    handleClose() {
        const { hideLoginDialogAction } = this.props;
        hideLoginDialogAction();
    }

    handleShowLogout() {
        const { showLogoutDialogAction } = this.props;
        showLogoutDialogAction();
    }

    handleCloseLogout() {
        const { hideLogoutDialogAction } = this.props;
        hideLogoutDialogAction();
    }

    handleLogout() {
        const { logoutAction } = this.props;
        logoutAction();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
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
        var showLogoutDialog = this.props.authReducer.showLogoutDialog;
        if (showDialog === undefined) {
            showDialog = false;
        }

        let loginButton;
        if (this.canLogin()) {
            loginButton = <Button type="submit" onClick={this.handleSubmit}>Login</Button>
        } else {
            loginButton = <Button type="submit" disabled>Login</Button>
        }
        
        let isError = this.props.authReducer.error;
        if (isError === undefined) {
            isError = false;
        }


        let widgetButton;
        if (user) {
            const navIcon = <img src={profilePic} width="50" className="rounded-circle z-depth-0" alt="avatar" />
            const isAdmin = user.isAdministrator;
            widgetButton =
                (<div>
                    <Nav className={style.widgetdesktop} variant="success" activeKey="1">
                        <NavDropdown title={navIcon} id="my-top-menu-drop-down">
                            {isAdmin && <NavDropdown.Item as={Link} to={config.frontendEndpoints.admin}>
                                Adminbereich
                            </NavDropdown.Item>}
                            <NavDropdown.Item as={Link} to={config.frontendEndpoints.profile}>
                                Profil
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="#" onClick={this.handleShowLogout}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className={style.widgetscreen} variant="success" activeKey="1">
                        <NavDropdown title={navIcon} id="my-top-menu-drop-down">
                            {isAdmin && <NavDropdown.Item as={Link} to={config.frontendEndpoints.admin}>
                                Adminbereich
                            </NavDropdown.Item>}
                            <NavDropdown.Item as={Link} to={config.frontendEndpoints.profile}>
                                Profil
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={config.frontendEndpoints.recipeCreate}>
                                Neues Rezept
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="#" onClick={this.handleShowLogout}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </div>);
        }
        else {
            widgetButton = <Link to="#" onClick={this.handleShow}>
                Login
            </Link>
        }


        return (
            <div>

                {widgetButton}

                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>User ID</Form.Label>
                                <Form.Control type="text" placeholder="User ID eingeben" name='username' onChange={this.handleChange} />

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Passwort</Form.Label>
                                <Form.Control type="password" placeholder="Passwort" name='password' onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="Message">
                                <div className="d-flex align-items-center">

                                    {loginButton}
                                    {isError && <Form.Label style={{ color: "red" }}>Invalides UserID oder Passwort</Form.Label>}
                                    {loginPending && <Spinner animation="border" variant="dark" />}
                                </div> </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        Passwort vergessen?
                    </Modal.Footer>
                </Modal>
                <Modal show={showLogoutDialog} onHide={this.handleCloseLogout}>
                    <Modal.Header closeButton>
                        <Modal.Title>Willst du dich wirklich ausloggen?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button onClick={this.handleLogout}>Ja</Button>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showLoginDialogAction: AuthenticationActions.getShowLoginDialogAction,
    hideLoginDialogAction: AuthenticationActions.getHideLoginDialogAction,
    authenticateUserAction: AuthenticationActions.authenticateUser,
    showLogoutDialogAction: AuthenticationActions.getShowLogoutDialogAction,
    hideLogoutDialogAction: AuthenticationActions.getHideLogoutDialogAction,
    logoutAction: AuthenticationActions.logout
}, dispatch)

const ConnectedUserSessionWidget = connect(mapStateToProps, mapDispatchToProps)(UserSessionWidget)

export default ConnectedUserSessionWidget;
