import { Request, Response } from 'express';
import API_CNF from '../config/config';
import jwt from 'jsonwebtoken';

export const authorization = (req: Request, res: Response) => {
    const token: string = jwt.sign({}, API_CNF.API.getInstance().Security.OAuthSecret, { expiresIn: '2h' });

    res.status(200).send({
        message: 'ok',
        data: {
            auth_token: token,
            token_type: 'Bearer',
            expire_in: '7200'
        }
    });
};
