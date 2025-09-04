// producer_work_queue.js
// Sends multiple persistent tasks to the work queue

const amqp = require('amqplib');

async function sendTasks(tasks) {
  const conn = await amqp.connect('amqp://localhost');
  const ch = await conn.createChannel();
  const queue = 'work-queue-demo';
  await ch.assertQueue(queue, { durable: true });
  tasks.forEach(task => {
    ch.sendToQueue(queue, Buffer.from(task), { persistent: true });
    console.log('Sent:', task);
  });
  await ch.close();
  await conn.close();
}

// Example usage: send 5 tasks
const tasks = [
  'Task 1',
  'Task 2',
  'Task 3',
  'Task 4',
  'Task 5'
];

sendTasks(tasks).catch(console.error);
