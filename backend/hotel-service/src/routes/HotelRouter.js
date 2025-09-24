import express from 'express'
import axios from 'axios';
import dotenv from 'dotenv';
const HotelRouter = express.Router();
import generateSignature from '../utils/GenerateSignature.js'
dotenv.config();

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

// Root route
HotelRouter.get("/", (req, res) => {
    res.send("HotelBeds Sandbox API Test");
});

// Search hotels endpoint
HotelRouter.get('/search', async (req, res) => {
    const destinationCode = req.query.destinationCode || 'DEL';
    const checkIn = req.query.checkIn || '2025-10-01';
    const checkOut = req.query.checkOut || '2025-10-05';
    let occupancy = req.query.occupancy || '[{"rooms":1,"adults":2,"children":0}]';
    occupancy = JSON.parse(occupancy);

    const { signature } = generateSignature(API_KEY, API_SECRET);

    const requestBody = {
        stay: {
            checkIn,
            checkOut
        },
        occupancies: occupancy,
        destination: {
            code: destinationCode
        },
        language: 'ENG',
        limit: 5 // Number of hotels to return
    };

    try {
        const response = await axios.post(
            'https://api.test.hotelbeds.com/hotel-api/1.0/hotels',
            requestBody,
            {
                headers: {
                    'Api-key': API_KEY,
                    'X-Signature': signature,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );
        console.log('Hotels Response:', JSON.stringify(response.data, null, 2));
        res.status(200).json(response.data);
    } catch (error) {
        if (error.response) {
            console.error('API Error Status:', error.response.status);
            console.error('API Error Data:', error.response.data);
            res.status(501).json(error.response);
        } else {
            res.status(501).json(error.response);
            console.error('Error:', error.message);
        }
    }
});



export default HotelRouter;