import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormContainer from './FormContainer';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

import { signInGoogleAction } from '../actions/actionUsers';
import { signInFacebookAction } from '../actions/actionUsers';
import { bindActionCreators } from 'redux';

import GoogleLoginButton from "react-social-login-buttons/lib/buttons/GoogleLoginButton";
import FacebookLoginButton from "react-social-login-buttons/lib/buttons/FacebookLoginButton";

class SignupContainer extends Component{
	constructor(props) {
		super(props);
		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.closeModalEmail = this.closeModalEmail.bind(this);
		this.onSubmitGoogle = this.onSubmitGoogle.bind(this);
		this.onSubmitFacebook = this.onSubmitFacebook.bind(this);
	  }

	showModal() {
		document.getElementById('modalForm').classList.add("is-active");
	}
	
	closeModal() {
		document.getElementById('modalForm').classList.remove("is-active");
	}	

	closeModalEmail() {
		document.getElementById('modalEmail').classList.remove("is-active");
	}	

	onSubmitGoogle() {
		location.href = "api/auth/google";
		this.props.signInGoogleAction();
	}
	
	onSubmitFacebook() {
		location.href = "api/auth/facebook";
		this.props.signInFacebookAction();
	}
	
	render () {
	return (
		<div className="column is-8 is-offset-3">

			<div className="column">
				<h1 className="column is-12 title is-4">
					Discover another way to travel<br />
					Choose a destination<br />
					Meet new peoples<br />
					Share your passion<br />
					And Enjoy your trip!
				</h1>
				<Button className="button is-rounded" id="button" title="Create your account" action={this.showModal} />
			</div>
			
			<div className="modal" id="modalForm">
				<div className="modal-background"></div>
				<div className="modal-card">
					<header className="modal-card-head">
						<p className="modal-card-title">Sign Up</p>
						<button className="delete" aria-label="close" onClick={this.closeModal}></button>
					</header>
					<section className="modal-card-body">
						<FormContainer /> 
					</section>
				</div>
			</div>
			<div>
				<GoogleLoginButton onClick={this.onSubmitGoogle} />
				<FacebookLoginButton onClick={this.onSubmitFacebook} />
			</div>
			<div className="modal" id="modalEmail">
				<div className="modal-background"></div>
				<div className="modal-card">
					<section className="modal-card-body">
						Veuillez confirmer votre compte :)
					<button className="modal-close is-large" aria-label="close" onClick={this.closeModalEmail}></button>
					</section>
				</div>
			</div>
			
		</div>
	)}
}

SignupContainer.propTypes = {
	signInGoogleAction: PropTypes.func.isRequired,
	signInFacebookAction: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
		signInGoogleAction: signInGoogleAction,
		signInFacebookAction: signInFacebookAction
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(SignupContainer);