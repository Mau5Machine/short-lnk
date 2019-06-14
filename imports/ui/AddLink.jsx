import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import shortid from 'shortid';

class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const { url } = this.state;
    if (url) {
      Meteor.call('links.insert', url, (err, res) => {
        if (!err) {
          this.setState({ url: '' });
        }
      });
    }
  }
  onChange(e) {
    this.setState({
      url: e.target.value.trim()
    });
  }

  render() {
    return (
      <div>
        <p>Add Link</p>
        <Form onSubmit={this.onSubmit.bind(this)}>
          <Form.Field>
            <input
              type="text"
              placeholder="URL"
              value={this.state.url}
              onChange={this.onChange.bind(this)} />
            <Button primary>Add Link</Button>
          </Form.Field>
        </Form>
      </div>
    );
  }
}

export default AddLink;