import { Request, Response } from 'express';
import API_CNF from '../config/config';
import jwt from 'jsonwebtoken';

export let hasJWT = (req: Request, res: Response, next: any): void => {
    let jwtToken = req.headers['jwttoken'] as string | undefined;
    if (!jwtToken || jwtToken === '') {
        res.status(401).send({ message: 'ko', error: 'Unauthorized', tag: "VERIFY_USER_JWT"});
        return;
    }

    let token = jwtToken.split(' ')[1];
    if (!token || token === '') {
        res.status(401).send({ message: 'ko', error: 'Unauthorized', tag: "VERIFY_USER_JWT"});
        return;
    }

    jwt.verify(
        token,
        API_CNF.API.getInstance().Security.Secret,
        (err, decoded) => {
            if (err || !decoded)
                return res
                    .status(401)
                    .send({ message: 'ko', error: 'Unauthorized', tag: "VERIFY_USER_JWT"});
            else {
                next();
            }
        }
    );
    return;
};
