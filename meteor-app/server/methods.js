import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
const { sendMessage } = require('./rabbitmq_producer');

Meteor.methods({
  'messages.send'(text) {
    check(text, String);
    sendMessage(text);
  },
});
