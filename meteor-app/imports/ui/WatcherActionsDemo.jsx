import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// Define a collection for logs (for demo purposes)
const ActionLogs = new Mongo.Collection('action_logs');

export default function WatcherActionsDemo() {
  const [input, setInput] = useState('');
  const logs = useTracker(() => {
    Meteor.subscribe('action_logs');
    return ActionLogs.find({}, { sort: { createdAt: -1 } }).fetch();
  }, []);

  // Simulate an event that triggers a Meteor method
  const triggerAction = e => {
    e.preventDefault();
    if (input.trim()) {
      Meteor.call('log.action', { text: input.trim() });
      setInput('');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 40 }}>
      <h1>Watcher Actions Demo</h1>
      <p>This demo shows how a Watcher can trigger Meteor methods and publications in real time.</p>
      <form onSubmit={triggerAction} style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type an action to log..."
          style={{ width: '70%' }}
        />
        <button type="submit">Trigger Action</button>
      </form>
      <h3>Action Log Feed</h3>
      <ul>
        {logs.map(log => (
          <li key={log._id}>{log.text} <small>{log.createdAt && new Date(log.createdAt).toLocaleTimeString()}</small></li>
        ))}
      </ul>
    </div>
  );
}
