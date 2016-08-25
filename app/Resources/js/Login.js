import React from 'react';
import { login } from './helpers/ajax';

const Login = React.createClass({
  getInitialState: function() {
    return {
      isAdminLoggedIn: false,
      isLoading: false,
      hasError: false,
      username: '',
      password: '',
    };
  },
  usernameChangeHandler: function(e) {
     this.setState({username: e.target.value});
  },
  passwordChangeHandler: function(e) {
     this.setState({password: e.target.value});
  },
  submitHandler: function(e) {
    e.preventDefault();
    const data =
      'username='+this.state.username+
      '&password='+this.state.password;
    console.log('data', data);
    login(this, data);
  },
  render: function() {
      return (
        <form onSubmit={this.submitHandler} >

          <div className="col-md-12 text-center">
            <h2>Connexion back office</h2>
          </div>

          <div className="form-group">
            <label htmlFor="username">Utilisateur</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={this.state.username}
              onChange={this.usernameChangeHandler}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={this.state.password}
              onChange={this.passwordChangeHandler}
            />
          </div>

          <div className="col-md-12 text-center">
            <button
              type="submit"
              className="btn btn-default text-center"
            >Connexion</button>
          </div>

        </form>
      );
  }
});

export default Login;
