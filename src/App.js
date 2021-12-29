import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import TopMenu from './components/TopMenu';
import PublicPage from './components/PublicPage';
import PrivatePage from './components/PrivatePage';

import Footer from './components/Footer';

import "@fontsource/ropa-sans"; // Defaults to weight 400.

const mapStateToProps = state => {
  return state;
}
/*
const user = this.props.user;

    let workspace;

    if(user){
      workspace = <PrivatePage/>
    }
    else{
      workspace = <PublicPage/>
    }
*/
function App() {
  return (
    <div className="App">
      <TopMenu />
      <PublicPage/>
      <Footer />
    </div>
  );
}

export default connect(mapStateToProps)(App);
