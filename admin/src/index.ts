import * as cors from 'cors';
const PORT = 4000;

import { Request, Response, Application } from 'express';
import express = require('express');

const app: Application = express();

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080']
}));


app.get('/', function (req: Request, res: Response) {
    res.send('Hello World')
});


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})