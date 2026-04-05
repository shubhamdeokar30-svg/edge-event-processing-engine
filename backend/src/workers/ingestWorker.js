const { Worker } = require('bullmq');
const { redisConfig } = require('../config/redis');
const { evaluateRules } = require('../core/engine');
const { actionQueue } = require('../config/queues');

const ingestWorker = new Worker('event-ingestion', async (job) => {
  console.log(`\n📥 NEW JOB RECEIVED: ${job.id}`);
  const event = job.data;
  const alerts = await evaluateRules(event);

  if (alerts.length > 0) {
    console.log(`⚠️  ALERTS FOUND: ${alerts.length}`); // <--- CHECK THIS LINE
    for (const alert of alerts) {
      console.log(`📢 Triggering: ${alert.rule}`);
      await actionQueue.add(`trigger-${alert.rule}`, {
        alert,
        deviceId: event.deviceId,
        timestamp: event.timestamp
      });
    }
  } else {
    console.log(`✅ No alerts for this event yet.`); // <--- AND THIS LINE
  }
  // ... rest of your logic ...
}, { 
    connection: redisConfig,
    skipCheck: true, // Bypass version check
    stalledInterval: 30000, // Give Redis 5.0 more time
    maxStalledCount: 1 
});

console.log('👷 Ingest Worker is active...');