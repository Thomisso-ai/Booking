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
  const { location, limit = 10 } = req.body;

  // Mock data generation
  const generateMockResult = (id) => {
    const scores = {
      price: Math.floor(Math.random() * 10) + 1,
      location: Math.floor(Math.random() * 10) + 1,
      type: Math.floor(Math.random() * 10) + 1,
      rating: Math.floor(Math.random() * 10) + 1,
      reviews: Math.floor(Math.random() * 10) + 1,
      amenities: Math.floor(Math.random() * 10) + 1,
      services: Math.floor(Math.random() * 10) + 1,
      safety: Math.floor(Math.random() * 10) + 1,
      cleanliness: Math.floor(Math.random() * 10) + 1,
      valueForMoney: Math.floor(Math.random() * 10) + 1,
    };

    // Calculate overall score (simple average for now)
    const overallScore = (Object.values(scores).reduce((a, b) => a + b, 0) / 10).toFixed(1);

    return {
      id,
      name: `Hotel ${id} in ${location || 'City'}`,
      description: 'A wonderful place to stay with great amenities.',
      price: Math.floor(Math.random() * 300) + 50,
      currency: 'EUR',
      imageUrl: `https://placehold.co/600x400?text=Hotel+${id}`,
      source: Math.random() > 0.5 ? 'Booking.com' : 'Airbnb',
      sourceUrl: '#',
      overallScore,
      scores
    };
  };

  const results = Array.from({ length: parseInt(limit) }, (_, i) => generateMockResult(i + 1));

  // Sort by overall score descending
  results.sort((a, b) => b.overallScore - a.overallScore);

  res.json({
    results,
    params: req.body
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
