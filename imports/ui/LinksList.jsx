import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { Links } from '../api/links';
import { List, Card } from 'semantic-ui-react';
import LinksListItem from './LinksListItem';

export default class LinksList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      links: []
    }
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('linksPub');
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({ links });
    });
  }

  componentWillUnmount() {
    this.linksTracker.stop();
  }

  renderLinksListItems() {
    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />;
    });
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Content>
            <p>Links List Here! YO!</p>
            <List divided relaxed>
              {this.renderLinksListItems()}
            </List>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
