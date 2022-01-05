import React, { Component } from "react";
import CardList from '../util/CardList'
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import * as RecipeActions from '../../actions/RecipeActions'

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
  }

  async componentDidMount(){
    if(!this.props.params.recipeID) {
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

    render() {
      let recipeID = this.props.params.recipeID;
      console.log("DEBUG recP: ");
      console.log(this.props.recipeReducer.recipes);

      let shownRecipes;
      if(recipeID) {
        shownRecipes = [this.props.recipeReducer.recipe];
      } else {
        shownRecipes = this.props.recipeReducer.recipes;
      }
//<CardList recipes={shownRecipes}/>
        return (
            <div>
                <p>Recipe Page</p>
                <CardList recipes={shownRecipes} isAdmin={this.props.authReducer.user.isAdministrator}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getGetRecipesAction: RecipeActions.getAllRecipes,
  getSingleRecipeAction: RecipeActions.getSingleRecipe
}, dispatch)

const ConnectedRecipePage = connect(mapStateToProps, mapDispatchToProps)(RecipePage)

export default withParams(ConnectedRecipePage);