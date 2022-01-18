import React, { Component } from "react";
import CardList from '../util/CardList';
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from 'react-redux';
import * as RecipeActions from '../../actions/RecipeActions'


const mapStateToProps = state => {
    return state;
}

class PrivatePage extends Component {

    async componentDidMount(){
        const { getGetRecipesAction } = this.props;
        await getGetRecipesAction();
    }

    render() {
        let shownRecipes;

        if(this.props.recipeReducer.recipes) {
          shownRecipes = this.props.recipeReducer.recipes;
        }

        return (
            <div>
                <CardList recipes={shownRecipes} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getGetRecipesAction: RecipeActions.getAllRecipes
}, dispatch)

const ConnectedPrivatePage = connect(mapStateToProps, mapDispatchToProps)(PrivatePage)
export default ConnectedPrivatePage;