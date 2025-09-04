import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// Define the collection client-side
const Events = new Mongo.Collection('events');

export default function WatcherDemo() {
  const [input, setInput] = useState('');
  const events = useTracker(() => {
    Meteor.subscribe('events');
    return Events.find({}, { sort: { createdAt: -1 } }).fetch();
  }, []);

  const addEvent = e => {
    e.preventDefault();
    if (input.trim()) {
    Meteor.call('events.add', { text: input.trim() });
      setInput('');
    }
  };

  const clearEvents = () => {
    Meteor.call('events.clear');
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 40 }}>
      <h1>Watcher Demo</h1>
      <p>This demo shows how a functional component can monitor and react to changes in a data collection in real time.</p>
      <form onSubmit={addEvent} style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add an event..."
          style={{ width: '70%' }}
        />
        <button type="submit">Add</button>
        <button type="button" onClick={clearEvents} style={{ marginLeft: 10 }}>Clear All</button>
      </form>
      <h3>Live Feed</h3>
      <ul>
        {events.map(ev => (
          <li key={ev._id}>{ev.text} <small>{ev.createdAt && new Date(ev.createdAt).toLocaleTimeString()}</small></li>
        ))}
      </ul>
    </div>
  );
}
