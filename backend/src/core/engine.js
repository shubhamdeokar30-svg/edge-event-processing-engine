const StateManager = require('./state');

const evaluateRules = async (event) => {
  const { deviceId, type, value } = event;
  const history = await StateManager.updateAndGetHistory(deviceId, type, value);
  const alerts = [];

  // Rule 1: Temperature > 70 for 3 consecutive readings
  if (type === 'temperature' && history.length >= 3) {
    const lastThree = history.slice(-3);
    if (lastThree.every(v => v > 70)) {
      alerts.push({ rule: 'HIGH_TEMP_SUSTAINED', message: `Temp > 70 for 3 readings: ${lastThree}` });
    }
  }

  // Rule 2: Vibration spike (3x the average of previous readings)
  if (type === 'vibration' && history.length > 1) {
    const previousReadings = history.slice(0, -1);
    const avg = previousReadings.reduce((a, b) => a + b, 0) / previousReadings.length;
    if (value >= avg * 3) {
      alerts.push({ rule: 'VIBRATION_SPIKE', message: `Vibration ${value} is 3x avg (${avg.toFixed(2)})` });
    }
  }

  return alerts;
};

module.exports = { evaluateRules };