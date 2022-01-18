import React, { Component } from "react";
import { connect } from 'react-redux';
import * as RecipeActions from '../../actions/RecipeActions';
import { bindActionCreators } from "@reduxjs/toolkit";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const mapStateToProps = state => {
    return state
}

class RecipeCreationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            preparation_time: '',
            ingredients: '',
            instructions: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    canSubmit() {
        const { title, preparation_time, ingredients, instructions } = this.state;
        if (title && preparation_time && ingredients && instructions) {
            return true;
        }
        return false;
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
        //console.log(JSON.stringify(this.state));
    }

    handleSubmit(e) {
        e.preventDefault();
        const { title, preparation_time, ingredients, instructions} = this.state;
        const { createRecipeAction } = this.props;
        console.log(JSON.stringify({ title, preparation_time, ingredients, instructions }));

        /*
        ingredients: [JSON.stringify(ingredients).split('\n').map(ingr =>(
            {text: ingr},
        ))]*/

        createRecipeAction(this.props.authReducer.accessToken, title, preparation_time, ingredients, instructions );
    }

    render() {
        let submitButton;
        if (this.canSubmit()) {
            submitButton = <Button variant="primary" type="submit" onClick={this.handleSubmit}>Abschicken</Button>
        } else {
            submitButton = <Button variant="primary" type="submit" disabled>Abschicken</Button>
        }

        return (
            <div style={{margin: '5px'}}>
                <h1>Rezept erstellen</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Titel</Form.Label>
                        <Form.Control type="text" placeholder="Titel deines Rezeptes" name='title' onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Zutaten</Form.Label>
                        <Form.Control as="textarea" rows={5}  name='ingredients' onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                        <Form.Label>Anweisungen</Form.Label>
                        <Form.Control as="textarea" rows={5} name='instructions' onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Zubereitungszeit</Form.Label>
                        <Form.Control type="text" name='preparation_time' onChange={this.handleChange} />
                    </Form.Group>
                    {submitButton}
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