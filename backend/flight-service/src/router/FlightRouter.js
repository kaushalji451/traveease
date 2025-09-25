import express from 'express';
const router = express.Router();
import axios from 'axios';
import getAccessToken from '../utils/FlightApiSetup.js';

const FlightRouter = router;

// Simple test endpoint
FlightRouter.get('/', (req, res) => {
    res.send('Amadeus Flight API Demo is running.');
});

// Flight search endpoint with Redis caching
FlightRouter.get('/search', async (req, res) => {
    console.log("Request received at /search with query:", req.query);

    const {
        from, //'DEL'
        to, //'BOM'
        date, //'2025-12-01'
        adults, //1
        class: travelClass, //'ECONOMY'
        returnDate, //'2025-12-05'
    } = req.query;


    try {

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
                params: params
            }
        );

        const flightData = response.data;
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
