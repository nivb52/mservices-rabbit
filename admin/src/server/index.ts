require('dotenv').config();

import * as cors from 'cors';
import {Application } from 'express';
import users from './routes/users';

const PORT = 4000;
import express = require('express');


const app: Application = express();

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080']
}));

app.use('/users', users)


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})