import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors  from 'cors'
import PaymentRouter from './router/PaymentRouter.js';
const app = express();
dotenv.config();

const PORT = process.env.PORT;


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));



app.use("/payment",PaymentRouter);

app.listen(PORT,()=>{
    console.log(`servier listing on port ${PORT}`)
})