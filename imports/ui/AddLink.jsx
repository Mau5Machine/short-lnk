import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import shortid from 'shortid';

class AddLink extends Component {

  onSubmit(e) {
    e.preventDefault();
    const url = this.refs.url.value.trim();
    if (url) {
      Meteor.call('links.insert', url);
      this.refs.url.value = '';
    }
  }

  render() {
    return (
      <div>
        <p>Add Link</p>
        <Form onSubmit={this.onSubmit.bind(this)}>
          <Form.Field>
            <input type="text" ref="url" name="url" placeholder="URL" />
            <Button primary>Add Link</Button>
          </Form.Field>
        </Form>
      </div>
    );
  }
}

export default AddLink;