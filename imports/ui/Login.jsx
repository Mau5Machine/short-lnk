import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.setState({
          error: 'Unable to login, check email and password'
        });
      } else {
        this.setState({
          error: ''
        });
      }
    });
  }
  render() {
    return (
      <div>
        <h1>Short Lnk</h1>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input type="password" ref="password" name="password" placeholder="Password" />
          <button>Sign In</button>
        </form>

        <Link to="/signup">Don't have an account?</Link>
      </div>
    );
  }
}

export default Login;