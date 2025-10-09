// instrument.js
import * as Sentry from "@sentry/node";
import dotenv from 'dotenv';
dotenv.config();
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    sendDefaultPii: true, // optional, sends user info like IP automatically
});

export default Sentry;
