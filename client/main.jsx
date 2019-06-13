import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { routes, onAuthChange } from '/imports/routes/routes';
import '../imports/startup/simple-schema-config';
import { Links } from '/imports/api/links';

// Checking if users log in/out and updating instantly by calling a callback
Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});


const StatelessFComponent = (props) => {

}
Meteor.startup(() => {
  const url = 'http://links.com';

  render(routes, document.getElementById('react-app'));
});
