// This replaces the Redis database with local RAM
const deviceStore = {};

/**
 * Manages device history in local memory.
 * No Redis installation required.
 */
const updateAndGetHistory = async (deviceId, type, value) => {
  const key = `${deviceId}:${type}`;

  // 1. Initialize if this is the first time seeing this device/sensor type
  if (!deviceStore[key]) {
    deviceStore[key] = [];
  }

  // 2. Add the new value as a number
  deviceStore[key].push(parseFloat(value));

  // 3. Maintain a sliding window of the last 10 readings
  if (deviceStore[key].length > 10) {
    deviceStore[key].shift();
  }

  // 4. Return the history for rule evaluation
  return [...deviceStore[key]];
};

module.exports = { updateAndGetHistory };