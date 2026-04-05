const { Worker } = require('bullmq');
const { redisConfig } = require('../config/redis');

const actionWorker = new Worker('action-triggers', async (job) => {
  const { alert, deviceId } = job.data;

  // This should show up in your VS Code terminal
  console.log(`\n🔔 [ActionWorker] Sending alert for ${deviceId}: ${alert.message}`);

  // This simulates an external API call (like sending an email or SMS)
  console.log(`✅ Webhook sent successfully for ${deviceId}`);
  
  return { delivered: true }; 
}, { 
    connection: redisConfig,
    skipCheck: true 
});

console.log('👷 Action Worker is active and waiting for alerts...');

module.exports = actionWorker;