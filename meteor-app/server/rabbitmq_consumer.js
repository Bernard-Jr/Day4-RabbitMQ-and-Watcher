// Simple RabbitMQ Consumer for Meteor
const amqp = require('amqplib');
const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb://localhost:3001/meteor'; // Default Meteor MongoDB
const QUEUE = 'test-queue';

async function startConsumer() {
  const conn = await amqp.connect('amqp://localhost');
  const ch = await conn.createChannel();
  await ch.assertQueue(QUEUE);
  const mongo = await MongoClient.connect(MONGO_URL);
  const db = mongo.db();
  const collection = db.collection('messages');

  ch.consume(QUEUE, async msg => {
    if (msg) {
      const text = msg.content.toString();
      await collection.insertOne({ text, receivedAt: new Date() });
      console.log('Received and saved:', text);
      ch.ack(msg);
    }
  });
}

startConsumer().catch(console.error);
