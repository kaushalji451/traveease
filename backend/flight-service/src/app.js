import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import ConnectDb from "./utils/connectDb.js";
dotenv.config();

import FlightRouter from "./router/FlightRouter.js";
ConnectDb();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use("/",FlightRouter);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 
