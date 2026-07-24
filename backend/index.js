const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/status', (req, res) => {
  res.json({ message: 'OpsVision Backend is running and healthy!' });
});

app.listen(5000, () => {
  console.log('Backend server is running on http://localhost:5000');
});