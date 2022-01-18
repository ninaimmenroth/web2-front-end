import React, { Component } from "react";
import { connect } from 'react-redux';

import config from "../../config/config";
import style from "../../styles/topmenu.module.css";
import SearchForm from "./SearchForm";
import logo from '../../pics/logo.svg';
import cuvega from '../../pics/Cuvega.svg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import { withRouter, Link } from 'react-router-dom';

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

/*
<div className={style.navbar}>
                <Link to={config.frontendEndpoints.home} className="active">
                    <img className="logo" src={logo} alt="cuvega-logo" />
                    <img className="cuvega-name" src={cuvega} alt="cuvega-name" />
                </Link>
                <SearchForm/>
                {createRec}
                <UserSessionWidget/>
            </div>


<Navbar className={style.navbar} bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to={config.frontendEndpoints.home} href="#home">
                        <img className="logo" src={logo} alt="cuvega-logo" />
                        <img className="cuvega-name" src={cuvega} alt="cuvega-name" />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
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
                            <UserSessionWidget />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            */