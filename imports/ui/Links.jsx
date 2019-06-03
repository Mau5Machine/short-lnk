import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

class Links extends Component {
  onLogout() {
    Accounts.logout();
  }
  render() {
    return (
      <div>
        <h1>Your Stored Links</h1>
        <button onClick={this.onLogout.bind(this)} > Log Out</button>
      </div>
    );
  }
}

export default Links;