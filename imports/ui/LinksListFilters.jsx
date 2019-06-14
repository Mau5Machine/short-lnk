import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';
export default class LinksListFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisible: true,
    }
  }
  componentDidMount() {
    this.linkTracker = Tracker.autorun(() => {
      const showVisible = Session.get('showVisible');
      this.setState({ showVisible });
    });
  }
  componentWillUnmount() {
    this.linkTracker.stop();
  }
  render() {
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={!this.state.showVisible}
            onChange={(e) => {
              Session.set('showVisible', !e.target.checked);
            }} />
          show hidden links
    </label>
      </div>
    );
  }
}
