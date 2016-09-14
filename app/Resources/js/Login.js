import React from 'react';
import { login } from './helpers/ajax';
import Spinner from './Layout/Spinner';

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

          { this.state.isLoading ? <Spinner alt="true" /> : null }

          { this.state.hasError ?
            <div className="alert alert-danger alert-margin-60px" role="alert">
              <button type="button" onClick={ () => this.setState({hasError:false})} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <strong>Connexion impossible</strong>
                <br />Identifiant / mot de passe incorrect
                <br />ou problème de connexion avec la base de données
            </div> : null }

        </form>
      );
  }
});

export default Login;
