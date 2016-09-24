import React from 'react';
import Spinner from './Layout/Spinner';
import { sendEmail } from './helpers/ajax';

const Contact = React.createClass({
  getInitialState: function() {
    return {
      isLoading: false,
      hasError: false,
      email: '',
      message: '',
    };
  },
  emailChangeHandler: function(e) {
     this.setState({email: e.target.value});
  },
  messageChangeHandler: function(e) {
     this.setState({message: e.target.value});
  },
  submitHandler: function(e) {
    e.preventDefault();
    const data =
      'email='+this.state.email+
      '&message='+this.state.message;
    sendEmail(this, data);
  },
  render: function() {
      return (
        <form onSubmit={this.submitHandler} >

          <div className="col-md-12 text-center">
            <h2>Formulaire de contact</h2>
          </div>

          <div className="form-group">
            <label htmlFor="email">Adresse email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={this.state.email}
              onChange={this.emailChangeHandler}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              className="form-control"
              id="message"
              value={this.state.message}
              onChange={this.messageChangeHandler}
              style={{height: '150px'}}
              required
            />
          </div>

          <div className="col-md-12 text-center">
            <button
              type="submit"
              className="btn btn-default text-center"
            >Envoyer</button>
          </div>

          { this.state.isLoading ? <Spinner alt="true" /> : null }

          { this.state.hasError ?
            <div className="alert alert-danger alert-margin-60px" role="alert">
              <button type="button" onClick={ () => this.setState({hasError:false})} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <strong>Envoi impossible</strong>
                <br />Problème d'envoi de l'email. Veuillez réessayer plus tard.
            </div> : null }

        </form>
      );
  }
});

export default Contact;
