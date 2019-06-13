import React, { Component } from 'react';
import { List, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';

export default class LinksListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      copied: false,
      error: '',
      styles: {
        color: 'red',
        paddingLeft: '10px'
      }
    }
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard.on('success', () => {
      this.setState({ copied: true }),
        setTimeout(() => this.setState({ copied: false }), 1000);
    })
      .on('error', () => { this.setState({ error: 'Something went wrong with the copy method' }) });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    return (
      <div>
        <List.Item key={this.props._id}>
          <List.Content>
            <List.Description>{this.props.url}</List.Description>
            <List.Description>{this.props.shortUrl}</List.Description>
            <button ref="copy" data-clipboard-text={this.props.shortUrl}>{this.state.copied ? 'Copied' : 'Copy'}</button>
            {this.state.error ? <small style={this.state.styles}>{this.state.error}</small> : undefined}
          </List.Content>
        </List.Item>
      </div >
    );
  }
}

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
}