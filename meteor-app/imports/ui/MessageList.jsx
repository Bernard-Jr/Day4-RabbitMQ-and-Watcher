import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Messages } from '../api/messages';
import { Meteor } from 'meteor/meteor';

export default function MessageList() {
  // Subscribe to the messages publication
  useTracker(() => {
    Meteor.subscribe('messages');
  }, []);
  const messages = useTracker(() => Messages.find({}, { sort: { receivedAt: -1 } }).fetch());

  return (
    <ul>
      {messages.map(msg => (
        <li key={msg._id}>{msg.text} <small>{msg.receivedAt && new Date(msg.receivedAt).toLocaleString()}</small></li>
      ))}
    </ul>
  );
}
