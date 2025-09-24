import dotenv from "dotenv";
import axios from 'axios';
dotenv.config();

// Use environment variables for security
const AMADEUS_KEY = process.env.AMADEUS_KEY;
const AMADEUS_SECRET = process.env.AMADEUS_SECRET;

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

export default getAccessToken;