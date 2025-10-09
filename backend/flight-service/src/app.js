import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import ConnectDb from "./utils/connectDb.js";
dotenv.config();

import FlightRouter from "./router/FlightRouter.js";
import morgan from "morgan";
import logger from './utils/logger.js';
import Sentry from "./utils/instrument.js";
ConnectDb();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Use morgan and redirect output to winston
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.use("/", FlightRouter);


// Test route to verify Sentry integration
app.get("/debug-sentry", (req, res) => {
    throw new Error("My first Sentry error!");
});

// Register Sentry error handler AFTER all controllers
Sentry.setupExpressErrorHandler(app);

// Optional fallthrough error handler
app.use((err, req, res, next) => {
    res.statusCode = 500;
    res.end(res.sentry + "\n"); // `res.sentry` contains the Sentry error ID
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 
