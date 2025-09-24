import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

console.log(API_KEY, API_SECRET);
// Generate X-Signature for authentication
function generateSignature(apiKey, secret) {
    console.log("genratig sign");
    const timestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    const toSign = apiKey + secret + timestamp;
    const hash = crypto.createHash('sha256').update(toSign).digest('hex');
    return { signature: hash, timestamp };
}

export default generateSignature;