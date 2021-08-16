import { Request, Response, Router} from 'express';
const router: Router = Router();

import dbConnection from '../db';
import * as User from '../../models//user/index';


router.get('/', async function (req: Request, res: Response) {
    const db = await dbConnection;
    const users = await db.user.findMany()
    res.send(JSON.stringify(users))
});

router.get('/:id', async (req: Request, res: Response) => {
    const user = await User.findById(<String | Number> req.params.id)
    return res.send(user)
})

router.post('', async (req: Request, res: Response) => {
    const new_user = await User.create(req.body);
    return res.send(JSON.stringify(new_user))
});

router.put('/:id', async (req: Request, res: Response) => {
    const updated_user = await User.updateById(<String | Number> req.params.id, req.body);
    return res.send(JSON.stringify(updated_user))
});

router.delete('/:id', async (req: Request, res: Response) => {
    const result = await User.deleteById(<String | Number> req.params.id);
    return res.send(result)
})

export default ;