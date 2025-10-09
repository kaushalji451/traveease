import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from "./utils/passportConfig.js";
import session from 'express-session';
import AuthRouter from './routes/auth.js';
import protectedRoutes from './routes/protected.js';
import BookingRouter from './routes/BookingAddRouter.js';
import UserRouter from './routes/UserRouter.js';
const app = express();
const PORT = process.env.PORT || 5002;
import ConnectDb from './utils/connectdb.js';
import morgan from "morgan";
import logger from './utils/logger.js';
import Sentry from "./utils/instrument.js";
dotenv.config();
ConnectDb();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "kaushalji",
    resave: false,
    saveUninitialized: false,
  })
);
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Use morgan and redirect output to winston
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.use("/auth", AuthRouter);
app.use("/", protectedRoutes);
app.use("/user", BookingRouter);
app.use("/getuser", UserRouter);


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
  console.log(`listning on port ${PORT}`)
})