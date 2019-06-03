import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { routes, onAuthChange } from '/imports/routes/routes';

// Checking if users log in/out and updating instantly by calling a callback
Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  render(routes, document.getElementById('react-app'));
});
