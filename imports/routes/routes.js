import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Link from '/imports/ui/Link';
import Signup from '/imports/ui/Signup';
import NotFound from '/imports/ui/NotFound';
import Login from '/imports/ui/Login';

const history = createBrowserHistory();

const unAuthenticatedPages = ['/', 'signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    history.replace('/links');
  }
};

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    history.replace('/');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathName = history.location.pathname;
  const isUnauthenticatedPage = unAuthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);

  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/links');
  }
  if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/')
  }
};

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login} render={onEnterPublicPage} />
      <Route path="/signup" component={Signup} render={onEnterPublicPage} />
      <Route path="/links" component={Link} render={onEnterPrivatePage} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);