import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import '/imports/api/users';
import { Links } from '/imports/api/links';
import '../imports/startup/simple-schema-config';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });

    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });
  // Middleware
  // Request handles the incoming request
  // Response handles the outgoing response
  // Next moves the application on to complete
  // WebApp.connectHandlers.use((req, res, next) => {
  // console.log('this is from my custom middleware');
  // console.log(req.url);
  // console.log(req.method);
  // console.log(req.headers);
  // console.log(req.query);
  // Set HTTP status code
  // res.statusCode = 404;
  // Set HTTP headers
  // res.setHeader('my-custom-header', 'Christian was here');
  // Set HTTP body
  // res.write('<h1>Chicken Nuggets!</h1>');
  // End HTTP request
  // res.end();
  // next();
  // });
});
