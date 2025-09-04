# Day 4 RabbitMQ & Watcher Demo

This project demonstrates RabbitMQ producer-consumer patterns and Meteor integration, including:
- Basic producer-consumer messaging
- Work queue with multiple consumers and message persistence
- Real-time UI updates using Meteor and React

## How to Run

1. **Install dependencies:**
   - Meteor: https://www.meteor.com/install
   - Node.js: https://nodejs.org/
   - RabbitMQ: https://www.rabbitmq.com/download.html
   - Run `meteor npm install` in the `meteor-app` folder
   - Run `npm install amqplib` in the `meteor-app` folder

2. **Start Meteor app:**
   ```powershell
   meteor
   ```

3. **Start RabbitMQ consumers:**
   ```powershell
   node server/consumer_work_queue.js
   ```
   (Run in two or more terminals for load distribution)

4. **Send tasks to the queue:**
   ```powershell
   node server/producer_work_queue.js
   ```

5. **View results:**
   - Open your browser to `http://localhost:3000`
   - Switch to the "Work Queue Demo" tab to see which consumer processed each message

## Features
- Message persistence: tasks survive RabbitMQ restarts
- Real-time UI: see processed tasks and consumer IDs
- Checklist and step-by-step guides included in the repo

## Repo
https://github.com/Bernard-Jr/Day4-RabbitMQ-and-Watcher.git

---
This is a temporary README. Update with more details as needed.
