import React, {Component} from 'react';
import LoginInput from 'LoginInput';

const style = {
    gridBackground: {
        height: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: '40px 40px',
        backgroundImage: 'radial-gradient(circle, #E5E4E4 1px, rgba(0, 0, 0, 0) 4px)',
    },
};

class Login extends Component {

    render() {
        return (
            <div style={style.gridBackground}>
                <LoginInput
                    showAuthenticationError={this.props.showAuthenticationError}
                    changeAuthenticationErrorState={this.props.changeAuthenticationErrorState}
                    internalLogin={this.props.internalLogin}
                    externalLogin={this.props.externalLogin}
                />
            </div>
        );
    }
}

export default Login;