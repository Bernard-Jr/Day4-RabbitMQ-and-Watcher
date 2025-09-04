

import React from 'react';
import MessageForm from './MessageForm.jsx';
import MessageList from './MessageList.jsx';

export const App = () => (
  <div style={{ maxWidth: 500, margin: '0 auto', padding: 40 }}>
    <h1>RabbitMQ Producer-Consumer Demo</h1>
    <p style={{ background: '#f9f9f9', padding: '10px', borderRadius: '6px', marginBottom: '20px', fontSize: '1rem' }}>
      <strong>How it works:</strong> Type a message and send it using the form below. Your message is sent to RabbitMQ (the producer), processed by a consumer script, and saved to the database. All received messages are displayed in the list below in real time.
    </p>
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
