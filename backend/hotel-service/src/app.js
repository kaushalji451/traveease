import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
const app = express();
const PORT = process.env.PORT || 5001;
dotenv.config();

import HotelRouter from './routes/HotelRouter.js';

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/", HotelRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

