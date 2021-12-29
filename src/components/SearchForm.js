import React, { Component } from "react";
//import Button from 'react-bootstrap/Button';

//import {connect} from 'react-redux';
//import {getShowLoginDialogAction} from '../actions/AuthenticationActions'

class SearchForm extends Component{

    constructor(props){
        super(props);
    }

    

    render() {
        return(
            <form className = "search-form">
                <input className = "search-bar" type = "text" />
                <button  className = "search-button" type = "submit">
                    Search
                </button>
        
            </form>
        )
    }
}

export default SearchForm;
