import express from 'express';
import { serverInit } from './services/serverInit.js';

import router from './routes/routes.js'
import { errorHandler } from './middlewares/errorHandlers.js';

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router)

app.use(errorHandler);


serverInit(app, PORT)