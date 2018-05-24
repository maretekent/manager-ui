import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as EmailValidator from 'email-validator';

const style = {
  loginInputContent: {
    padding: '20px',
  },
  loginInputContainer: {
    minWidth: '586px',
    top: '40%',
    left: '30%',
    width: '30%',
    height: '60%',
    backgroundColor: '#ffffff',
    textAlign: 'left',
    padding: '0 20px',
  },
  input: {
    float: 'left',
  },
  submitButton: {
    height: '50px',
    width: '175px',
  },
  submitButtonLabel: {
    top: '30%',
  },
  loginMessage1: {
    fontSize: '35px',
  },
  loginMessage2: {
    fontSize: '18px',
  },
  blankEmailErrorMessage: {
    color: 'red',
    display: 'inline-flex',
    fontSize: '12px',
    alignItems: 'center',
  },
  passwordErrorMessage: {
    color: 'red',
    display: 'inline-flex',
    fontSize: '12px',
    alignItems: 'center',
  },
  errorPasswordMessage: {
    color: 'red',
    display: 'inline-flex',
    alignItems: 'center',
  },
  errorIcon: {
    paddingRight: '0.3em',
  },
  forgotPassword: {
    color: '#b2b2b2',
    float: 'right',
    fontSize: '12px',
    textDecoration: 'none',
  },
};
class LoginInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordEnabled: false,
      invalidEmailError: false,
      blankEmailError: false,
      showPasswordError: false,
    };
  }
  componentDidMount() {
    this.emailInput.focus();
  }
  isValidEmail() {
    if (EmailValidator.validate(this.state.email)) {
      return true;
    }
    return false;
  }
  isEmailFieldBlank() {
    if (this.state.email === '') {
      return true;
    }
    return false;
  }
  isPasswordFieldBlank() {
    if (this.state.password === '') {
      return true;
    }
    return false;
  }
  isJumoEmail() {
    if ((RegExp('@jumo.wo')).test(this.state.email)) {
      return true;
    }
    return false;
  }
  handleClick() {
    if (this.isEmailFieldBlank()) {
      this.setState({ blankEmailError: true });
    } else if (this.isValidEmail()) {
      if (this.isJumoEmail()) {
        this.props.internalLogin(this.state.email);
      } else if (!this.state.passwordEnabled) {
        this.setState({ passwordEnabled: true });
        this.setFocusToPasswordInput();
      } else if (!this.isPasswordFieldBlank()) {
        this.props.externalLogin(this.state.email, this.state.password);
      } else if (this.isPasswordFieldBlank()) {
        this.setState({ showPasswordError: true });
      } else {
        this.props.changeAuthenticationErrorState(true);
        this.setFocusToPasswordInput();
      }
    } else {
      this.setState({ invalidEmailError: true });
      this.props.changeAuthenticationErrorState(true);
    }
  }
  handleEnter(event) {
    if (event.key === "Enter") {
      this.handleClick();
    }
  }
  clearErrorMessage(){
    this.setState({
      blankEmailError: false,
      invalidEmailError: false,
      showPasswordError: false,
    });
    this.props.changeAuthenticationErrorState(false);
  }
  setFocusToPasswordInput() {
    var passwordInput = this.passwordInput
    window.setTimeout(function (){ passwordInput.focus(); }, 0);
  }
  getPasswordText(){
    if(this.props.showAuthenticationError){
      return "";
    }
    return this.state.password;
  }

  render() {
    const loginMessage1 = 'Welcome to the Demo-App';
    const loginMessage2 = 'Please log in with your details below';
    const blankEmailErrorMessage = 'Email address is required';
    const invalidEmailErrorMessage = 'Invalid email address';
    const passwordErrorMessage = 'Password is required';
    const errorPasswordMessage = 'Oops! Your email/password combination is not valid.';
    const forgotPassword = <a href="/" style={style.forgotPassword}>Forgot password?</a>;

    return (
      <div style={style.loginInputContainer}>
        <div style={style.loginInputContent}>
          <p style={style.loginMessage1}> { loginMessage1} </p>
          <p style={style.loginMessage2}> {loginMessage2} </p>

          {this.props.showAuthenticationError && !this.state.invalidEmailError &&
            <div style={style.errorPasswordMessage}>
              <i style={style.errorIcon} className="material-icons">error</i>  {errorPasswordMessage}
            </div>
          }

          {this.props.showAuthenticationError && this.state.invalidEmailError &&
           <div style={style.errorPasswordMessage}>
             <i style={style.errorIcon} className="material-icons">error</i>  {invalidEmailErrorMessage}
           </div>
          }

          <TextField
            ref={input => { this.emailInput = input; }}
            hintText="Email address"
            floatingLabelText="Email address"
            errorText={this.state.invalidEmailError || this.state.blankEmailError ||
              this.props.showAuthenticationError ? ' ' : null}
            onKeyDown={event => this.handleEnter(event)}
            onChange={
              (event, newValue) => {
                this.setState({ email: newValue });
                this.clearErrorMessage();
                //Hide and clear the password field on the following conditions
                if (this.isJumoEmail() || this.isEmailFieldBlank() || this.isValidEmail()) {
                  this.setState({password: ''});
                  this.passwordInput.value = '';
                  this.setState({ passwordEnabled: false });
                }
              }
            }
            fullWidth={true}
          />
          <br />
          <TextField
            value={this.getPasswordText()}
            ref={input => { this.passwordInput = input; }}
            style={this.state.passwordEnabled ? {} : { display: 'none' }}
            type="password"
            hintText="Password"
            floatingLabelText="Password"
            errorText={this.state.showPasswordError || this.props.showAuthenticationError ? ' ' : null}
            onChange={
              (event, newValue) => {
                this.setState({ password: newValue });
                this.clearErrorMessage();
              }
            }
            onKeyDown={event => this.handleEnter(event)}
            fullWidth={true}
          />

          {this.state.blankEmailError &&
            <div style={style.blankEmailErrorMessage}>
              {blankEmailErrorMessage}
            </div>
          }

           {this.state.showPasswordError &&
            <div style={style.passwordErrorMessage}>
              {passwordErrorMessage}
            </div>
          }

          {this.state.passwordEnabled &&
            <div style={style.forgotPassword}> {forgotPassword} </div>
          }

          <br /> <br />
          <RaisedButton
            label={this.state.passwordEnabled ? "LOG IN" : "NEXT"}
            style={style.submitButton}
            labelStyle={style.submitButtonLabel}
            onClick={event => this.handleClick(event)}
            backgroundColor="#1CAAF4"
            labelColor="white"
          />
        </div>
      </div>
    );
  }
}

export default LoginInput;
