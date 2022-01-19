import React, { Component } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from 'react-redux';
import * as UserActions from '../../actions/UserActions';
import * as RecipeActions from '../../actions/RecipeActions';
import CardList from '../util/CardList';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
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
            edit_deleted_flag: false
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleShowQuestion = this.handleShowQuestion.bind(this);
        this.handleCloseQuestion = this.handleCloseQuestion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.delUser = this.delUser.bind(this);

    }

    async componentDidMount() {
        const { getGetSingleUser, getRecipesForUser} = this.props;
        await getGetSingleUser(this.props.authReducer.accessToken, this.props.authReducer.user.userID);
        await getRecipesForUser(this.props.authReducer.user.userID);
    };

    delUser(e) {
        e.preventDefault();
        const {deleteUser} = this.props;
        deleteUser(this.props.authReducer.accessToken, this.props.authReducer.user.userID);
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

    handleShowQuestion(){
        const {showUserDelDialogAction} = this.props;
        showUserDelDialogAction();
    }

    handleCloseQuestion(){
        const {hideUserDelDialogAction} = this.props;
        hideUserDelDialogAction();
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    handleSubmit(e){
        e.preventDefault();
        const { edit_userName, edit_password} = this.state;
        const {updateUser} = this.props;
        updateUser(this.props.authReducer.accessToken, this.props.authReducer.user.userID, edit_userName, edit_password);
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

        var showDelDialog = this.props.userReducer.showUserDelDialog;
        if(showDelDialog === undefined){
            showDelDialog = false;
        }

        let shownRecipes = this.props.recipeReducer.userRecipes;
        if( JSON.stringify(shownRecipes) === '[{}]' || JSON.stringify(shownRecipes) === '[]') {
          shownRecipes = false;
        } else {
            shownRecipes = this.props.recipeReducer.userRecipes;
        }

        const spinner = this.props.userReducer.spinner;
        let isError = this.props.userReducer.error;
        if (isError === undefined) {
            isError = false;
        }

        return (
            <div style={{margin: '5px'}}>
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
                                Senden
                            </Button>
                            {spinner && <Spinner animation="border" variant="dark" />}
                            {isError && <Form.Label style={{ color: "red", backgroundColor: 'white' }}>Das hat leider nicht geklappt.</Form.Label>}

                          </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
                <Modal show={showDelDialog} onHide={this.handleCloseQuestion}>
                    <Modal.Header closeButton>
                        <Modal.Title>Möchtest du wirklich deinen Account löschen?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <p>Löschung wird beantragt und nach Prüfung von einem Admin ausgeführt.</p>
                            <Button variant="primary" type="submit" onClick={this.delUser}>
                                Löschung beantragen
                            </Button>
                            {spinner && <Spinner animation="border" variant="dark" />}
                            {isError && <Form.Label style={{ color: "red", backgroundColor: 'white' }}>Das hat leider nicht geklappt.</Form.Label>}

                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

                <h1>Profil</h1>
                {shownUser && (
                    <div>
                    <h2>{shownUser.userID}</h2>
                    <p>Username: {shownUser.userName}</p>
                    <p>Ist dabei seit {date.toLocaleString().split(',')[0]}.</p>
                    <p>Zuletzt aktualisiert {dateup.toLocaleString()}.</p>
                    {shownUser.deleted_flag && <p style={{color: 'red'}}>Löschung beantragt. Um Löschung zurückzunehmen kannst du einfach dein Profil bearbeiten.</p>}
                    </div>
                )}
                <Button style={{margin: '20px'}} onClick={this.handleShow}>Daten editieren</Button>
                <Button style={{margin: '20px'}} onClick={this.handleShowQuestion}>Profil löschen</Button>

                <h2>Rezepte von {shownUser.userID}</h2>
                {shownRecipes ? 
                <CardList recipes={shownRecipes}/> : 
                <div>
                    <p>Hier ist noch nichts zu sehen.</p>
                    <div className="profileblock"></div>
                </div>}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getGetSingleUser: UserActions.getSingleUser,
    updateUser: UserActions.updateUser,
    showUserEditDialogAction: UserActions.getShowUserEditDialogAction,
    hideUserEditDialogAction: UserActions.getHideUserEditDialogAction,
    showUserDelDialogAction: UserActions.getShowUserDelDialogAction,
    hideUserDelDialogAction: UserActions.getHideUserDelDialogAction,
    getRecipesForUser: RecipeActions.getRecipesForUser,
    deleteUser: UserActions.deleteUser
}, dispatch)

const ConnectedProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
export default ConnectedProfilePage;