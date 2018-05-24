import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import * as Colors from 'material-ui/styles/colors';

import AuthService from 'src/services/AuthService';

const style = {
  logoutButton: {
    verticalAlign: 'middle',
  },
};

function logout() {
  AuthService.destroyLocalSession();
}

class LogoutButton extends Component {
  render() {
    return (
      <div>
        <RaisedButton onClick={event => logout(event)}>
          <FontIcon className="material-icons" color={Colors.black} style={style.logoutButton}>
            chevron_right
          </FontIcon>
        </RaisedButton>
      </div>
    );
  }
}

export default LogoutButton;
