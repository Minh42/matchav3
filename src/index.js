require("../assets/stylesheets/styles.scss");

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import Header from './layout/Header';
import Footer from './layout/Footer';
import LandingPage from './layout/LandingPage';
import ForgotPassword from './containers/ForgotPasswordContainer';
// import HomePage from './layout/HomePage';
 
import Footer from './layout/Footer';

import reducers from './reducers';
import setAuthorizationToken from "../library/setAuthorizationToken";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

setAuthorizationToken(localStorage.jwtToken);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    {/* <Route path="/homepage" component={HomePage} /> */}
                    <Route path="/forgotPassword" component={ForgotPassword} />
                </Switch>
                <Footer />
            </div>
        </Router>
    </Provider>
   , document.querySelector('.root'));

