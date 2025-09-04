// consumer_work_queue.js
// Processes tasks from the work queue and logs which consumer handled each task


const amqp = require('amqplib');
const { MongoClient } = require('mongodb');

const QUEUE = 'work-queue-demo';
const CONSUMER_ID = process.env.CONSUMER_ID || Math.floor(Math.random() * 1000);
const MONGO_URL = 'mongodb://localhost:4001/meteor'; // Adjust if your Meteor MongoDB runs elsewhere

async function startConsumer() {
  const conn = await amqp.connect('amqp://localhost');
  const ch = await conn.createChannel();
  await ch.assertQueue(QUEUE, { durable: true });
  ch.prefetch(1); // Fair dispatch: one message at a time per consumer
  console.log(`Consumer ${CONSUMER_ID} waiting for tasks...`);

  // Connect to MongoDB
  const mongo = await MongoClient.connect(MONGO_URL);
  const db = mongo.db();
  const collection = db.collection('work_queue_results');

  ch.consume(QUEUE, async msg => {
    if (msg) {
      const task = msg.content.toString();
      console.log(`Consumer ${CONSUMER_ID} processed:`, task);
      // Simulate work
      await new Promise(res => setTimeout(res, 1000));
      // Save result to MongoDB
      await collection.insertOne({ task, consumerId: CONSUMER_ID, processedAt: new Date() });
      ch.ack(msg);
    }
  }, { noAck: false });
}

startConsumer().catch(console.error);
