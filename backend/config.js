require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI,
  rabbitmqUrl: process.env.RABBITMQ_URL,
};