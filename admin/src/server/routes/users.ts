import { Request, Response, Router} from 'express';
const router: Router = Router();

import dbConnection from '../db';
import * as User from '../../models//user/index';

import PubSub from '../pubsub/';


const q = 'users'; //
const publisher = new PubSub('Users', 'users', q);
const consumer = new PubSub('Users', 'users', q);
// await consumer.init();
const txt = 'something to do'
// Publisher


router.get('/', async function (req: Request, res: Response) {
    const db = dbConnection;
    const users = await db.user.findMany();
    await publisher.init();
    publisher.publish(txt);
    res.send(JSON.stringify(users))
});

router.get('/:id', async (req: Request, res: Response) => {
    const user = await User.findById(<string | number> req.params.id)
    return res.send(user)
})

router.post('', async (req: Request, res: Response) => {
    const new_user = await User.create(req.body);
    return res.send(JSON.stringify(new_user))
});

router.put('/:id', async (req: Request, res: Response) => {
    const updated_user = await User.updateById(<string | number> req.params.id, req.body);
    return res.send(JSON.stringify(updated_user))
});

router.delete('/:id', async (req: Request, res: Response) => {
    const result = await User.deleteById(<string | number> req.params.id);
    return res.send(result)
})

export default router;