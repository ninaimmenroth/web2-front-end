import React, { Component } from "react";

import style from "../styles/topmenu.module.css";
import SearchForm from "./SearchForm";
import logo from '../pics/logo.svg';


import UserSessionWidget from './UserSessionWidget'


class TopMenu extends Component {

    render() {
        return (
            <div className={style.navbar}>
                <img className="logo" src={logo} alt="cuvega-logo" />
                <a className="active" href="/">Cuvega</a>
                <SearchForm/>
                <a href="/RecipePage">Recipes</a>
                <a href="/CommentsPage">Comments</a>
                <UserSessionWidget/>
            </div>
        )
    }
}

export default TopMenu

//