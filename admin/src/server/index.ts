require('dotenv').config();
globalThis.connections  = <[]> [];

import * as process from 'process';

import * as cors from 'cors';
import {Application } from 'express';
import users from './routes/users';

const PORT: number = 4000;
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



process.on('beforeExit', () => {
    globalThis.connections.forEach(connection => connection.close());
});

process.on('exit', (code) => {
    console.log('Process exit event with code: ', code);
});
