import React, { Component } from "react";
import config from "../config/config";
import style from "../styles/topmenu.module.css";
import SearchForm from "./SearchForm";
import logo from '../pics/logo.svg';
import {withRouter, Link} from 'react-router-dom';

import UserSessionWidget from './UserSessionWidget'


class TopMenu extends Component {

    render() {
        return (
            <div className={style.navbar}>
                <Link to={config.frontendEndpoints.home} className="active">
                    <img className="logo" src={logo} alt="cuvega-logo" />
                </Link>
                <Link to={config.frontendEndpoints.home} className="active">Cuvega</Link>
                <SearchForm/>
                <Link to={config.frontendEndpoints.recipe} className="active">Recipes</Link>
                <Link to={config.frontendEndpoints.comments} className="active">Comments</Link>
                <UserSessionWidget/>
            </div>
        )
    }
}

export default TopMenu

//