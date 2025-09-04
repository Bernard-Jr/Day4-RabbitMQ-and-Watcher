
import React, { useState } from 'react';
import WorkQueueResultsList from './WorkQueueResultsList.jsx';

export default function WorkQueueDemo() {
  const [info] = useState(
    'This section demonstrates a RabbitMQ work queue. You can run multiple consumers and see how tasks are distributed. Use the terminal to run the producer and consumers.'
  );

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 40 }}>
      <h1>Work Queue Demo</h1>
      <p style={{ background: '#f9f9f9', padding: '10px', borderRadius: '6px', marginBottom: '20px' }}>
        {info}
      </p>
      <ol>
        <li>Open two or more terminals and run <code>node server/consumer_work_queue.js</code> in each.</li>
        <li>Run <code>node server/producer_work_queue.js</code> to send tasks.</li>
        <li>Watch the results below to see which consumer processes each task.</li>
        <li>Try restarting RabbitMQ to test message persistence.</li>
      </ol>
      <WorkQueueResultsList />
    </div>
  );
}
