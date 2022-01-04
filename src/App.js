import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from './config/config';
import './App.css';
import TopMenu from './components/util/TopMenu';
import PublicPage from './components/pages/PublicPage';
import PrivatePage from './components/pages/PrivatePage';
import RecipePage from './components/pages/RecipePage';
import RecipeCreationPage from './components/pages/RecipeCreationPage';
import CommentsPage from './components/pages/CommentsPage';
import AdminPage from './components/pages/AdminPage';

//import UsersPage from './components/UsersPage';

import Footer from './components/util/Footer';

import "@fontsource/ropa-sans"; // Defaults to weight 400.
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

const mapStateToProps = state => {
  return state;
}

class App extends Component {
  render() {

    const user = this.props.authReducer.user;

    let workspace;

    if(user){
      workspace = <Route path="/" element={<PrivatePage/>} exact />
    }
    else{
      workspace = <Route path="/" element={<PublicPage/>} exact /> 
    }

    return (
      <Router>
      <div className="App">
        <TopMenu />
          <Routes>
            <Route path={config.frontendEndpoints.admin} element={<AdminPage/>} exact /> 
            <Route path={config.frontendEndpoints.recipeCreate} element={<RecipeCreationPage/>} exact /> 
            <Route path={config.frontendEndpoints.recipe} element={<RecipePage/>} exact /> 
            <Route path={config.frontendEndpoints.comments} element={<CommentsPage/>} exact /> 
            <Route path={config.frontendEndpoints.private} element={<PrivatePage/>} exact /> 
            {workspace} 
          </Routes>
        <Footer />
      </div>
      </Router>
    );

//    <Route path={config.frontendEndpoints.users} element={<UsersPage/>} exact /> 

  }
}

export default connect(mapStateToProps)(App);

