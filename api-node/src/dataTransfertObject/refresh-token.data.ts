import { Request, Response } from 'express';
import { requestValidators } from '../request/requests';

export interface refreshTokenParams {
    refresh_token: string;
}

export const refreshTokenData = async (req: Request, res: Response): Promise<refreshTokenParams | false> => {
    const request = {
        refresh_token: 'required|string'
    };
    const isValid = await requestValidators(request, req, res);
    if (!isValid) return false;
    return req.body as refreshTokenParams;
};
