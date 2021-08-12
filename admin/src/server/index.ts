import * as cors from 'cors';
const PORT = 4000;

import { Request, Response, Application } from 'express';
import express = require('express');
// import  db from './db';
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient();

const app: Application = express();

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080']
}));

async function main() {
    const newUser = await db.user.create({
        data: {
            firstName: 'Alice',
            lastName: 'Wonder',
            email: 'alice@prisma.io',
        },
    })
    return await db.user.findMany()
}

// app.get('/', function (req: Request, res: Response) {
//     res.send('Hello World')
// });


app.get('/', async function (req: Request, res: Response) {
    const users = await main();
    console.log(JSON.stringify(users));
    res.send(JSON.stringify(users))
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})