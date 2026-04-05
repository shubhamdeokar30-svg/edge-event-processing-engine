const Redis = require('ioredis');
const dotenv = require('dotenv');

dotenv.config();

const redisConfig = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null, // Required for BullMQ
};

const connection = new Redis(redisConfig);

module.exports = { connection, redisConfig };