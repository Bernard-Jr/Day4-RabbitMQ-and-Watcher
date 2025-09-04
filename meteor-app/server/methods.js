import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
const { sendMessage } = require('./rabbitmq_producer');
import { Events } from '../imports/api/events';
import { ActionLogs } from '../imports/api/action_logs';

Meteor.methods({
  'messages.send'(text) {
    check(text, String);
    sendMessage(text);
  },
  async 'events.add'(eventData) {
    check(eventData, Object);
    try {
      eventData.createdAt = new Date();
      const result = await Events.insertAsync(eventData);
      // Only the watcher will log event additions to action_logs
      return result;
    } catch (error) {
      throw new Meteor.Error('events-add-failed', error.message || 'Unknown error');
    }
  },
    async 'events.clear'() {
      // Remove all events from the collection
      return await Events.removeAsync({});
    },
});
