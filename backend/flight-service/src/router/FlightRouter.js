import express from 'express';
const router = express.Router();
import axios from 'axios';
import getAccessToken from '../utils/FlightApiSetup.js';
import { getCache, setCache } from '../utils/RedisClient.js';

const FlightRouter = router;

// Simple test endpoint
FlightRouter.get('/', (req, res) => {
    res.send('Amadeus Flight API Demo is running.');
});

// Flight search endpoint with Redis caching
FlightRouter.get('/search', async (req, res) => {
    console.log("Request received at /search with query:", req.query);

    const { from, to, date, adults, class: travelClass, returnDate } = req.query;

    // Create a unique cache key for this query
    const cacheKey = `flight:${from}:${to}:${date}:${returnDate || ''}:${adults}:${travelClass}`;

    try {
        // Check if cached data exists
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            console.log('Cache hit! Returning cached flight data.');
            return res.json(cachedData);
        }

        // If no cache, call Amadeus API
        const token = await getAccessToken();
        const params = {
            originLocationCode: from,
            destinationLocationCode: to,
            departureDate: date,
            adults: adults,
            max: 5,
            travelClass: travelClass.toUpperCase()
        };
        if (returnDate) {
            params.returnDate = returnDate;
        }

        const response = await axios.get(
            'https://test.api.amadeus.com/v2/shopping/flight-offers',
            {
                headers: { Authorization: `Bearer ${token}` },
                params
            }
        );

        const flightData = response.data;

        // Save API response to Redis cache for 1 hour
        await setCache(cacheKey, flightData, 3600);

        console.log("Flight search response fetched from API");
        res.json(flightData);

    } catch (err) {
        console.error('Flight search error:', err.response?.data || err.message);
        res.status(500).json({
            error: 'Flight search failed',
            detail: err.response?.data || err.message
        });
    }
});

export default FlightRouter;
