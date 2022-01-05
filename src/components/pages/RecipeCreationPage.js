import React, { Component } from "react";
import { connect } from 'react-redux';
import * as RecipeActions from '../../actions/RecipeActions';
import { bindActionCreators } from "@reduxjs/toolkit";
import Form from 'react-bootstrap/Form'

const mapStateToProps = state => {
    return state
}

class RecipeCreationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            prep_time: '',
            unit: '',
            amount: '',
            ingr_name: '',
            text: '',
            current_instr: '',
            ingredients: [{}],
            instructions: [{}]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
        //console.log(JSON.stringify(this.state));
    }

    handleSubmit(e) {
        e.preventDefault();
        const { title, ingredients, instructions, prep_time } = this.state;
        const { createRecipeAction } = this.props;
        createRecipeAction(title, ingredients, instructions, prep_time);
    }

    render() {
        return (
            <div>
                <p>Recipe Creation Page</p>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    createRecipeAction: RecipeActions.createRecipe
}, dispatch)

const ConnectedRecipeCreationPage = connect(mapStateToProps, mapDispatchToProps)(RecipeCreationPage)

export default ConnectedRecipeCreationPage;