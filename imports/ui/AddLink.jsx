import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';
import shortid from 'shortid';

class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const { url } = this.state;
    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason })
      }
    });
  }
  onChange(e) {
    this.setState({
      url: e.target.value.trim()
    });
  }
  handleModalClose() {
    this.setState({
      url: '',
      isOpen: false,
      error: ''
    });
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ isOpen: true })}>Add Link</Button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
        >
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : ''}
          <Form onSubmit={this.onSubmit.bind(this)}>
            <Form.Field>
              <input
                type="text"
                placeholder="URL"
                value={this.state.url}
                onChange={this.onChange.bind(this)}
                ref="url"
              />
              <Button primary>Add Link</Button>
            </Form.Field>
          </Form>
          <Button onClick={this.handleModalClose.bind(this)}>Close Modal</Button>
        </Modal>
      </div>
    );
  }
}

export default AddLink;