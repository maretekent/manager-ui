import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';

import demoAppLogo from './assets/images/jumoLogo.png';
import  MainDashboardView from './views/MainDashboardView';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import LoginController from './controllers/LoginController';
//import SecureResourceView from './views/SecureResourceView';

import registerServiceWorker from './registerServiceWorker';

const muiTheme = getMuiTheme({
    palette: {
        textColor: Colors.darkBlack,
        primary1Color: Colors.darkBlack,
        primary2Color: Colors.indigo700,
        accent1Color: 'FFD700',
        pickerHeaderColor: Colors.darkBlack,
        alternateTextColor: '#FFD700',
    },
});

const style = {
    app: {
        textAlign: 'center',
    },
    appHeader: {
        color: '#ffffff',
        backgroundColor: '#000000',
        textAlign: 'left',
    },
    demoAppLogo: {
        padding: '18px 80px',
        height: '50px',
    },
};

class App extends Component {

    constructor() {
        super();
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            isAuthenticated: this.checkSession(),
        };
        this.handleResize = this.handleResize.bind(this);
    }

    // checkSession() {
    //     var serviceTicket = localStorage.getItem('ST');
    //     if (!serviceTicket) {
    //         return false;
    //     }
    //     else {
    //         return true;
    //     }
    // }

    checkSession(){
        return true;
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth,
        });
    }

    render() {

        const appStyle = Object.assign({}, style.app, {
            width: this.state.width,
            height: this.state.height,
        });

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={appStyle}>
                    <header style={style.appHeader}>
                        <img src={demoAppLogo} alt="" style={style.demoAppLogo}/>
                    </header>
                    <Router>
                        <div style={{height: '100%'}}>
                            <Route
                                path="/process_login"
                                render={props =>
                                    <LoginController
                                        isAuthenticated={this.state.isAuthenticated} {...props} />}
                            />
                            <Route
                                path="/(|auth)"
                                render={props =>
                                    <LoginController
                                        isAuthenticated={this.state.isAuthenticated} {...props} />}
                            />
                            <PrivateRoute
                                path="/secure_resource"
                                isAuthenticated={this.state.isAuthenticated}
                                component={MainDashboardView}
                            />
                        </div>
                    </Router>
                    <Footer />
                </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();