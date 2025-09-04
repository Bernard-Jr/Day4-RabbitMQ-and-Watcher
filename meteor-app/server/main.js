import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { Events } from '/imports/api/events';

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
});

// Import Meteor methods for RabbitMQ producer
import './methods.js';


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
