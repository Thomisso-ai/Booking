const axios = require('axios');

const scoreResults = async (results, userPreferences) => {
    if (!process.env.OPENAI_API_KEY) {
        console.warn('OPENAI_API_KEY not found. Using mock scores.');
        return results.map(result => ({
            ...result,
            overallScore: (Math.random() * 5 + 5).toFixed(1), // Mock 5-10
            scores: {
                price: Math.floor(Math.random() * 10) + 1,
                location: Math.floor(Math.random() * 10) + 1,
                amenities: Math.floor(Math.random() * 10) + 1,
                // ... other scores
            }
        }));
    }

    // TODO: Implement actual OpenAI call
    // We would batch process results or send them individually depending on token limits
    // For now, returning mock scores even if key exists to save tokens during dev
    return results.map(result => ({
        ...result,
        overallScore: (Math.random() * 5 + 5).toFixed(1),
        scores: {
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
        }
    }));
};

module.exports = { scoreResults };
