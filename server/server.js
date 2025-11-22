const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

const { searchHotels } = require('./services/bookingService');
const { searchGoogleHotels } = require('./services/searchService');
const { scoreResults } = require('./services/scoringService');

app.post('/api/search', async (req, res) => {
  const { location, limit = 10, currency = 'CZK', language = 'CZ' } = req.body;

  try {
    // Fetch MAXIMUM results from both sources (50 each)
    // This ensures we get a large pool to score and rank
    const [bookingResults, googleResults] = await Promise.all([
      searchHotels({ ...req.body, limit: 50 }),
      searchGoogleHotels({ ...req.body, limit: 50 })
    ]);

    // Combine ALL results from both sources
    let allResults = [...bookingResults, ...googleResults];

    console.log(`Fetched ${bookingResults.length} from Booking.com, ${googleResults.length} from Google Hotels`);

    // If no real results (e.g. no API keys), fallback to mock generation for demo
    if (allResults.length === 0) {
      console.log('No API results, falling back to mock data');
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
        const overallScore = (Object.values(scores).reduce((a, b) => a + b, 0) / 10).toFixed(1);

        // Mock currency conversion
        let pricePerNight = Math.floor(Math.random() * 300) + 50;
        if (currency === 'CZK') {
          pricePerNight = pricePerNight * 25;
        }

        // Calculate total price
        const start = new Date(req.body.checkIn || Date.now());
        const end = new Date(req.body.checkOut || Date.now() + 86400000);
        const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
        const totalPrice = pricePerNight * nights;

        return {
          id,
          name: `Mock Hotel ${id} in ${location || 'City'}`,
          description: language === 'CZ' ? 'Skvělé místo k pobytu s úžasným vybavením.' : 'A wonderful place to stay with great amenities.',
          price: pricePerNight,
          totalPrice,
          nights,
          currency,
          imageUrl: `https://placehold.co/600x400?text=Hotel+${id}`,
          source: Math.random() > 0.5 ? 'Booking.com' : 'Airbnb',
          sourceUrl: '#',
          overallScore,
          scores
        };
      };
      allResults = Array.from({ length: parseInt(limit) }, (_, i) => generateMockResult(i + 1));
    }

    // Score ALL results with AI (or mock scoring)
    const scoredResults = await scoreResults(allResults, req.body);

    console.log(`Scored ${scoredResults.length} total results`);

    // Sort by overall score descending to get the BEST results
    scoredResults.sort((a, b) => b.overallScore - a.overallScore);

    // Return only the top N results based on user's limit
    const finalResults = scoredResults.slice(0, parseInt(limit));

    console.log(`Returning top ${finalResults.length} results`);

    res.json({
      results: finalResults,
      params: req.body,
      meta: {
        totalFetched: allResults.length,
        totalScored: scoredResults.length,
        returned: finalResults.length
      }
    });
  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({ error: 'An error occurred during search' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
