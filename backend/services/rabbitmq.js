// backend/services/rabbitmq.js
const amqp = require('amqplib');
const config = require('../config');

let channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(config.rabbitmqUrl);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Failed to connect to RabbitMQ', error);
    setTimeout(connectRabbitMQ, 5000); // Retry after 5 seconds
  }
};

const sendEvent = async (queue, message) => {
  if (!channel) {
    console.error('Channel is not established');
    return;
  }
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
};

const consumeEvent = async (queue, callback) => {
  if (!channel) {
    console.error('Channel is not established');
    return;
  }
  await channel.assertQueue(queue, { durable: true });
  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const event = JSON.parse(msg.content.toString());
      callback(event);
      channel.ack(msg);
    }
  });
};

module.exports = {
  connectRabbitMQ,
  sendEvent,
  consumeEvent,
};
