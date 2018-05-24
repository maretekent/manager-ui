import React, { Component } from 'react';
import LogoutButton from 'src/components/LogoutButton';

class SecureResourceView extends Component {
  render() {
    return (
      <div>
        <p> This is a secure resource. Click below to logout: </p>
        <LogoutButton />
      </div>
    );
  }
}

export default SecureResourceView;