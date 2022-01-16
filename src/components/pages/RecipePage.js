import React, { Component } from "react";
import CardList from '../util/CardList';
import CommentSection from '../util/CommentSection';
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import * as RecipeActions from '../../actions/RecipeActions'
import style from "../../styles/recipepage.module.css";
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const mapStateToProps = state => {
  return state;
}

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passedQuery: "",
      title: "",
      ingredients: "",
      instructions: "",
      preparation_time: "",
      refresh: false
    };
    this.delRecipe = this.delRecipe.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
  }

  async componentDidMount() {
    if (!this.props.params.recipeID) {
      const { getGetRecipesAction } = this.props;
      await getGetRecipesAction();
    } else {
      const { getSingleRecipeAction } = this.props;
      await getSingleRecipeAction(this.props.params.recipeID);
    }
  }

  async componentDidUpdate() {
    /*        this.setState({ passedQuery: this.props.match.params.recipeID });
            var tempAssign = this.props.match.params.recipeID;
    //        const {postValuesUpdatedAction} = this.props;
    //        postValuesUpdatedAction();
    
            if(this.props.match.params.recipeID.match(/^[a-z0-9]+$/)) {
    //            const {postGetAction} = this.props;
    //            await postGetAction(tempAssign);
            }
            */
  }

  delRecipe(e) {
    e.preventDefault();
    const { deleteRecipe } = this.props;
    deleteRecipe(this.props.authReducer.accessToken, this.props.recipeReducer.recipe._id);
    //this.setState({editedValues: true});
  }

  handleShow(e) {
    e.preventDefault();
    this.setState({
      title: this.props.recipeReducer.recipe.title,
      ingredients: this.props.recipeReducer.recipe.ingredients,
      instructions: this.props.recipeReducer.recipe.instructions,
      preparation_time: this.props.recipeReducer.recipe.preparation_time
    })
    const { showRecipeEditDialogAction } = this.props;
    showRecipeEditDialogAction();
  }

  handleClose() {
    const { hideRecipeEditDialogAction } = this.props;
    hideRecipeEditDialogAction();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value })
    console.log(this.state)
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title, preparation_time, ingredients, instructions } = this.state;
    const { updateRecipe } = this.props;
    let id = this.props.recipeReducer.recipe._id;
    console.log("RecipeID: " + id);
    updateRecipe(this.props.authReducer.accessToken, id, title, preparation_time, ingredients, instructions);
  }

  canSubmit() {
    const { title, preparation_time, ingredients, instructions } = this.state;
    if (title && preparation_time && ingredients && instructions) {
      return true;
    }
    return false;
  }

  render() {
    let recipeID = this.props.params.recipeID;
    let user = this.props.authReducer.user;
    let isAdmin;
    let delButton;
    let updateButton;
    if (!user) {
      isAdmin = false;
    } else {
      isAdmin = user.isAdministrator;

    }
    var showDialog = this.props.recipeReducer.showRecipeEditDialog;
    if (showDialog === undefined) {
      showDialog = false;
    }

    console.log("DEBUG recP: ");
    console.log(this.props.recipeReducer.recipes);

    let recipe = this.props.recipeReducer.recipe;
    let shownRecipes;
    if (recipeID) {

      if (JSON.stringify(recipe) === '[{}]') {
        shownRecipes = <p>Nichts zu sehen.</p>
      } else {
        if (!user) {
          delButton = <></>
          updateButton = <></>
        } else {
          if (user.userID === recipe.authorID || isAdmin) {
            delButton = <Button className={style.btn} onClick={this.delRecipe} >Löschen</Button>
          }
          if (user.userID === recipe.authorID) {
            updateButton = <Button className={style.btn} onClick={this.handleShow} >Updaten</Button>
          }
        }

        console.log(JSON.stringify(recipe));

        shownRecipes = (
          <div>
            <div className={style.recipe}>
              <h1>{recipe.title}</h1>
              <h2>Zutaten:</h2>
              <ul>
                {recipe.ingredients.split('\n').map((ingr, index) => (
                  <li key={index}>{ingr}</li>
                ))}
              </ul>
              <h2>Anweisungen:</h2>
              <ul>
                {recipe.instructions.split('\n').map((instr, index) => (
                  <li key={index}>{instr}</li>
                ))}
              </ul>
              <div>
                <h2>Zubereitungszeit: </h2>
                <p>{recipe.preparation_time}</p>
              </div>
              <div>
                <h2>Autor: </h2>
                <p>{recipe.authorID}</p>
              </div>
              {delButton}
              {updateButton}

            </div>
            <CommentSection />
          </div>

        );
      }

    } else {
      shownRecipes = <CardList recipes={this.props.recipeReducer.recipes} isAdmin={isAdmin} />;
    }

    let submitButton;
    if (this.canSubmit()) {
      submitButton = <Button variant="primary" type="submit" onClick={this.handleSubmit}>Abschicken</Button>
    } else {
      submitButton = <Button variant="primary" type="submit" disabled>Abschicken</Button>
    }

    return (
      <div>
        <Modal show={showDialog} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Bearbeite Rezept {recipe.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Titel</Form.Label>
                <Form.Control type="text" placeholder="Titel deines Rezeptes" name='title' value={this.state.title} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Zutaten</Form.Label>
                <Form.Control as="textarea" rows={5} name='ingredients' value={this.state.ingredients} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                <Form.Label>Anweisungen</Form.Label>
                <Form.Control as="textarea" rows={5} name='instructions' value={this.state.instructions} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Zubereitungszeit in Minuten</Form.Label>
                <Form.Control type="number" name='preparation_time' value={this.state.preparation_time} onChange={this.handleChange} />
              </Form.Group>
              {submitButton}
            </Form>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>

        <p>Recipe Page</p>
        {shownRecipes}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getGetRecipesAction: RecipeActions.getAllRecipes,
  getSingleRecipeAction: RecipeActions.getSingleRecipe,
  deleteRecipe: RecipeActions.deleteRecipe,
  updateRecipe: RecipeActions.updateRecipe,
  showRecipeEditDialogAction: RecipeActions.getShowRecipeEditDialogAction,
  hideRecipeEditDialogAction: RecipeActions.getHideRecipeEditDialogAction
}, dispatch)

const ConnectedRecipePage = connect(mapStateToProps, mapDispatchToProps)(RecipePage)

export default withParams(ConnectedRecipePage);