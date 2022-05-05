import { Request, Response } from 'express';
import API_CNF from '../config/config';
import jwt from 'jsonwebtoken';

export let hasAuth = (req: Request, res: Response, next: any): void => {
    let bearerToken = req.headers.authorization;
    if (!bearerToken || bearerToken === '') {
        res.status(403).send({ message: 'ko', error: 'Forbidden', tag: "VERIFY_OAUTH_TOKEN" });
        return;
    }

    let token = bearerToken.split(' ')[1];
    if (!token || token === '') {
        res.status(403).send({ message: 'ko', error: 'Forbidden', tag: "VERIFY_OAUTH_TOKEN" });
        return;
    }

    jwt.verify(
        token,
        API_CNF.API.getInstance().Security.OAuthSecret,
        (err, decoded) => {
            if (err || !decoded)
                return res
                    .status(403)
                    .send({ message: 'ko', error: 'Forbidden', tag: "VERIFY_OAUTH_TOKEN" });
            else {
                next();
            }
        }
    );
    return;
};
