import React, { Component } from "react";
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



class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_userName: "",
            edit_password: "",
            edit_deleted_flag: false,
            editedValues: false
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const { getGetSingleUser } = this.props;
        await getGetSingleUser(this.props.authReducer.accessToken, this.props.authReducer.user.userID);
    };

    async componentDidUpdate() {
          if(this.state.editedValues) {
            this.setState({editedValues: false});
            const { getGetSingleUser } = this.props;
            await getGetSingleUser(this.props.authReducer.accessToken, this.props.authReducer.user.userID);
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
            edit_userName: this.props.authReducer.user.userName
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
        console.log(this.state)
    }

    handleChangeCheckbox(e){
        const {name, checked} = e.target;
        console.log(checked)
        this.setState({[name]: checked})
        console.log(this.state)
    }

    handleSubmit(e){
        e.preventDefault();
        const { edit_userName, edit_password} = this.state;
        const {updateUser} = this.props;
        updateUser(this.props.authReducer.accessToken, this.props.authReducer.user.userID, edit_userName, edit_password);
        this.setState({editedValues: true});
    }

    render() {
        let shownUser = this.props.userReducer.user;
        let date = "";
        let dateup = "";
        if (shownUser === undefined) {
            shownUser = false;
        } else{
            date = new Date(this.props.userReducer.user.createdAt);
            dateup = new Date(this.props.userReducer.user.updatedAt);
        }

        var showDialog = this.props.userReducer.showUserEditDialog;
        if(showDialog === undefined){
            showDialog = false;
        }

        return (
            <div>
                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Bearbeite deine Daten, {shownUser.userID}</Modal.Title>
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

                            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                                Submit
                            </Button>
                          </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

                <h1>Profil</h1>
                {shownUser && (
                    <div>
                    <h2>Username</h2>
                    <p>{shownUser.userName}</p>
                    <p>Ist dabei seit {date.toLocaleString().split(',')[0]}.</p>
                    <p>Zuletzt aktualisiert {dateup.toLocaleString()}.</p>
                    </div>
                )}
                <Button onClick={this.handleShow}>Daten editieren</Button>

                
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getGetSingleUser: UserActions.getSingleUser,
    updateUser: UserActions.updateUser,
    showUserEditDialogAction: UserActions.getShowUserEditDialogAction,
    hideUserEditDialogAction: UserActions.getHideUserEditDialogAction

}, dispatch)

const ConnectedProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
export default ConnectedProfilePage;