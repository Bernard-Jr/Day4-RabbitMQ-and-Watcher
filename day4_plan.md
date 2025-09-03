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
- **Producer-Consumer Program**
  - Producer: Sends messages to a queue.
  - Consumer: Reads messages from the queue and processes them.

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
