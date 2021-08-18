import { Request, Response, Router} from 'express';
const router: Router = Router();

import dbConnection from '../db';
import * as User from '../../models//user/index';

import PubSub, {createBlobMessage, createTextMessage} from '../pubsub/';
import { Blob } from 'buffer';


const q_name = 'users'; //
const publisher = new PubSub('Users', 'users', q_name);
// const consumer = new PubSub('Users', 'users', q_name);
// await consumer.init();

router.get('/', async function (req: Request, res: Response) {
    const db = dbConnection;
    const users = await db.user.findMany();
    res.send(JSON.stringify(users))
});

router.get('/:id', async (req: Request, res: Response) => {
    const user = await User.findById(<string | number>req.params.id);
    return res.send(user)
})

router.post('', async (req: Request, res: Response) => {
    const new_user = await User.create(req.body);
    await publisher.init();
    const msg:string = createTextMessage('create', new_user, { id: null })
    publisher.publish(msg);
    return res.send(JSON.stringify(new_user))
});

router.put('/:id', async (req: Request, res: Response) => {
    const updated_user = await User.updateById(<string | number> req.params.id, req.body);
    await publisher.init();
    const msg: Blob = createBlobMessage('update', updated_user, { id: req.params.id }, {buffer:true})
    publisher.publish(await msg.text());
    return res.send(JSON.stringify(updated_user))
});

router.delete('/:id', async (req: Request, res: Response) => {
    const deleted_user = await User.deleteById(<string | number>req.params.id);
    await publisher.init();
    const msg: Blob = createBlobMessage('delete', {}, { id: req.params.id, old_data: deleted_user })
    publisher.publish(await msg.text());
    return res.send(deleted_user)
})

export default router;