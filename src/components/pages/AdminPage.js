import React, { Component } from "react";
import UserTable from '../util/UserTable';
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from 'react-redux';
//import { useParams } from "react-router-dom";
import * as UserActions from '../../actions/UserActions'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const mapStateToProps = state => {
    return state;
};



class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_user: {
                userID: "",
                userName: "",
                isAdministrator: false
            },
            edit_userID: "",
            edit_userName: "",
            edit_password: "",
            edit_deleted_flag: false,
            edit_isAdministrator: false,
            editedValues: false
        };
        this.delUser = this.delUser.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const { getGetUsersAction } = this.props;
        await getGetUsersAction(this.props.authReducer.accessToken);
    };

    async componentDidUpdate() {
          if(this.state.editedValues) {
            this.setState({editedValues: false});
            const { getGetUsersAction } = this.props;
            await getGetUsersAction(this.props.authReducer.accessToken);
        }
    }

    delUser(e) {
        e.preventDefault();
        const {deleteUser} = this.props;
        deleteUser(this.props.authReducer.accessToken, e.target.getAttribute("data-value"));
        this.setState({editedValues: true});
    }

    handleShow(e){
        e.preventDefault();
        this.setState({
            edit_userID: e.target.getAttribute("data-value1"),
            edit_isAdministrator: e.target.getAttribute("data-value2")
        })
        const {showUserEditDialogAction} = this.props;
        showUserEditDialogAction();
    }
    handleClose(){
        const {hideUserEditDialogAction} = this.props;
        hideUserEditDialogAction();
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    handleSubmit(e){
        e.preventDefault();
        const {edit_userID, edit_userName, edit_password, edit_deleted_flag, edit_isAdministrator} = this.state;
        const {updateUser} = this.props;
        updateUser(this.props.authReducer.accessToken, edit_userID, edit_userName, edit_password, edit_deleted_flag, edit_isAdministrator);
        this.setState({editedValues: true});
    }

    render() {
        let shownUsers = this.props.userReducer.users;
        if (shownUsers === undefined) {
            shownUsers = {};
        }
        var showDialog = this.props.userReducer.showUserEditDialog;
        if(showDialog === undefined){
            showDialog = false;
        }

        let userEditCheckboxField = "";
        if(this.state.edit_isAdministrator === "true") {
            userEditCheckboxField =
                <>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Admin privileges" name="edit_isAdministrator" checked="checked" onChange={this.handleChange} />
                    </Form.Group><br></br>
                </>;
        } else {
            userEditCheckboxField = 
                <>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Admin privileges" name="edit_isAdministrator" onChange={this.handleChange} />
                    </Form.Group><br></br>
                </>;
        }

        return (
            <div>
                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Bearbeite nutzer {this.state.edit_userID}</Modal.Title>
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
                                Submit
                            </Button>
                          </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>



                <h1>Admin Bereich</h1>
                <Button>User erstellen</Button>

                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Administrator</th>
                            <th>Löschung beantragt </th>
                            <th>Bearbeiten</th>
                            <th>Löschen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(!shownUsers) ? "NO ENTRY !" : shownUsers.map(users => (
                            <tr>
                                <td>{users.userName}</td>
                                <td>{users.isAdministrator ? "Ja" : "Nein"}</td>
                                <td>{users.deleted_flag ? "Ja" : "Nein"}</td>
                                <td><Link to="#" data-value1={users.userID} data-value2={users.isAdministrator} className="btn btn-primary" onClick={this.handleShow}>Bearbeiten</Link></td>
                                <td><Link to="#" data-value={users.userID} className="btn btn-primary" onClick={this.delUser}>Löschen</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getGetUsersAction: UserActions.getAllUsers,
    deleteUser: UserActions.deleteUser,
    updateUser: UserActions.updateUser,
    showUserEditDialogAction: UserActions.getShowUserEditDialogAction,
    hideUserEditDialogAction: UserActions.getHideUserEditDialogAction

}, dispatch)

const ConnectedAdminPage = connect(mapStateToProps, mapDispatchToProps)(AdminPage)
export default ConnectedAdminPage;