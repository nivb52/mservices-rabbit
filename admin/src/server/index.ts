import * as cors from 'cors';
const PORT = 4000;

import { Request, Response, Application } from 'express';
import express = require('express');
import dbConnection from './db';


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

app.get('/users/:id', async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id)
    return res.send(user)
})

app.post('/users', async (req: Request, res: Response) => {
    const new_user = await User.create(req.body);
    return res.send(JSON.stringify(new_user))
});

app.put('/users/:id', async (req: Request, res: Response) => {
    const updated_user = await User.updateById(req.params.id, req.body);
    return res.send(JSON.stringify(updated_user))
});

app.delete('/users/:id', async (req: Request, res: Response) => {
    const result = await User.deleteById(req.params.id);
    return res.send(result)
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})