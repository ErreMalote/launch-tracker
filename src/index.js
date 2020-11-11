import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import allReducers from './reducers';
import App from './components/App';
import 'iron-flex-layout-css/iron-flex-layout.css';
import 'normalize.css/normalize.css';

const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise),
);
// eslint-disable-next-line no-undef
const rootElement = document.getElementById('root');
ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
    ,
    rootElement, // eslint-disable-line no-undef
);
