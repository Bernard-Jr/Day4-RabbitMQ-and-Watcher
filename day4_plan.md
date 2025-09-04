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

### How and Where the UI is Applied in the App

The Meteor app includes a simple user interface (UI) built with React. On the main page, you’ll find:

- **Message Form:** Lets you type and send a message. When you submit, the message is sent to RabbitMQ as the producer.
- **Message List:** Displays all messages received and processed by the consumer (from RabbitMQ, saved in the database).

This UI is defined in `imports/ui/App.jsx` and rendered in `client/main.jsx`. The form interacts with Meteor methods to send messages, and the list updates in real time as new messages arrive.

**How it works:**
1. You type a message and click Send.
2. The app calls a Meteor method, which sends the message to RabbitMQ.
3. The consumer script receives the message from RabbitMQ and saves it to MongoDB.
4. The UI automatically updates to show all received messages.

This makes it easy to see the producer-consumer workflow in action, directly from your browser.


- **Published a test message (e.g., "Hello") to the queue using the dashboard's Publish message feature.
- **Retrieved the message using the Get Message button, confirming the message was successfully sent and received.

---

## Step-by-Step Guide: Testing the Demo

Follow these steps to test your producer-consumer demo and verify everything works as expected:

### 1. Start Meteor and RabbitMQ Consumer
- Open two terminal windows.
- In the first, run: `meteor` (or `meteor --port 3001` if you want a custom port).
- In the second, run: `node server/rabbitmq_consumer.js` to start the consumer script.

### 2. Open the App in Your Browser
- Go to `http://localhost:3000` (or your chosen port).
- You should see the message form and the list of received messages.

### 3. Send a Test Message
- Type a message in the form and click Send.
- The message should appear in the list below after a short delay (as it is processed by RabbitMQ and saved to the database).

### 4. Check the Consumer Output
- In the terminal running the consumer, you should see logs like `Received and saved: <your message>`.

### 5. Verify Database Storage
- (Optional) Use a MongoDB client to check the `messages` collection and confirm your messages are saved.

### 6. Test Multiple Messages
- Send several messages to ensure all are processed and displayed correctly.

### 7. Troubleshooting
- If messages do not appear, check both terminal windows for errors.
- Make sure RabbitMQ is running and accessible at `amqp://localhost`.
- Ensure MongoDB is running and the connection string matches your Meteor setup.

This guide helps you confirm that the producer, consumer, and UI are working together as intended.

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


### RabbitMQ Basic Queuing Exercise (2 Hours)

**Objective:**  
Learn how RabbitMQ handles different types of queues and message delivery through hands-on examples.

**Key Concepts:**
- **Queues:** Store messages until a consumer is ready to process them.
- **Exchanges:** Decide how messages are routed to queues.
- **Bindings & Routing Keys:** Control which messages go to which queues.
- **Persistent vs. Transient Messages:** Persistent messages are saved to disk and survive broker restarts; transient messages are kept in memory and may be lost if RabbitMQ restarts.

**Queue Types:**
- **Simple Queue:** One producer, one consumer.
- **Work Queue:** One producer, multiple consumers share the workload.
- **Fanout Queue:** One message is sent to multiple queues (broadcast).

**Hands-On Practice:**
- Set up a work queue where several consumers process tasks from the same queue.
- Try sending multiple messages and watch how they are distributed among consumers.
- Test message persistence by marking messages as persistent and restarting RabbitMQ to see if they are still there.

**Why This Matters:**
These exercises help you understand how RabbitMQ can balance workloads, ensure reliable delivery, and support different messaging patterns in real-world applications.

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
- [x] Install RabbitMQ and access the management dashboard
- [x] Run a basic message broker test
- [x] Write a simple producer-consumer program
- [ ] Explore queues, exchanges, bindings, and routing keys
- [ ] Implement work queue example with multiple consumers
- [ ] Test message persistence and load distribution

---
**Tip:** Save your progress with git:
```powershell
git add .
git commit -m "Completed RabbitMQ setup and basic producer-consumer demo"
```
- [x] Save progress with git (`git add . && git commit -m "morning tasks complete"`)


### Afternoon Tasks
- [x] Integrate Watcher into a functional component
- [x] Monitor and react to data collection changes
- [x] Configure Watcher for Meteor publications
- [x] Set up Watcher to call Meteor methods on events
- [x] Test real-time updates from database to client
- [x] Save progress with git (`git add . && git commit -m "afternoon tasks complete"`)

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
