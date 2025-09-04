import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
const { sendMessage } = require('./rabbitmq_producer');
import { Events } from '../imports/api/events';

Meteor.methods({
  'messages.send'(text) {
    check(text, String);
    sendMessage(text);
  },
  'events.add'(eventData) {
    check(eventData, Object);
    // Optionally validate required fields, e.g. eventData.name, eventData.type, etc.
      try {
        eventData.createdAt = new Date();
        const result = Events.insertAsync(eventData);
        return result;
      } catch (error) {
        throw new Meteor.Error('events-add-failed', error.message || 'Unknown error');
      }
  },
    'events.clear'() {
      // Remove all events from the collection
      return Events.removeAsync({});
    },
});
