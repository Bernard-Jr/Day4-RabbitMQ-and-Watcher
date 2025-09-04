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


### How and Where the Work Queue Demo is Applied in the App

The work queue demo is implemented as a separate tab in the Meteor app UI. You can access it by clicking the "Work Queue Demo" tab at the top of the app.

- **Producer Script:** `server/producer_work_queue.js` sends multiple persistent tasks to a RabbitMQ queue.
- **Consumer Script:** `server/consumer_work_queue.js` runs in multiple terminals, each acting as a consumer and saving processed tasks (with consumer ID) to MongoDB.
- **UI Integration:** The tab uses `imports/ui/WorkQueueDemo.jsx` and `imports/ui/WorkQueueResultsList.jsx` to display which consumer processed each message in real time.

**How it works:**
1. You send tasks using the producer script.
2. Multiple consumers process tasks from the queue and save results to the database.
3. The UI tab shows all processed tasks and which consumer handled each one.
4. Message persistence is enabled, so tasks survive RabbitMQ restarts.

This makes it easy to see load distribution and persistence in action, directly from your browser.

---
### Step-by-Step Guide: Testing the Work Queue Demo

1. Open two or more terminals and run `node server/consumer_work_queue.js` in each to start multiple consumers.
2. In another terminal, run `node server/producer_work_queue.js` to send tasks to the queue.
3. Go to the "Work Queue Demo" tab in your app to see which consumer processed each task.
4. To test persistence, stop all consumers, send tasks, restart RabbitMQ, then start consumers again and check that tasks are still processed.
5. Save your progress with git after verifying persistence and UI updates.

---
## Afternoon Session (4 Hours)
### 3. Watcher Integration on Functional Components (2 Hours)
**Objective:**
Learn how to use Watcher in React functional components for real-time monitoring and updates.

**Key Concepts:**

---
#### Simple Explanation & Implementation Summary

**Objective:**
Integrate Watcher into React functional components to enable real-time monitoring and updates.

**How it works:**
- Watcher uses Meteor's reactive data hooks (like `useTracker`) inside a functional component to subscribe to a data collection (e.g., `events`).
- When the data changes (add, update, remove), the component automatically re-renders, showing the latest data instantly.
- This pattern is ideal for live feeds, dashboards, and any UI that needs to stay up-to-date without manual refreshes.

**Tasks:**
1. Understand how Watcher interacts with functional components and their lifecycle (mount, update, unmount).
2. Implement Watcher by subscribing to a collection and observing state changes in a functional component.
3. Explore use cases where Watcher enhances interactivity, such as live feeds or dashboards (e.g., the Watcher Demo tab).

**Example:**
- In the Watcher Demo tab, a functional component subscribes to the `events` collection. When a user adds or clears events, the UI updates in real time for all users.

---

**Hands-On Practice:**
- Integrate Watcher into a functional component to monitor a data collection (e.g., a MongoDB collection).
- When the data changes, Watcher triggers a UI update automatically.
- Simulate data changes and observe the UI updating in real time.

**Example Use Case:**
- A dashboard that shows live updates from a database, such as new messages or sensor readings.

---
#### How and Where Watcher Was Implemented in the App

The Watcher demo is implemented as a separate tab in the Meteor app UI. You can access it by clicking the "Watcher Demo" tab at the top of the app.

- **Functional Component:** The demo uses a React functional component (`imports/ui/WatcherDemo.jsx`) that subscribes to the `events` collection using Meteor's reactive data hooks.
- **Live Feed:** The component displays a live feed of events, updating automatically whenever the data changes (add, clear, etc.).
- **Data Changes:** Users can add new events or clear all events, and the UI updates in real time for all connected clients.

**How it works:**
1. The component subscribes to the `events` publication from the server.
2. When an event is added or cleared, the MongoDB collection updates.
3. Meteor's reactivity ensures the UI updates instantly for all users.

---
#### Step-by-Step Guide: Testing the Watcher Demo

1. Start the Meteor app: `meteor` (or your chosen port).
2. Open the app in your browser and go to the "Watcher Demo" tab.
3. Add a new event using the input field and click "Add".
4. Observe the event appearing in the live feed below.
5. Open another browser/tab to confirm real-time updates across clients.
6. Click "Clear All" to remove all events and verify the feed updates instantly.
7. (Optional) Restart the Meteor server to check if events persist (if persistence is enabled).
8. Save your progress with git after verifying functionality.

This guide helps you confirm that Watcher integration and real-time UI updates are working as intended in your demo.

---
### Using Watcher for Publications and Method Calls (2 Hours)
**Objective:**
Use Watcher to trigger Meteor publications and method calls for seamless real-time data handling.

**Key Concepts:**
- Watcher can listen for specific database changes (like inserts, updates, or deletes).
- When a change is detected, Watcher can trigger a Meteor publication to push new data to clients.
- Watcher can also call Meteor methods to perform actions, such as updating another collection or logging events.
- This ensures that changes in the database are immediately reflected in the client UI.

**Hands-On Practice:**
- Create a Watcher that monitors a collection and triggers a publication to update clients in real time.
- Implement a Watcher that calls a Meteor method when an event occurs (e.g., a new document is added).
- Test by making changes to the observed collection and verifying that updates reach the client instantly.

**Example Use Case:**
- A notification system that pushes alerts to users as soon as relevant data changes in the database.

---
These steps will help you understand and implement real-time reactivity in your Meteor app using Watcher patterns and Meteor's built-in reactivity features.

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
