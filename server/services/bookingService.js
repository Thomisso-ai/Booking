const axios = require('axios');

const searchHotels = async (params) => {
    const { location, checkIn, checkOut, adults, childrenAges = [], currency = 'EUR', language = 'en-gb' } = params;

    if (!process.env.RAPIDAPI_KEY) {
        console.warn('RAPIDAPI_KEY not found. Returning empty results.');
        return [];
    }

    try {
        // Calculate nights for price calculation
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

        // 1. Search for location to get locationId
        const locationSearchOptions = {
            method: 'GET',
            url: `https://${process.env.RAPIDAPI_HOST}/stays/auto-complete`,
            params: { query: location },
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
            }
        };

        const locationResponse = await axios.request(locationSearchOptions);

        if (!locationResponse.data || !locationResponse.data.data || locationResponse.data.data.length === 0) {
            console.log(`No location found for: ${location}`);
            return [];
        }

        // Take the first location match
        const locationData = locationResponse.data.data[0];
        const locationId = locationData.id; // This is the base64 encoded location ID

        console.log(`Found location: ${locationData.name}, ID: ${locationId}`);

        // 2. Search for hotels at this location
        const searchOptions = {
            method: 'GET',
            url: `https://${process.env.RAPIDAPI_HOST}/stays/search`,
            params: {
                locationId: locationId,
                checkinDate: checkIn,
                checkoutDate: checkOut,
                adults: adults || 2,
                children: childrenAges.length,
                units: 'metric',
                temperature: 'c',
                languagecode: language === 'CZ' ? 'cs' : 'en',
                currency_code: currency
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
            }
        };

        const response = await axios.request(searchOptions);

        if (!response.data || !response.data.data) {
            console.log('No hotels found');
            return [];
        }

        // Map the response to our internal format
        return response.data.data.map(hotel => {
            const totalAmount = hotel.priceBreakdown?.grossPrice?.value || 0;

            return {
                id: hotel.id,
                name: hotel.name || 'Unknown Hotel',
                description: hotel.wishlistName || hotel.reviewScoreWord || 'No description available',
                price: Math.round(totalAmount / nights), // Price per night
                totalPrice: totalAmount,
                nights: nights,
                currency: hotel.currency || currency,
                imageUrl: hotel.photoUrls && hotel.photoUrls[0]
                    ? hotel.photoUrls[0].replace('square60', 'square500')
                    : 'https://placehold.co/600x400?text=No+Image',
                source: 'Booking.com',
                sourceUrl: `https://www.booking.com/hotel/${hotel.id}.html`,
                rating: hotel.reviewScore,
                reviewCount: hotel.reviewCount,
                originalData: hotel
            };
        });

    } catch (error) {
        console.error('Booking.com API Error:', error.response?.data || error.message);
        return [];
    }
};

module.exports = { searchHotels };
