import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const DB_URL= process.env.DB_URL;

const ConnectDb = async()=>{
    try {
        await mongoose.connect(DB_URL);
        console.log("connected to mongodb")
    } catch (error) {
        console.log("some error occ in db connection",error);
    }    
}

export default ConnectDb;