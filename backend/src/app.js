const express = require('express');
const { ingestEvent } = require('./controllers/eventController');

const app = express();
app.use(express.json());

// Ingestion Endpoint
app.post('/events', ingestEvent);

module.exports = app;