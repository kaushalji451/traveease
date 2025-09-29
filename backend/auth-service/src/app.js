import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from "./utils/passportConfig.js";
import session from 'express-session';
import AuthRouter from './routes/auth.js';
import protectedRoutes from './routes/protected.js';
const app = express();
const PORT = process.env.PORT || 5002;
import ConnectDb from './utils/connectdb.js'

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

app.use("/auth", AuthRouter);
app.use("/", protectedRoutes)

app.get('/', (req, res) => {
    res.send('this is auth service');
})

app.listen(PORT, () => {
    console.log(`listning on port ${PORT}`)
})