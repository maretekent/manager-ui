import React, { Component } from 'react';

import LoginView from '../views/LoginView';
import AuthService from '../services/AuthService';
const queryString = require('query-string');

class LoginController extends Component {
  constructor(props) {
    super(props);
    this.changeAuthenticationErrorState = this.changeAuthenticationErrorState.bind(this);
    this.externalLogin = this.externalLogin.bind(this);
    this.state = {
      showAuthenticationError: false,
    }
  }

  internalLogin(email) {
    AuthService.internalLogin(email);
  }

  externalLogin(email, password) {
    AuthService
      .externalLogin(email, password)
      .then(response => {
        if (response.url.indexOf("?authentication_failed=true") !== -1 ||
        response.status != 200) {
          this.changeAuthenticationErrorState(true)
        } else {
          window.location.replace(response.url);
        }
      }).catch(function(err) {
        console.log(err);
      });
  }

  changeAuthenticationErrorState(state) {
    this.setState({ showAuthenticationError: state });
  }

  componentWillMount() {
    if(this.props.isAuthenticated) {
      window.location.replace(`${process.env.REACT_APP_UI_URL}/secure_resource`);
    }

    if (RegExp('process_login').test(this.props.match.path)) {
      var ticket = this.props.location.search;
      if(AuthService.checkSession(ticket)) {
        window.location.replace(`${process.env.REACT_APP_UI_URL}/secure_resource`)
      }
    }
  }
  render() {
    return (
      <LoginView
        showAuthenticationError={this.state.showAuthenticationError}
        changeAuthenticationErrorState={this.changeAuthenticationErrorState}
        internalLogin={this.internalLogin}
        externalLogin={this.externalLogin}
      />
    );
  }
}

export default LoginController;
