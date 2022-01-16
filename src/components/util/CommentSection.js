import React, { Component } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import * as CommentActions from '../../actions/CommentActions'
//import style from "../../styles/commentpage.module.css";
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom';

const mapStateToProps = state => {
    return state;
}

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class CommentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passedQuery: "",
            edit_text: "",
            new_text: "",
            edit_id: "",
            refresh: false
        };
        this.delComment = this.delComment.bind(this);
        this.handleShowEdit = this.handleShowEdit.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.canSubmitEdit = this.canSubmitEdit.bind(this);
        this.handleShowCreate = this.handleShowCreate.bind(this);
        this.handleCloseCreate = this.handleCloseCreate.bind(this);
        this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
        this.canSubmitCreate = this.canSubmitCreate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        const { getCommentsAction } = this.props;
        await getCommentsAction(this.props.params.recipeID);

    }

    delComment(e) {
        e.preventDefault();
        const { deleteComment } = this.props;
        const id = e.target.getAttribute("data-value");
        deleteComment(this.props.authReducer.accessToken, id);
        //this.setState({editedValues: true});
    }

    handleShowEdit(e) {
        e.preventDefault();
        this.setState({
            edit_text: e.target.getAttribute("data-value2"),
            edit_id: e.target.getAttribute("data-value1")
        })
        const { showCommentEditDialogAction } = this.props;
        showCommentEditDialogAction();
    }

    handleCloseEdit() {
        const { hideCommentEditDialogAction } = this.props;
        hideCommentEditDialogAction();
    }

    handleSubmitEdit(e) {
        e.preventDefault();
        const { edit_text, edit_id } = this.state;
        const { updateComment } = this.props;
        let id = edit_id;
        console.log("CommentID: " + id);
        updateComment(this.props.authReducer.accessToken, id, edit_text);
    }

    handleShowCreate(e) {
        e.preventDefault();
        this.setState({
            new_text: "",
        })
        const { showCommentCreateDialogAction } = this.props;
        showCommentCreateDialogAction();
    }

    handleCloseCreate() {
        const { hideCommentCreateDialogAction } = this.props;
        hideCommentCreateDialogAction();
    }

    handleSubmitCreate(e) {
        e.preventDefault();
        const { new_text } = this.state;
        const { createComment } = this.props;
        createComment(this.props.authReducer.accessToken, this.props.params.recipeID, new_text);
    }

    canSubmitEdit() {
        const { edit_text } = this.state;
        if (edit_text) {
            return true;
        }
        return false;
    }

    canSubmitCreate() {
        const { new_text } = this.state;
        if (new_text) {
            return true;
        }
        return false;
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
        console.log(this.state)
    }
    render() {
        let recipeID = this.props.params.recipeID;
        let user = this.props.authReducer.user;
        let isAdmin;
        if (!user) {
            isAdmin = false;
            user = {
                userID: ""
            }
        } else {
            isAdmin = user.isAdministrator;

        }
        var showEditDialog = this.props.commentReducer.showCommentEditDialog;
        if (showEditDialog === undefined) {
            showEditDialog = false;
        }
        var showCreateDialog = this.props.commentReducer.showCommentCreateDialog;
        if (showCreateDialog === undefined) {
            showCreateDialog = false;
        }


        console.log("DEBUG CommentSection: ");
        console.log(this.props.commentReducer.comments);

        let comments = this.props.commentReducer.comments;
        let shownComments;

            if (JSON.stringify(comments) === '[{}]') {
                shownComments = <p>Es gibt noch keine Kommentare</p>
            } else {
                shownComments = (
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Autor</th>
                                <th>Datum</th>
                                <th colSpan={4}>Kommentar</th>
                                <th>Aktionen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.slice(0).reverse().map((comment) => (
                                <tr key={comment._id}>
                                    <td>{comment.authorID}</td>
                                    <td>{(new Date(comment.createdAt)).toLocaleString()}</td>
                                    <td colSpan={4}>{comment.text}</td>
                                    <td>
                                        { (comment.authorID === user.userID) && <Link to="#" data-value1={comment._id} data-value2={comment.text} className="btn btn-primary" onClick={this.handleShowEdit}>Bearbeiten</Link>}
                                        { (user.userID === comment.authorID || isAdmin) && <Link to="#" data-value={comment._id} className="btn btn-primary" onClick={this.delComment}>Löschen</Link>}
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )

                
            console.log(JSON.stringify(comments));

        }

    

let submitButtonEdit;
if (this.canSubmitEdit()) {
    submitButtonEdit = <Button variant="primary" type="submit" onClick={this.handleSubmitEdit}>Abschicken</Button>
} else {
    submitButtonEdit = <Button variant="primary" type="submit" disabled>Abschicken</Button>
}
let submitButtonCreate;
if (this.canSubmitCreate()) {
    submitButtonCreate = <Button variant="primary" type="submit" onClick={this.handleSubmitCreate}>Abschicken</Button>
} else {
    submitButtonCreate = <Button variant="primary" type="submit" disabled>Abschicken</Button>
}

return (
    <div>
        <Modal show={showEditDialog} onHide={this.handleCloseEdit}>
            <Modal.Header closeButton>
                <Modal.Title>Bearbeite Kommentar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" rows={5} name='edit_text' value={this.state.edit_text} onChange={this.handleChange} />
                    </Form.Group>
                    {submitButtonEdit}
                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>

        <Modal show={showCreateDialog} onHide={this.handleCloseCreate}>
            <Modal.Header closeButton>
                <Modal.Title>Erstelle Kommentar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" rows={5} name='new_text' value={this.state.new_text} onChange={this.handleChange} />
                    </Form.Group>
                    {submitButtonCreate}
                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>


        <h1>Kommentare</h1>
        {user && <Button onClick={this.handleShowCreate}>Kommentar erstellen</Button>}

        {shownComments}


    </div>
)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getCommentsAction: CommentActions.getCommentsRecipe,
    getSingleCommentAction: CommentActions.getSingleComment,
    deleteComment: CommentActions.deleteComment,
    updateComment: CommentActions.updateComment,
    createComment: CommentActions.createComment,
    showCommentEditDialogAction: CommentActions.getShowCommentEditDialogAction,
    hideCommentEditDialogAction: CommentActions.getHideCommentEditDialogAction,
    showCommentCreateDialogAction: CommentActions.getShowCommentCreateDialogAction,
    hideCommentCreateDialogAction: CommentActions.getHideCommentCreateDialogAction
}, dispatch)

const ConnectedCommentPage = connect(mapStateToProps, mapDispatchToProps)(CommentPage)

export default withParams(ConnectedCommentPage);