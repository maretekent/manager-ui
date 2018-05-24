import api from '../api';

export default class AuthService {

  static internalLogin(email) {
    var service = `service=${process.env.REACT_APP_UI_URL}/process_login`;
    window.location.replace(
      `${process.env.REACT_APP_AUTH_URL}/login?${service}`
    );
  }

  static externalLogin(email, password) {
    var form = new FormData();
    var service = `service=${process.env.REACT_APP_UI_URL}/process_login`
    var baseURL = process.env.REACT_APP_AUTH_URL;
    form.append('username', email);
    form.append('password', password);
    return fetch(`${baseURL}/login?${service}`, {
      method: 'POST',
      body: form,
      mode: 'cors'
    }).then((response) => {
      return response;
    }).catch(function(err) {
      console.log(err);
    });
  }

  static checkSession(serviceTicket) {
    if(!serviceTicket) {
      var serviceTicket = localStorage.getItem('ST');
    }
    if(serviceTicket) {
      var service = `service=${process.env.REACT_APP_UI_URL}/process_login?`;
      var ticket = `ticket=${serviceTicket}`;
      var baseURL = `${process.env.REACT_APP_API_URL}/verify_ticket?${service}&${ticket}`;
      api
        .get(baseURL)
        .then((response) => {
          if(response.data.validation_success) {
            localStorage.setItem('ST', ticket);
            window.location.replace(`${process.env.REACT_APP_UI_URL}/secure_resource`);
            return true;
          }
          return response.data.validation_success;
        })
        .catch((error) => {
          return false;
        });
    }
    return false;
  }

  static createSession(serviceTicket) {
    localStorage.setItem('ST', serviceTicket);
  }

  static destroyLocalSession() {
    localStorage.clear();
    window.location.replace(`${process.env.REACT_APP_UI_URL}/auth`);
  }
}
