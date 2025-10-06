import express from 'express';
const router = express.Router();
import axios from 'axios';
import getAccessToken from '../utils/FlightApiSetup.js';
import { getCache, setCache } from '../utils/RedisClient.js';
import dotenv from 'dotenv';
dotenv.config();

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
      travelClass: travelClass.toUpperCase(),
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

    console.log("Flight search response fetched from API", flightData);
    res.json(flightData);

  } catch (err) {
    console.error('Flight search error:', err.response?.data || err.message);
    res.status(500).json({
      error: 'Flight search failed',
      detail: err.response?.data || err.message
    });
  }
});

// price api to get for the checkout page

// ========================
// 1) PRICING ENDPOINT
// ========================
FlightRouter.post("/price-offer", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { flightOffer } = req.body; // input: single flightOffer object from Search API
    console.log(flightOffer);
    if (!flightOffer) {
      return res.status(500).json({ error: "Flight offer is required" });
    }

    const response = await fetch("https://test.api.amadeus.com/v1/shopping/flight-offers/pricing", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          type: "flight-offers-pricing",
          flightOffers: [flightOffer],
        },
      }),
    });

    const pricingData = await response.json();
    console.log(pricingData);
    res.json({
      validatedFlightOffer: pricingData.data?.flightOffers?.[0],
      fullResponse: pricingData,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get pricing" });
  }
});

// PNR genrator
FlightRouter.post("/create-pnr", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { flightOffer, travelers, contact, paymentDetails,userId } = req.body;
    console.log(userId);

    if (!flightOffer) return res.status(400).json({ error: "Flight offer is required" });
    if (!travelers || travelers.length === 0) return res.status(400).json({ error: "Travelers required" });
    if (!contact || !contact.email || !contact.phone) return res.status(400).json({ error: "Contact info required" });
    if (!paymentDetails) return res.status(400).json({ error: "Payment info required" });
    if (!userId) return res.status(400).json({ error: "User Id info required" });
    
    // Prepare travelers array for Amadeus API
    const amadeusTravelers = travelers.map((t, index) => {
      const traveler = {
        id: String(index + 1),
        dateOfBirth: t.dateOfBirth,
        name: { firstName: t.firstName, lastName: t.lastName },
        gender: t.gender,
        contact: {
          emailAddress: t.email,
          phones: [
            { deviceType: "MOBILE", countryCallingCode: contact.phoneCode.replace("+", ""), number: t.contactNumber }
          ]
        },
      };
      // Only add passport/documents if available
      if (t.passportInfo) {
        traveler.documents = [
          {
            documentType: "PASSPORT",
            number: t.passportInfo.number,
            expiryDate: t.passportInfo.expiryDate,
            issuanceCountry: t.passportInfo.issuanceCountry,
            nationality: t.passportInfo.nationality,
            holder: true
          }
        ];
      }
      return traveler;
    });

    // Call Amadeus Flight Orders API
    const response = await fetch("https://test.api.amadeus.com/v1/booking/flight-orders", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          type: "flight-order",
          flightOffers: [flightOffer],
          travelers: amadeusTravelers
        }
      })
    });

    const pnrData = await response.json();
    console.log("this is pnr fincal data ", pnrData);

    if (response.status >= 400) {
      return res.status(response.status).json({ error: pnrData });
    }
    const pnrId = pnrData.data?.id;
    console.log(pnrId);
    // Save booking into MongoDB
    // ---- Call User Service to save PNR ----  
    await fetch(`${process.env.AUTH_URL}/user/add-flight-booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        pnr: pnrId,
      })
    });

    // Return response
    res.json({
      pnr: pnrId,
      travelers: amadeusTravelers,
      flightOffer,
      fullResponse: pnrData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create PNR" });
  }
});


FlightRouter.get("/pnr/:pnr", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { pnr } = req.params;

    if (!pnr) return res.status(400).json({ error: "PNR is required" });

    const response = await fetch(`https://test.api.amadeus.com/v1/booking/flight-orders/${pnr}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.status >= 400) {
      return res.status(response.status).json({ error: data });
    }

    // Return the full flight details
    res.json({ flightDetails: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch flight details" });
  }
});


export default FlightRouter;
