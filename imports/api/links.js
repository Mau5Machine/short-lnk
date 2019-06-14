import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('linksPub', function () {
    return Links.find({ userId: this.userId });
  });
}

// resource.action
// links.insert
Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('Not Authorized');
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url });

    Links.insert({
      url,
      userId: this.userId,
      visible: true,
      visitedAt: null,
      visitedCount: 0
    });
  },
  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('Not Authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({ _id, visible });

    Links.update({ _id, userId: this.userId }, { $set: { visible } });
  },
  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Links.update({ _id }, {
      $set: {
        visitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    });
  }
});

