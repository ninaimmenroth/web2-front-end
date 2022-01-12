import React, { Component } from "react";
import { connect } from 'react-redux';

import config from "../../config/config";
import style from "../../styles/topmenu.module.css";
import SearchForm from "./SearchForm";
import logo from '../../pics/logo.svg';
import cuvega from '../../pics/Cuvega.svg';

import {withRouter, Link} from 'react-router-dom';

import UserSessionWidget from './UserSessionWidget'

const mapStateToProps = state => {
    return state
}

class TopMenu extends Component {

    render() {
        const { user } = this.props.authReducer;
        
        let createRec;
        if (user) 
        {
            createRec = <Link to={config.frontendEndpoints.recipeCreate} className="active topmenu-new-recipe">Neues Rezept</Link>

        }
        else
        {
            createRec = <Link to={config.frontendEndpoints.home} className="active topmenu-signup">Signup</Link>
        }

        return (
            <div className={style.navbar}>
                <Link to={config.frontendEndpoints.home} className="active">
                    <img className="logo" src={logo} alt="cuvega-logo" />
                    <img className="cuvega-name" src={cuvega} alt="cuvega-name" />
                </Link>
                <SearchForm/>
                {createRec}
                <UserSessionWidget/>
            </div>
        )
    }
}

const ConnectedTopMenu = connect(mapStateToProps)(TopMenu)

export default ConnectedTopMenu;

//