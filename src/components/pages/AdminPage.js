import React, { Component } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from 'react-redux';
import * as UserActions from '../../actions/UserActions'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner';

const mapStateToProps = state => {
    return state;
};

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_userID: "",
            edit_userName: "",
            edit_password: "",
            edit_deleted_flag: false,
            edit_isAdministrator: false,
            new_userID: "",
            new_userName: "",
            new_password: "",
            new_isAdministrator: false
        };
        this.delUser = this.delUser.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseCreate = this.handleCloseCreate.bind(this);
        this.handleShowCreate = this.handleShowCreate.bind(this);
        this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.canSubmit = this.canSubmit.bind(this);

    }

    async componentDidMount() {
        const { getGetUsersAction } = this.props;
        await getGetUsersAction(this.props.authReducer.accessToken);
    };

    handleShow(e){
        e.preventDefault();
        this.setState({
            edit_userID: e.target.getAttribute("data-value1"),
            edit_isAdministrator: e.target.getAttribute("data-value2"),
            edit_userName: e.target.getAttribute("data-value3")
        })
        const {showUserEditDialogAction} = this.props;
        showUserEditDialogAction();
    }

    handleClose(){
        const {hideUserEditDialogAction} = this.props;
        hideUserEditDialogAction();
    }

    async handleRefresh(){
        const {getGetUsersAction} = this.props;
        await getGetUsersAction(this.props.authReducer.accessToken);
    }
    
    async delUser(e) {
        e.preventDefault();
        const {deleteUser} = this.props;
        await deleteUser(this.props.authReducer.accessToken, e.target.getAttribute("data-value"));
        this.handleRefresh();
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    handleChangeCheckbox(e){
        const {name, checked} = e.target;
        this.setState({[name]: checked})
    }

    async handleSubmit(e){
        e.preventDefault();
        const {edit_userID, edit_userName, edit_password, edit_deleted_flag, edit_isAdministrator} = this.state;
        const {updateUser} = this.props;
        await updateUser(this.props.authReducer.accessToken, edit_userID, edit_userName, edit_password, edit_deleted_flag, edit_isAdministrator);
        this.handleRefresh();
    }

    handleShowCreate(e){
        e.preventDefault();

        const {showUserCreateDialogAction} = this.props;
        showUserCreateDialogAction();
    }

    handleCloseCreate(){
        const {hideUserCreateDialogAction} = this.props;
        hideUserCreateDialogAction();
    }

    async handleSubmitCreate(e){
        e.preventDefault();
        const {new_userID, new_userName, new_password, new_isAdministrator} = this.state;
        const {createUser} = this.props;
        await createUser(this.props.authReducer.accessToken, new_userID, new_userName, new_password, new_isAdministrator);
        this.handleRefresh();
    }

    canSubmit() {
        const { new_userID, new_userName, new_password } = this.state;
        if (new_userID && new_userName && new_password) {
            return true;
        }
        return false;
    }

    render() {
        const isAdmin = this.props.authReducer.user.isAdministrator;
        let shownUsers = this.props.userReducer.users;
        if (shownUsers === undefined) {
            shownUsers = {};
        }
        var showDialog = this.props.userReducer.showUserEditDialog;
        if(showDialog === undefined){
            showDialog = false;
        }
        var showCreateDialog = this.props.userReducer.showUserCreateDialog;
        if(showCreateDialog === undefined){
            showCreateDialog = false;
        }
        const spinner = this.props.userReducer.spinner;

        let submitButton;
        if (this.canSubmit()) {
            submitButton = <Button variant="primary" type="submit" onClick={this.handleSubmitCreate}>
                Abschicken
                {spinner && <Spinner animation="border" variant="dark" size='sm'/>}
                </Button>
        } else {
            submitButton = <Button variant="primary" type="submit" disabled>Abschicken</Button>
        }

        let userEditCheckboxField = "";
        if(this.state.edit_isAdministrator === "true") {
            userEditCheckboxField =
                <>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Admin Privilegien" name="edit_isAdministrator" checked="checked" onChange={this.handleChangeCheckbox} />
                    </Form.Group><br></br>
                </>;
        } else {
            userEditCheckboxField = 
                <>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Admin Privilegien" name="edit_isAdministrator" onChange={this.handleChangeCheckbox} />
                    </Form.Group><br></br>
                </>;
        }
        let isError = this.props.userReducer.error;
        if (isError === undefined) {
            isError = false;
        }

        return (
            <div style={{margin: '5px'}}>
            {isAdmin ? (<div>
                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Bearbeite Nutzer/in {this.state.edit_userID}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={this.state.edit_userName} name="edit_userName" onChange={this.handleChange} />
                            </Form.Group><br></br>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="edit_password" onChange={this.handleChange} />
                            </Form.Group><br></br>

                            {(this.state.edit_userID !== this.props.authReducer.user.userID && this.props.authReducer.user.isAdministrator) ? (
                                <>
                                    {userEditCheckboxField}
                                </>
                            ) : ( <></> )}
                            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                                Senden
                            </Button>
                            {spinner && <Spinner animation="border" variant="dark" />}
                            {isError && <Form.Label style={{ color: "red", backgroundColor: 'white' }}>Das hat leider nicht geklappt.</Form.Label>}

                          </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

                <Modal show={showCreateDialog} onHide={this.handleCloseCreate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Erstelle neue/n Nutzer/in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label>UserID</Form.Label>
                                <Form.Control type="text" placeholder="UserID eingeben" name="new_userID" onChange={this.handleChange} />
                            </Form.Group><br></br>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Username eingeben" name="new_userName" onChange={this.handleChange} />
                            </Form.Group><br></br>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Passwort</Form.Label>
                                <Form.Control type="password" placeholder="Passwort eingeben" name="new_password" onChange={this.handleChange} />
                            </Form.Group><br></br>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Admin Privilegien" name="new_isAdministrator" onChange={this.handleChangeCheckbox} />
                    </Form.Group><br></br>
                            
                            {submitButton}
                            {spinner && <Spinner animation="border" variant="dark" />}
                            {isError && <Form.Label style={{ color: "red", backgroundColor: 'white' }}>Das hat leider nicht geklappt. Probiere eine andere UserID.</Form.Label>}
                          </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

                <h1>Admin Bereich</h1>
                <Button onClick={this.handleShowCreate}>User erstellen</Button>
                <Button style={{margin: '0px 5px'}} onClick={this.handleRefresh}>
                    User laden
                </Button>

                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Administrator</th>
                            <th>L??schung beantragt </th>
                            <th>Bearbeiten</th>
                            <th>L??schen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(!shownUsers) ? "NO ENTRY !" : shownUsers.map((users, index) => (
                            <tr key={index}>
                                <td>{users.userName}</td>
                                <td>{users.isAdministrator ? "Ja" : "Nein"}</td>
                                <td>{users.deleted_flag ? "Ja" : "Nein"}</td>
                                <td><Link to="#" data-value1={users.userID} data-value2={users.isAdministrator} data-value3={users.userName} className="btn btn-primary" onClick={this.handleShow}>Bearbeiten</Link></td>
                                <td><Link to="#" data-value={users.userID} className="btn btn-primary" onClick={this.delUser}>
                                    L??schen
                                    </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>) : <p>Du darfst hier nicht sein!</p>
            }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getGetUsersAction: UserActions.getAllUsers,
    deleteUser: UserActions.deleteUser,
    updateUser: UserActions.updateUser,
    showUserEditDialogAction: UserActions.getShowUserEditDialogAction,
    hideUserEditDialogAction: UserActions.getHideUserEditDialogAction,
    showUserCreateDialogAction: UserActions.getShowUserCreateDialogAction,
    hideUserCreateDialogAction: UserActions.getHideUserCreateDialogAction,
    createUser: UserActions.createUser
}, dispatch)

const ConnectedAdminPage = connect(mapStateToProps, mapDispatchToProps)(AdminPage)
export default ConnectedAdminPage;