import React, { Component } from "react";
import { connect } from 'react-redux';
import CardList from '../util/CardList'
import LoginButton from '../util/LoginButton'
import * as RecipeActions from '../../actions/RecipeActions'
import { bindActionCreators } from "@reduxjs/toolkit";


const mapStateToProps = state => {
    return state;
}
 
class PublicPage extends Component {



    async componentDidMount(){
      console.log('Component did mount');

        const { getGetRecipesAction } = this.props;
        await getGetRecipesAction();
    }

    async componentDidUpdate(prevProps){
        console.log('Component did update');
        
          //const { getGetRecipesAction } = this.props;
          //await getGetRecipesAction();
      }

    render() {
      let shownRecipes;

      if(this.props.recipeReducer.recipes) {
        shownRecipes = this.props.recipeReducer.recipes;
      }

      console.log('render method:')
      console.log(shownRecipes);

        return (
            <div>
                <LoginButton/>
                <p>Public Page</p>
                <CardList recipes={shownRecipes}/>
            </div>
        )
    }
}
//<CardList recipes={shownRecipes}/>

const mapDispatchToProps = dispatch => bindActionCreators({
    getGetRecipesAction: RecipeActions.getAllRecipes
}, dispatch)

const ConnectedPublicPage = connect(mapStateToProps, mapDispatchToProps)(PublicPage)

export default ConnectedPublicPage;
