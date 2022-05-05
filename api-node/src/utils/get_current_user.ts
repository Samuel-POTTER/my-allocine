import { Request } from 'express';
import API_CNF from '../config/config';
import jwt from 'jsonwebtoken';

export interface User {
    user_id: string;
}

export let getCurrentUser = (req: Request): User | null => {
    let jwtToken = req.headers['jwttoken'] as string | undefined;
    if (!jwtToken || jwtToken === '') {
        return null;
    }

    let token = jwtToken.split(' ')[1];
    let user: User = { user_id: '' };
    jwt.verify(
        token,
        API_CNF.API.getInstance().Security.Secret,
        (err, decoded) => {
            if (err || !decoded) return;
            const d = decoded as jwt.JwtPayload;
            user.user_id = d.id as string;
        }
    );
    return user;
};
