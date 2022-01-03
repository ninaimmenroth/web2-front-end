import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel'
import CardList from './CardList'
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from 'react-redux';
import * as RecipeActions from '../actions/RecipeActions'


const mapStateToProps = state => {
    return state;
}

class PrivatePage extends Component {

    async componentDidMount(){
        const { getGetRecipesAction } = this.props;
        await getGetRecipesAction();
    }

    render() {
        return (
            <div>
                <p>Private Page</p>
                <CardList recipes={this.props.recipeReducer.recipes} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getGetRecipesAction: RecipeActions.getAllRecipes
}, dispatch)

const ConnectedPrivatePage = connect(mapStateToProps, mapDispatchToProps)(PrivatePage)
export default ConnectedPrivatePage;