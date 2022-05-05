import { Request, Response } from 'express';
import { requestValidators } from '../request/requests';

export interface signupParams {
    email: string;
    password: string;
}

export const signupData = async (req: Request, res: Response): Promise<signupParams | false> => {
    const request = {
        email: 'required|string|email',
        password: 'required|string'
    };
    const isValid = await requestValidators(request, req, res);
    if (!isValid) return false;
    return req.body as signupParams;
};
