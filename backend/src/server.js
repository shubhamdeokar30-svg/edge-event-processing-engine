const express = require('express');
const cors = require('cors'); // Install this if you haven't: npm install cors

// ... rest of your routes
const { ingestEvent } = require('./controllers/eventController');
const app = express();

app.use(express.json());
app.use(cors()); // This allows the Angular app to hit port 3000
app.use(express.json());
// Routes
app.post('/events', ingestEvent);

// Health Check
// Health check endpoint
app.get('/health', (req, res) => res.send({ status: 'OK' }));
// app.get('/health', (req, res) => {
//   res.json({ 
//     status: 'Engine is Running',
//     mode: 'LOCAL_MEMORY_MODE',
//     redis_required: false
//   });
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Edge Engine started on http://localhost:${PORT}`);
  console.log(`📡 Mode: LOCAL_MEMORY (Zero Setup Required)`);
  console.log(`💡 URL for Postman: http://localhost:${PORT}/events\n`);
});