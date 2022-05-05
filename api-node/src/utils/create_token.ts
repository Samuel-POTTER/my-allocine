import jwt from 'jsonwebtoken';

export const createToken = (secret: string, duration: number, payload: string | object | Buffer): string => {
    const token: string = jwt.sign(payload, secret, {
        expiresIn: duration
    });

    return token;
};
