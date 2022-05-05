import {
    GetProfileAction,
} from '../action/profile.action';
import { Request, Response } from 'express';
import { getCurrentUser } from '../utils/get_current_user';

export const getUserInfosController = async (req: Request, res: Response) => {
    const user = getCurrentUser(req);

    if (!user) {
        res.status(401).send({ message: 'ko', error: 'Unauthorized', tag: 'VERIFY_CURRENT_USER' });
        return;
    }

    const u = await GetProfileAction(user.user_id);
    if (!u.success) {        
        res.status(u.code).send({ message: 'ko', error: u.error, tag: u.tag });
        return;
    }

    res.status(200).send({ message: 'ok', data: u });
};
