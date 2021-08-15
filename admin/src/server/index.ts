import * as cors from 'cors';
const PORT = 4000;

import { Request, Response, Application } from 'express';
import express = require('express');
import dbConnection from './db';
// import { PrismaClient } from '@prisma/client'
// const db = new PrismaClient();

import * as User from '../models//user/index'

const app: Application = express();

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080']
}));

app.get('/users', async function (req: Request, res: Response) {
    const db = await dbConnection;
    const users = await db.user.findMany()
    res.send(JSON.stringify(users))
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})