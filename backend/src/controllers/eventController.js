const { v4: uuidv4 } = require('uuid');
const { evaluateRules } = require('../core/engine');

const ingestEvent = async (req, res) => {
  try {
    const event = req.body;

    // 1. Basic validation
    if (!event.deviceId || !event.type || event.value === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 2. Run the Rule Engine immediately (Uses the New Memory-based StateManager)
    const alerts = await evaluateRules(event);

    // 3. Generate a unique ID for this event
    const eventId = `${event.deviceId}-${event.timestamp || Date.now()}-${uuidv4().slice(0, 8)}`;

    // 4. (Optional) In a real Redis setup, we would add to queue here:
    // await eventQueue.add('process-event', event, { jobId: eventId });

    // 5. Return the result directly to Postman
    return res.status(201).json({
      status: 'success',
      eventId: eventId,
      processedAt: new Date().toISOString(),
      alerts: alerts, 
      message: alerts.length > 0 ? `⚠️ ${alerts.length} Alert(s) Detected!` : '✅ Event processed'
    });

  } catch (error) {
    console.error('Ingestion Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { ingestEvent };