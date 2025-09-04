



import React, { useState } from 'react';
import MessageForm from './MessageForm.jsx';
import MessageList from './MessageList.jsx';
import WorkQueueDemo from './WorkQueueDemo.jsx';
import WatcherDemo from './WatcherDemo.jsx';

export const App = () => {
  const [tab, setTab] = useState('main');
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 40 }}>
      <nav style={{ marginBottom: 20 }}>
        <button onClick={() => setTab('main')} style={{ marginRight: 10, padding: '6px 16px', background: tab === 'main' ? '#e0e0e0' : '#fff' }}>Main Demo</button>
        <button onClick={() => setTab('workqueue')} style={{ marginRight: 10, padding: '6px 16px', background: tab === 'workqueue' ? '#e0e0e0' : '#fff' }}>Work Queue Demo</button>
        <button onClick={() => setTab('watcher')} style={{ padding: '6px 16px', background: tab === 'watcher' ? '#e0e0e0' : '#fff' }}>Watcher Demo</button>
      </nav>
      {tab === 'main' ? (
        <div>
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
      ) : tab === 'workqueue' ? (
        <WorkQueueDemo />
      ) : (
        <WatcherDemo />
      )}
    </div>
  );
};
