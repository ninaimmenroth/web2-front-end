import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from './config/config';
import './App.css';
import TopMenu from './components/util/TopMenu';
import PublicPage from './components/pages/PublicPage';
import PrivatePage from './components/pages/PrivatePage';
import RecipePage from './components/pages/RecipePage';
import RecipeCreationPage from './components/pages/RecipeCreationPage';
import AdminPage from './components/pages/AdminPage';
import ProfilePage from './components/pages/ProfilePage';
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
      workspace = 
        <Routes>
          <Route path={config.frontendEndpoints.private} element={<PrivatePage />} exact />
          <Route path={config.frontendEndpoints.admin} element={<AdminPage />} exact /> 
          <Route path={config.frontendEndpoints.profile} element={<ProfilePage />} exact /> 
          
          <Route path={config.frontendEndpoints.recipeCreate} element={<RecipeCreationPage />} exact /> 

          <Route path={config.frontendEndpoints.recipe} element={<RecipePage />} exact>
            <Route path={config.frontendEndpoints.recipe + config.frontendSubEndpoints.add} element={<RecipeCreationPage />} exact /> 
            <Route path={config.frontendEndpoints.recipe + "/:recipeID"} element={<RecipePage />} exact /> 
          </Route> 
          <Route path="*" element={<PrivatePage />} />
        </Routes>
    } else {
      workspace = 
        <Routes>
          <Route path={config.frontendEndpoints.home} element={<PublicPage />} exact /> 
          <Route path={config.frontendEndpoints.recipe} element={<RecipePage />} exact>
            <Route path={config.frontendEndpoints.recipe + "/:recipeID"} element={<RecipePage />} exact /> 
          </Route> 
          <Route path="*" element={<PublicPage />} />
        </Routes>
    }

    return (
      <Router>
        <div className="App">
          <TopMenu />
            {workspace}
          <Footer />
        </div>
      </Router>
    );

  }
}

export default connect(mapStateToProps)(App);
