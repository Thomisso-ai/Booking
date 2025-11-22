const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.post('/api/search', (req, res) => {
  // Placeholder for search logic
  const { location, dates, guests } = req.body;
  res.json({ 
    message: 'Search functionality not implemented yet',
    params: { location, dates, guests }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
