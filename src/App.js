import React from 'react';
import './App.css';
import TopMenu from './components/TopMenu';
import PublicPage from './components/PublicPage';
import Footer from './components/Footer';

import "@fontsource/ropa-sans"; // Defaults to weight 400.


function App() {
  return (
    <div className="App">
      <TopMenu />
      <PublicPage />
      <Footer />
    </div>
  );
}

export default App;
