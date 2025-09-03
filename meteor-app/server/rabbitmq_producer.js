// Simple RabbitMQ Producer for Meteor
const amqp = require('amqplib');

async function sendMessage(text) {
  const conn = await amqp.connect('amqp://localhost');
  const ch = await conn.createChannel();
  const queue = 'test-queue';
  await ch.assertQueue(queue);
  ch.sendToQueue(queue, Buffer.from(text));
  await ch.close();
  await conn.close();
}

module.exports = { sendMessage };
