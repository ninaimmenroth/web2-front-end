import React, { Component } from "react";
import CardList from '../util/CardList'
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import * as RecipeActions from '../../actions/RecipeActions'
import style from "../../styles/recipepage.module.css";
import Button from 'react-bootstrap/Button'


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
      passedQuery: ""
    };
    this.delRecipe = this.delRecipe.bind(this);

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
    const {deleteRecipe} = this.props;
    deleteRecipe(this.props.authReducer.accessToken, this.props.recipeReducer.recipe._id);
    //this.setState({editedValues: true});
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

    console.log("DEBUG recP: ");
    console.log(this.props.recipeReducer.recipes);

    let shownRecipes;
    if (recipeID) {
      let recipe = this.props.recipeReducer.recipe
      if (JSON.stringify(recipe) === '[{}]') {
        shownRecipes = <p>Nichts zu sehen.</p>
      } else {
        if (!user) {
          delButton = <></>
          updateButton = <></>
        } else if(user.userID === recipe.authorID || isAdmin)
        {
          delButton = <Button className={style.btn} onClick={this.delRecipe} >Löschen</Button>
          updateButton = <Button className={style.btn} >Updaten</Button>
          
        }
    
        console.log(JSON.stringify(recipe));

        shownRecipes = (
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
        );
      }

    } else {
      shownRecipes = <CardList recipes={this.props.recipeReducer.recipes} isAdmin={isAdmin} />;
    }
    //<CardList recipes={shownRecipes}/>
    return (
      <div>
        <p>Recipe Page</p>
        {shownRecipes}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getGetRecipesAction: RecipeActions.getAllRecipes,
  getSingleRecipeAction: RecipeActions.getSingleRecipe,
  deleteRecipe: RecipeActions.deleteRecipe
}, dispatch)

const ConnectedRecipePage = connect(mapStateToProps, mapDispatchToProps)(RecipePage)

export default withParams(ConnectedRecipePage);