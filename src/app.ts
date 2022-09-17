import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
//Execute
dotenv.config();
import { CORS_URL, URI } from './config';
import './db';
import routesV1 from './routes/v1';

//Catch errors
process.on('uncaughtException', (e) => {
    console.log(e);
});

const app = express();

app.use(express.urlencoded({ limit: '10mb', extended: false}));
app.use(express.json({ limit: '10mb' }));
app.use(cors({
    origin: CORS_URL,
    optionsSuccessStatus: 200,
}))

app.use('/v1', routesV1);

export default app;