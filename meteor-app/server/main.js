// --- Imports ---
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import { LinksCollection } from '/imports/api/links';
import { Events } from '/imports/api/events';
import { ActionLogs } from '../imports/api/action_logs';
import { Messages } from '../imports/api/messages';
import './methods.js';

// --- Collections ---
export const WorkQueueResults = new Mongo.Collection('work_queue_results');

// --- Meteor Startup: Watchers, Initial Data, Publications ---
Meteor.startup(async () => {
  // Watcher: Log every new event added to Events
  Events.find().observe({
    added: async function (doc) {
      await ActionLogs.insertAsync({
        text: `Event added: ${doc.text || JSON.stringify(doc)}`,
        createdAt: new Date(),
        eventId: doc._id
      });
    }
  });

  // Initial data for Links collection
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

  // --- Publications ---
  Meteor.publish('links', function () {
    return LinksCollection.find();
  });

  Meteor.publish('events', function () {
    return Events.find({}, { sort: { createdAt: -1 } });
  });

  Meteor.publish('action_logs', function () {
    return ActionLogs.find({}, { sort: { createdAt: -1 } });
  });

  Meteor.publish('work_queue_results', function () {
    return WorkQueueResults.find({}, { sort: { processedAt: -1 } });
  });

  Meteor.publish('messages', function () {
    return Messages.find();
  });
});

// --- Meteor Methods ---
Meteor.methods({
  async 'actionLogs.clear'() {
    return await ActionLogs.removeAsync({});
  },
  async 'log.action'(logData) {
    check(logData, Object);
    logData.createdAt = new Date();
    try {
      return await ActionLogs.insertAsync(logData);
    } catch (error) {
      console.error('Error in log.action:', error);
      throw new Meteor.Error('log-action-failed', error.message || 'Unknown error');
    }
  },
  'workQueueResults.get'() {
    return WorkQueueResults.find({}, { sort: { processedAt: -1 } }).fetch();
  }
});

// --- Helper Functions ---
async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}
