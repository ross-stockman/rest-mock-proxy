import express, { Application } from 'express';

import testRouter from "./routes/test-router.js";

const jsonParser = express.json();
const base64Parser = express.raw({ type: '*/*' });

export const registerCustomRoutes: (app: Application) => void = (app: Application): void => {
    app.use('/test', jsonParser, testRouter);
}