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



  async componentDidMount() {
    const { getGetRecipesAction } = this.props;
    await getGetRecipesAction();
  }

  render() {
    let shownRecipes;
    let user = this.props.authReducer.user;
    let isAdmin;
    if (!user) {
      isAdmin = false;
    } else {
      isAdmin = user.isAdministrator;
    }


    if (this.props.recipeReducer.recipes) {
      shownRecipes = this.props.recipeReducer.recipes;
    }

    return (
      <div style={{ margin: '5px' }}>
        <h4>Du bist noch nicht eingeloggt.</h4>
        <h4>Logge dich schnell ein oder registriere dich, um die volle Funktionalität von Cuvega genießen zu können!</h4>
        <LoginButton />
        <CardList recipes={shownRecipes} isAdmin={isAdmin} />
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
