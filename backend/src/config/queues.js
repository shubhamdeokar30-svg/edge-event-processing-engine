const { Queue } = require('bullmq');
const { redisConfig } = require('./redis');

const eventQueue = new Queue('event-ingestion', { connection: redisConfig });

// NEW: Queue for external triggers (Webhooks/Alerts)
const actionQueue = new Queue('action-triggers', {
  connection: redisConfig,
  defaultJobOptions: {
    attempts: 5, // Retry 5 times
    backoff: { type: 'exponential', delay: 2000 }, // Wait longer each time
  }
});

module.exports = { eventQueue, actionQueue };