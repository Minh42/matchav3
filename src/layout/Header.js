import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from "../components/Button";
import LinkButton from "../components/LinkButton"
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOutAction } from '../actions/actionUsers';
import { bindActionCreators } from 'redux';

import axios from 'axios';

class Header extends Component{
	constructor(props) {
		super(props);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            firstname : "",
            lastname : ""
        }
        console.log(this.state.firstname);
	  }

    handleLogout() {
        this.props.signOutAction();
    }

    async componentDidMount() {
        var first;
        var last;
        var res = await axios.get(`/api/infoUser`)
        console.log(res);
        first = res.data[0].firstname;
        last = res.data[0].lastname;
        console.log(first);
        console.log(last);
        this.setState({
            firstname: first,
            lastname: last
        })
      }

    showNavbar() {
        if (this.props.authenticated) {
            return [
                <nav className="navbar">
                <div className="navbar-brand">

                    <a className="navbar-item" id="logo">
                       <span> MATCHA </span>
                    </a>

                    <div className="navbar-burger burger" data-target="mobile-app">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div id="mobile-app" className="navbar-menu">
                    <div className="navbar-start">
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="field is-grouped">
                <h3>hello {this.state.firstname} </h3>
                <p className="control">
                    <Link to="/homepage"><Button className="button is-rounded" title=" homepage"/></Link>
                </p>
                <p className="control">
                    <Link to="/messages"><Button className="button is-rounded" title="My messages"/></Link>
                </p>
                <p className="control">
                    <Link to="/profile"><Button className="button is-rounded" title="My profile"/></Link>
                </p>
                <p className="control">
                    {/* <Button onClick={this.handleLogout} className="button is-rounded" title="Signout"/> */}
                    <LinkButton to='/' onClick={this.handleLogout} className="button is-rounded">Signout</LinkButton>
                </p>
                </div>
                    </div>
                </div>
            </nav>
        
            ];
        }
        // return [
        //     <Button className="button is-rounded" title="Sign In" action={this.showModal}/>
        // ];
    }

    render() {
        return (
        <div>
            {this.showNavbar()}
        </div>
        );                 
    }
}

function mapStateToProps(state) {
    return { 
        authenticated: state.auth.authenticated 
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ signOutAction: signOutAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);