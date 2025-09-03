# Day 4: RabbitMQ & Watcher Tutorials (8 Hours)

---
## Overview
This guide breaks down Day 4 into two main topics: RabbitMQ (morning) and Watcher (afternoon). Each concept is explained simply, followed by a checklist to track your progress. Use this as a reference for learning, hands-on practice, and demo preparation.

---
## Morning Session (4 Hours)
### 1. RabbitMQ Basics (2 Hours)
- **What is RabbitMQ?**
  - RabbitMQ is a message broker that helps different parts of an application communicate asynchronously by sending messages through queues.
- **Benefits of Message Queues**
  - Decouples services, improves scalability, and enables reliable communication in distributed systems.
- **Setting Up RabbitMQ**
  - Install RabbitMQ locally or on a cloud service.
  - Access the management dashboard to monitor queues and messages.
  - Run a basic test to ensure RabbitMQ is working.
  - Producer: Sends messages to a queue.
  - Consumer: Reads messages from the queue and processes them.

**Producer-Consumer Program**
  - Producer: Sends messages to a queue.
  - Consumer: Reads messages from the queue and processes them.

---
### Hands-On Demo: Producer-Consumer Program (Step-by-Step)

1. We created a simple web app with a form to send messages (the Producer).
2. When you type a message and click Send, the app sends it to RabbitMQ (the message broker).
3. A separate script (the Consumer) listens to RabbitMQ, receives each message, and saves it to the database.
4. The app displays all received messages in a list, showing what the consumer processed.

This demo shows how a producer can send messages to a queue, and a consumer can read and process them asynchronously using RabbitMQ.


- **Published a test message (e.g., "Hello") to the queue using the dashboard's Publish message feature.
- **Retrieved the message using the Get Message button, confirming the message was successfully sent and received.

---
## Step-by-Step Guide: RabbitMQ Basics

### 1. Access the RabbitMQ Management Dashboard
- Open your browser and go to [http://localhost:15672](http://localhost:15672).
- Log in with username `guest` and password `guest`.
- Explore the dashboard: you can view queues, exchanges, connections, and send test messages.

### 2. Run a Basic Test to Ensure RabbitMQ is Working
- In the dashboard, go to the "Queues" tab and create a new queue (e.g., `test-queue`).
- Use the "Publish message" button to send a test message to your queue.
- Check that the message appears in the queue and can be retrieved ("Get Message").
- This confirms RabbitMQ is running and ready for use.

### 3. Write a Simple Producer-Consumer Program
- You can use Node.js or Python for this demo. Below is a Node.js example:

#### Producer (sends messages to a queue)
```js
// producer.js
const amqp = require('amqplib');

async function send() {
  const conn = await amqp.connect('amqp://localhost');
  const ch = await conn.createChannel();
  const queue = 'test-queue';
  await ch.assertQueue(queue);
  ch.sendToQueue(queue, Buffer.from('Hello from Producer!'));
  console.log('Message sent');
  await ch.close();
  await conn.close();
}
send();
```

#### Consumer (reads messages from the queue)
```js
// consumer.js
const amqp = require('amqplib');

async function receive() {
  const conn = await amqp.connect('amqp://localhost');
  const ch = await conn.createChannel();
  const queue = 'test-queue';
  await ch.assertQueue(queue);
  ch.consume(queue, msg => {
    if (msg) {
      console.log('Received:', msg.content.toString());
      ch.ack(msg);
    }
  });
}
receive();
```

- Install the required package: `npm install amqplib`
- Run the producer: `node producer.js`
- Run the consumer: `node consumer.js`
- You should see the message sent and received in your terminal.

---
Follow these steps to complete the RabbitMQ basics section and verify your setup with hands-on practice.

### 2. RabbitMQ Queuing Mechanisms (2 Hours)
- **Key Concepts**
  - **Queues:** Store messages until consumed.
  - **Exchanges:** Route messages to queues based on rules.
  - **Bindings & Routing Keys:** Define how messages are routed.
  - **Persistent vs. Transient Messages:** Persistent messages survive broker restarts; transient do not.
- **Queue Types**
  - Simple, work, and fanout queues for different use cases.
- **Work Queue Example**
  - Multiple consumers process tasks from a single queue, demonstrating load distribution and message persistence.

---
## Afternoon Session (4 Hours)
### 3. Watcher Integration on Functional Components (2 Hours)
- **Watcher Overview**
  - Watcher observes changes in data or state and triggers updates in functional components.
- **Integration Steps**
  - Connect Watcher to a component's lifecycle.
  - Use Watcher to monitor state changes or trigger updates (e.g., live feeds, dashboards).
- **Hands-On**
  - Integrate Watcher to monitor a data collection and react to changes dynamically.

### 4. Watcher for Publications & Method Calls (2 Hours)
- **Using Watcher for Meteor Publications**
  - Configure Watcher to listen for database changes and trigger publications to update clients in real time.
- **Using Watcher for Method Calls**
  - Set up Watcher to call Meteor methods based on events, ensuring reactivity from database to UI.
- **Hands-On**
  - Create a Watcher that pushes updated data to clients and calls methods to modify collections or log events.

---
## Task List & Progress Tracker

### Morning Tasks
- [ ] Install RabbitMQ and access the management dashboard
- [ ] Run a basic message broker test
- [ ] Write a simple producer-consumer program
- [ ] Explore queues, exchanges, bindings, and routing keys
- [ ] Implement work queue example with multiple consumers
- [ ] Test message persistence and load distribution

### Afternoon Tasks
- [ ] Integrate Watcher into a functional component
- [ ] Monitor and react to data collection changes
- [ ] Configure Watcher for Meteor publications
- [ ] Set up Watcher to call Meteor methods on events
- [ ] Test real-time updates from database to client

---
## End-of-Day Deliverables
- **RabbitMQ:**
  - Working producer-consumer example
  - Implementation of different queue types and message persistence
- **Watcher:**
  - Watcher integrated into functional components
  - Watcher setup triggering publications and method calls for real-time updates

---
Use this guide to structure your learning, track your progress, and prepare for your demo at the end of the day.
