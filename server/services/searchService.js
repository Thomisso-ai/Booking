const axios = require('axios');

const searchGoogleHotels = async (params) => {
    const { location, checkIn, checkOut, adults, currency = 'EUR', language = 'en-gb' } = params;

    if (!process.env.SERPAPI_KEY) {
        console.warn('SERPAPI_KEY not found. Returning empty results.');
        return [];
    }

    try {
        // Calculate nights for price calculation
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

        const response = await axios.get('https://serpapi.com/search.json', {
            params: {
                engine: 'google_hotels',
                q: location,
                check_in_date: checkIn,
                check_out_date: checkOut,
                adults,
                currency: currency,
                gl: language === 'CZ' ? 'cz' : 'us', // Country code
                hl: language === 'CZ' ? 'cs' : 'en', // Language code
                api_key: process.env.SERPAPI_KEY
            }
        });

        return (response.data.properties || []).map(property => {
            const pricePerNight = property.rate_per_night?.lowest || 0;
            const totalPrice = pricePerNight * nights;

            return {
                id: property.gps_coordinates ? `${property.gps_coordinates.latitude}_${property.gps_coordinates.longitude}` : Math.random().toString(36).substr(2, 9),
                name: property.name,
                description: property.description || property.hotel_class || 'No description available',
                price: pricePerNight,
                totalPrice: totalPrice,
                nights: nights,
                currency: currency,
                imageUrl: property.images?.[0]?.original_image || 'https://placehold.co/600x400?text=No+Image',
                source: 'Google Hotels',
                sourceUrl: property.link,
                originalData: property
            };
        });
    } catch (error) {
        console.error('SerpApi Error:', error.response?.data || error.message);
        return [];
    }
};

module.exports = { searchGoogleHotels };
