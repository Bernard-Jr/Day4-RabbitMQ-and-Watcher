# Hands-On Progress Checklist

Use this checklist to track your progress while working through the RabbitMQ work queue demo and related hands-on tasks.

## Work Queue Demo Tasks
- [x] Implement a producer that sends multiple tasks/messages to the queue
- [x] Implement two or more consumers that process tasks from the same queue
- [x] Enable message persistence in the queue
- [x] Create a new tab/section in the app for the work queue demo
- [x] Test load distribution by running multiple consumers
- [x] Visualize which consumer processed each message in the UI
- [x] Verify message persistence by restarting RabbitMQ and checking for saved messages
- [x] Save progress with git after each major step

---

## Watcher Integration Hands-On Tasks
- [ ] Create a new tab/section in the app for Watcher demo
- [ ] Integrate Watcher (reactive hook or subscription) into a functional component to monitor a data collection
- [ ] Simulate changes to the observed data (e.g., add, update, or remove items)
- [ ] Test that the UI updates in real time as data changes
- [ ] Show a live feed or dashboard view in the UI
- [ ] Save progress with git after each major step

---
Add notes or check off each item as you complete it. Update this file regularly to keep your hands-on work organized and visible.

## Watcher for Publications and Method Calls Demo Tasks
- [ ] Create a new tab/section in the app for Watcher Actions demo
- [ ] Configure Watcher to listen for specific database changes and trigger a publication
- [ ] Use Watcher to call a Meteor method based on real-time events
- [ ] Ensure reactivity flows smoothly from database changes to the client UI
- [ ] Implement a Watcher to call a method that modifies another collection or logs an event
- [ ] Test and verify that all triggered updates propagate correctly to the client
- [ ] Save progress with git after each major step
