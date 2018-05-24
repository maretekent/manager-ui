import React, { Component } from 'react';

const style = {
  footer: {
    backgroundColor: '#ffffff',
    position: 'fixed',
    bottom: 0,
    height: '64px',
    width: '100%',
  },
  footerContent: {
    padding: '15px',
  },
  footerLink: {
    padding: '12px',
    color: '#1caaf4',
    textDecoration: 'none',
  },
};

class Footer extends Component {
  render() {
    return (
      <div style={style.footer}>
        <div style={style.footerContent}>
          <a href="/" style={style.footerLink}> About Us </a>
          <a href="/" style={style.footerLink}> Ts & Cs </a>
          <a href="/" style={style.footerLink}> Privacy Policy </a>
        </div>
      </div>
    );
  }
}

export default Footer;
