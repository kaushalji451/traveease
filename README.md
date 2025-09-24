<!-- require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Use environment variables for security
const AMADEUS_KEY = "A3W6GmdLvsGGwmpLeQSWU9pDKfvUWZgM";
const AMADEUS_SECRET = "UWYxZGzCZ0PkXMSM";

if (!AMADEUS_KEY || !AMADEUS_SECRET) {
  console.error('Error: Amadeus API keys are not set in environment variables.');
  process.exit(1);
}

// Function to get OAuth token from Amadeus
async function getAccessToken() {
  console.log("this is access token");
  try {
    const response = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: AMADEUS_KEY,
        client_secret: AMADEUS_SECRET
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    console.log(response);
    return response.data.access_token;
  } catch (err) {
    console.error('Error fetching access token:', err.response?.data || err.message);
    throw err;
  }
}

// Flight search endpoint
app.get('/search', async (req, res) => {
  console.log("Request received at /search with query:", req.query);
  const { from = 'DEL', to = 'BOM', date = '2025-12-01', adults = 1 } = req.query;

  try {
    const token = await getAccessToken();
    const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        originLocationCode: from,
        destinationLocationCode: to,
        departureDate: date,
        adults: adults,
        max: 5
      }
    });
    console.log("Flight search response:", response.data);
    res.json(response.data);
  } catch (err) {
    console.error('Flight search error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Flight search failed', detail: err.response?.data || err.message });
  }
});

// Simple test endpoint
app.get('/', (req, res) => {
  res.send('Amadeus Flight API Demo is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); -->
