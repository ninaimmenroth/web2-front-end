import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from './config/config';
import './App.css';
import TopMenu from './components/TopMenu';
import PublicPage from './components/PublicPage';
import PrivatePage from './components/PrivatePage';
import RecipePage from './components/RecipePage'
import CommentsPage from './components/CommentsPage';
//import UsersPage from './components/UsersPage';

import Footer from './components/Footer';

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

