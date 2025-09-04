// Server-side Watcher: Log every new event added to Events
Meteor.startup(() => {
  Events.find().observe({
    added: function (doc) {
      ActionLogs.insert({
        text: `Event added: ${doc.text || JSON.stringify(doc)}`,
        createdAt: new Date(),
        eventId: doc._id
      });
    }
  });
});
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { LinksCollection } from '/imports/api/links';
import { Events } from '/imports/api/events';
import { ActionLogs } from '../imports/api/action_logs';

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  if (await LinksCollection.find().countAsync() === 0) {
    await insertLink({
      title: 'Do the Tutorial',
      url: 'https://react-tutorial.meteor.com/simple-todos/01-creating-app.html',
    });

    await insertLink({
      title: 'Follow the Guide',
      url: 'https://guide.meteor.com',
    });

    await insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    });

    await insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    });
  }

  // We publish the entire Links collection to all clients.
  Meteor.publish("links", function () {
    return LinksCollection.find();
  });

  // Publish all events for the Watcher demo
  Meteor.publish("events", function () {
    return Events.find({}, { sort: { createdAt: -1 } });
  });

  // Publish action logs for Watcher Actions Demo
  Meteor.publish("action_logs", function () {
    return ActionLogs.find({}, { sort: { createdAt: -1 } });
  });
});

// Import Meteor methods for RabbitMQ producer
import './methods.js';

// Meteor method to log actions
Meteor.methods({
  'log.action'(logData) {
    check(logData, Object);
    logData.createdAt = new Date();
    return ActionLogs.insert(logData);
  }
});


import { Mongo } from 'meteor/mongo';
export const WorkQueueResults = new Mongo.Collection('work_queue_results');

Meteor.publish('work_queue_results', function () {
  return WorkQueueResults.find({}, { sort: { processedAt: -1 } });
});

Meteor.methods({
  'workQueueResults.get'() {
    return WorkQueueResults.find({}, { sort: { processedAt: -1 } }).fetch();
  }
});

// Publish messages collection for UI
import { Messages } from '../imports/api/messages';
Meteor.publish('messages', function () {
  return Messages.find();
});
