const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const testApi = async () => {
    const location = 'Austria';
    console.log(`Testing searchDestination for: ${location}`);
    console.log(`Host: ${process.env.RAPIDAPI_HOST}`);
    console.log(`Key: ${process.env.RAPIDAPI_KEY ? 'Present' : 'Missing'}`);

    try {
        const options = {
            method: 'GET',
            url: `https://${process.env.RAPIDAPI_HOST}/api/v1/hotels/searchDestination`,
            params: { query: location },
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
            }
        };

        console.log('Requesting:', options.url, options.params);
        const response = await axios.request(options);
        console.log('Response Status:', response.status);
        console.log('Response Data Keys:', Object.keys(response.data));
        // console.log('Response Data:', JSON.stringify(response.data, null, 2));

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

testApi();
