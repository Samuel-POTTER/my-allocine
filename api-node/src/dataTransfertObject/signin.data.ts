import { Request, Response } from 'express';
import { requestValidators } from '../request/requests';

export interface signinParams {
    email: string;
    password: string;
}

export const signinData = async (req: Request, res: Response): Promise<signinParams | false> => {
    var request = {
        email: 'required|string|email',
        password: 'required|string'
    };
    const isValid = await requestValidators(request, req, res);
    if (!isValid) return false;
    return req.body as signinParams;
};
