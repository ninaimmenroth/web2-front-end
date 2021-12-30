import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import TopMenu from './components/TopMenu';
import PublicPage from './components/PublicPage';
import PrivatePage from './components/PrivatePage';
import RecipePage from './components/RecipePage'
import CommentsPage from './components/CommentsPage';
import UsersPage from './components/UsersPage';

import Footer from './components/Footer';

import "@fontsource/ropa-sans"; // Defaults to weight 400.
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

const mapStateToProps = state => {
  return state;
}

class App extends Component {
  render() {

    const user = this.props.user;

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
            <Route path="/RecipePage" element={<RecipePage/>} exact /> 
            <Route path="/CommentsPage" element={<CommentsPage/>} exact /> 
            <Route path="/PrivatePage" element={<PrivatePage/>} exact /> 
            {workspace} 
          </Routes>
        <Footer />
      </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);

