import React from 'react';
import ReactDOM from 'react-dom';

import {applyMiddleware, createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import RootReducer from './reducer/RootReducer';
//import RecipeReducer from './reducer/RecipeReducer';


const middlewares = [thunk];

const store = createStore(RootReducer, applyMiddleware(...middlewares));
//const store = createStore(combineReducers({RootReducer, RecipeReducer}), applyMiddleware(...middlewares));
//const store = createStore(RootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
