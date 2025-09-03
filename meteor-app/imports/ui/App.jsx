

import React from 'react';
import MessageForm from './MessageForm.jsx';
import MessageList from './MessageList.jsx';

export const App = () => (
  <div style={{ maxWidth: 500, margin: '0 auto', padding: 40 }}>
    <h1>RabbitMQ Producer-Consumer Demo</h1>
    <section>
      <h2>Producer</h2>
      <p>Send a message to the queue:</p>
      <MessageForm />
    </section>
    <section style={{ marginTop: 40 }}>
      <h2>Consumer</h2>
      <p>Messages received from the queue:</p>
      <MessageList />
    </section>
  </div>
);
