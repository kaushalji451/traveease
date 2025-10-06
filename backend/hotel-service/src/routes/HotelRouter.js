import express from 'express'
import axios from 'axios';
import dotenv from 'dotenv';
const HotelRouter = express.Router();
import generateSignature from '../utils/GenerateSignature.js'
import { getCache, setCache } from '../utils/RedisClient.js';

dotenv.config();

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

// Root route
HotelRouter.get("/", (req, res) => {
    res.send("HotelBeds Sandbox API Test");
});

// Search hotels endpoint
HotelRouter.get('/search', async (req, res) => {
    const destinationCode = req.query.destinationCode; // 'DEL'
    const checkIn = req.query.checkIn;                // '2025-10-01'
    const checkOut = req.query.checkOut;             // '2025-10-05'
    let occupancy = req.query.occupancy;            // '[{"rooms":1,"adults":2,"children":0}]'
    occupancy = JSON.parse(occupancy);

    console.log(req.query);

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
    // Create a unique cache key for this query
    const cacheKey = `hotel:${destinationCode}:${checkIn}:${checkOut}:${JSON.stringify(occupancy)}`;

    try {
        // Check if cached data exists
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            console.log('Cache hit! Returning cached flight data.');
            return res.json(cachedData);
        }
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
        // Save API response to Redis cache for 1 hour
        await setCache(cacheKey, response.data, 3600);
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

// 3️⃣ Create Booking
HotelRouter.post('/create-booking', async (req, res) => {
    try {
        const { signature } = generateSignature(API_KEY, API_SECRET);
        const {
            rateKey,
            guestDetails,
            contact,
            // userId
        } = req.body;
        console.log(guestDetails, contact, guestDetails[0].firstname, guestDetails[0].lastname);
        const bookingData = {
            holder: {
                name: guestDetails[0].firstName || "Guest",
                surname: guestDetails[0].lastName || "User",
                email: contact?.email,
                phoneNumber: contact?.phone
            },
            rooms: [
                {
                    rateKey,
                    paxes: guestDetails.map((g, idx) => ({
                        type: "AD",
                        name: g.firstName,
                        surname: g.lastName,
                        roomId: idx + 1,
                    })),
                },
            ],
            clientReference: `hotel_${Date.now()}`,
        };
        console.log("this is booking data", bookingData);
        const response = await axios.post(
            "https://api.test.hotelbeds.com/hotel-api/1.0/bookings",
            bookingData,
            {
                headers: {
                    "Api-key": API_KEY,
                    "X-Signature": signature,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        res.status(200).json({
            message: "Booking created successfully",
            bookingReference: response.data.booking?.reference,
            data: response.data,
        });
    } catch (error) {
        console.error("Booking error:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
});

// -------------------
// 4️⃣ Get Booking by ID
HotelRouter.get('/booking/:bookingId', async (req, res) => {
    const { signature } = generateSignature(API_KEY, API_SECRET);
    try {
        const { bookingId } = req.params;

        if (!bookingId) return res.status(400).json({ error: "bookingId is required" });

        const response = await axios.get(
            `https://api.test.hotelbeds.com/hotel-api/1.0/bookings/${bookingId}`,
            {
                headers: {
                    'Api-key': API_KEY,
                    'X-Signature': signature,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );

        res.status(200).json({
            message: "Booking fetched successfully",
            data: response.data
        });

    } catch (error) {
        console.error('Booking fetch error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
});


export default HotelRouter;






