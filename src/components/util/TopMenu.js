import React, { Component } from "react";
import { connect } from 'react-redux';

import config from "../../config/config";
import style from "../../styles/topmenu.module.css";
import logo from '../../pics/logo.svg';
import cuvega from '../../pics/Cuvega.svg';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import UserSessionWidget from './UserSessionWidget'

const mapStateToProps = state => {
    return state
}

class TopMenu extends Component {

    render() {
        const { user } = this.props.authReducer;

        let createRec;
        if (user) {
            createRec = <Nav.Link as={Link} to={config.frontendEndpoints.recipeCreate} className="active topmenu-new-recipe">Neues Rezept</Nav.Link>

        }
        else {
            createRec = <Nav.Link as={Link} to={config.frontendEndpoints.home} className="active topmenu-signup">Signup</Nav.Link>
        }

        return (
            <div className={style.navbar}>
                <Link to={config.frontendEndpoints.home} className="active">
                    <img className={style.logo} src={logo} alt="cuvega-logo" />
                    <img className={style.logoname} src={cuvega} alt="cuvega-name" />
                </Link>
                <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                {createRec}
                <UserSessionWidget/>
            </div>
        )
    }
}

const ConnectedTopMenu = connect(mapStateToProps)(TopMenu)

export default ConnectedTopMenu;
