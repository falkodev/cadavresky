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

          {this.state.isLoading ?
           <svg className="spinner spinner-alt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path opacity=".25" d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"></path>
              <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z" transform="rotate(297.427 16 16)"></path>
            </svg>:null}

          {this.state.hasError ?
            <div className="alert alert-danger alert-margin-60px" role="alert">
              <button type="button" onClick={ () => this.setState({hasError:false})} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <strong>Connexion impossible</strong>
                <br />Identifiant / mot de passe incorrect
                <br />ou problème de connexion avec la base de données
            </div>:null}

        </form>
      );
  }
});

export default Login;
