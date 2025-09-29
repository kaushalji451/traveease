import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from 'dotenv';
dotenv.config();
import User from "../modles/User.js"; // Your user model
import bcrypt from "bcryptjs";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                let user = await User.findOne({ email });

                if (!user) {
                    // Generate a random password
                    const randomPassword = Math.random().toString(36).slice(-8);
                    const hashedPassword = await bcrypt.hash(randomPassword, 10);

                    user = await User.create({
                        email,
                        password: hashedPassword,
                    });
                }

                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;