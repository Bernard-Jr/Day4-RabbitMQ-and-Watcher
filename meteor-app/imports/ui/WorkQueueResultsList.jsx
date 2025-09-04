
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Mongo } from 'meteor/mongo';

// Define the collection client-side
const WorkQueueResults = new Mongo.Collection('work_queue_results');

export default function WorkQueueResultsList() {
  // Subscribe to the work_queue_results publication
  const results = useTracker(() => {
    Meteor.subscribe('work_queue_results');
    return WorkQueueResults.find({}, { sort: { processedAt: -1 } }).fetch();
  }, []);

  return (
    <div style={{ marginTop: 30 }}>
      <h3>Processed Tasks</h3>
      <ul>
        {results.map(r => (
          <li key={r._id}>
            <strong>{r.task}</strong> processed by <span style={{ color: '#1976d2' }}>Consumer {r.consumerId}</span> at {r.processedAt && new Date(r.processedAt).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
