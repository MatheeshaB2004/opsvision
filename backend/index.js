const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

// The basic status check you built on Day 2
app.get('/api/status', (req, res) => {
  res.json({ message: 'OpsVision Backend is running and healthy!' });
});

// Our new route! This asks Prometheus how many containers are running.
app.get('/api/metrics/containers', async (req, res) => {
  try {
    // We use PromQL (Prometheus Query Language) to count the containers
    const response = await axios.get('http://prometheus:9090/api/v1/query', {
      params: {
        query: 'count(container_last_seen)'
      }
    });
    
    // Dig into the messy Prometheus response to find just the number
    const containerCount = response.data.data.result[0].value[1];
    
    res.json({ count: containerCount });
  } catch (error) {
    console.error("Error fetching from Prometheus:", error.message);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

app.listen(5000, () => {
  console.log('Backend server is running on http://localhost:5000');
});