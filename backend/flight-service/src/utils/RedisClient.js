import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

let client;

export const connectRedis = async () => {
  if (!client) {
    client = createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT)
      },
      password: process.env.REDIS_PASSWORD
    });

    client.on('error', (err) => console.error('Redis Client Error', err));
    await client.connect();
    console.log('Connected to Redis!');
  }
  return client;
};

// Helper to get cached value
export const getCache = async (key) => {
  const client = await connectRedis();
  const cached = await client.get(key);
  return cached ? JSON.parse(cached) : null;
};

// Helper to set cache with TTL (in seconds)
export const setCache = async (key, value, ttl = 3600) => {
  const client = await connectRedis();
  await client.set(key, JSON.stringify(value), { EX: ttl });
};
