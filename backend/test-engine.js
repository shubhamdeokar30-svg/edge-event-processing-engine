const { evaluateRules } = require('./src/core/engine');
const StateManager = require('./src/core/state');

async function test() {
  const device = 'test-sensor';
  await StateManager.clearState(device, 'temperature');

  console.log("Sending 75, 75, 75...");
  await evaluateRules({ deviceId: device, type: 'temperature', value: 75 });
  await evaluateRules({ deviceId: device, type: 'temperature', value: 75 });
  const result = await evaluateRules({ deviceId: device, type: 'temperature', value: 75 });

  console.log("Alerts triggered:", result);
  process.exit();
}

test();