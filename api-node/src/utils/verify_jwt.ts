import API_CNF from '../config/config';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

export const verifyJWT = (req: Request, token: string): boolean => {
    let isValid: boolean = false;

    jwt.verify(token, API_CNF.API.getInstance().Security.Secret, (err, decoded) => {
        if (err || !decoded) {
            isValid = false;
        } else {
            isValid = true;
        }
    });

    return isValid;
};
