import {
    DeleteRefreshTokenByTokenAction,
    DeleteRefreshTokenByUserIDAction,
    GetRefreshTokenByTokenAction,
    SigninAction,
    SignupAction,
    StoreRefreshTokenAction,
    VerifyIfUserExistAction
} from '../action/auth.action';
import API_CNF from '../config/config';
import { refreshTokenData } from '../dataTransfertObject/refresh-token.data';
import { signinData } from '../dataTransfertObject/signin.data';
import { signupData } from '../dataTransfertObject/signup.data';
import { Request, Response } from 'express';
import { refreshParams } from '../types/auth.types';
import { createToken } from '../utils/create_token';
import { verifyJWT } from '../utils/verify_jwt';

export const refreshTokenController = async (req: Request, res: Response) => {
    const data = await refreshTokenData(req, res);

    if (!data) return;

    if (!verifyJWT(req, data.refresh_token)) {
        res.status(400).send({
            message: 'ko',
            data: { error: 'invalid refresh token.', tag: 'VALIDATE_REFRESH_TOKEN' }
        });
        return;
    }

    const infos = await GetRefreshTokenByTokenAction(data.refresh_token);
    if (!infos.success) {
        res.status(infos.code).send({ message: 'ko', error: infos.error, tag: infos.tag });
        return;
    }

    const durationRefreshToken: number = API_CNF.API.getInstance().Security.RefreshTokenDuration;
    const durationAccessToken: number = API_CNF.API.getInstance().Security.AccessTokenDuration;
    const secret: string = API_CNF.API.getInstance().Security.Secret;

    let access_token: string = createToken(secret, durationAccessToken, { id: infos.user_id });
    let refresh_token: string = createToken(secret, durationRefreshToken, {});

    let exp: string | number | Date = new Date();
    exp.setHours(24 * API_CNF.API.getInstance().Security.RefreshTokenDuration);

    const payload: refreshParams = {
        ip: req.ip,
        token: refresh_token,
        user_agent: req.headers['user-agent'] ? req.headers['user-agent'] : '',
        user_id: infos.user_id,
        expiron: exp.toISOString()
    };

    const r = await StoreRefreshTokenAction(payload);
    if (!r.success) {
        res.status(r.code).send({ message: 'ko', error: r.error, tag: r.tag });
        return;
    }

    const rp = await DeleteRefreshTokenByTokenAction(data.refresh_token);
    if (!rp.success) {
        res.status(rp.code).send({ message: 'ko', error: rp.error, tag: rp.tag });
        return;
    }

    res.status(200).send({
        message: 'ok',
        data: {
            access_token: access_token,
            refresh_token: refresh_token
        }
    });
};

export const signupController = async (req: Request, res: Response) => {
    let data = await signupData(req, res);

    if (!data) return;

    const isUser = await VerifyIfUserExistAction(data.email);
    if (!isUser.success) {
        res.status(isUser.code).send({ message: 'ko', error: isUser.error, tag: isUser.tag });
        return;
    }
    if (isUser.user) {
        res.status(400).send({ message: 'ko', error: 'this email is already used.', tag: 'IS_USER_EXIST' });
        return;
    }

    const sp = await SignupAction(data);
    if (!sp.success) {
        res.status(sp.code).send({ message: 'ko', error: sp.error, tag: sp.tag });
        return;
    }

    const durationRefreshToken: number = API_CNF.API.getInstance().Security.RefreshTokenDuration;
    const durationAccessToken: number = API_CNF.API.getInstance().Security.AccessTokenDuration;
    const secret: string = API_CNF.API.getInstance().Security.Secret;

    let access_token: string = createToken(secret, durationAccessToken, { id: sp.id });
    let refresh_token: string = createToken(secret, durationRefreshToken, {});

    let exp: string | number | Date = new Date();
    exp.setHours(24 * API_CNF.API.getInstance().Security.RefreshTokenDuration);

    const payload: refreshParams = {
        ip: req.ip,
        token: refresh_token,
        user_agent: req.headers['user-agent'] ? req.headers['user-agent'] : '',
        user_id: sp.id,
        expiron: exp.toISOString()
    };

    const r = await StoreRefreshTokenAction(payload);
    if (!r.success) {
        res.status(r.code).send({ message: 'ko', error: r.error, tag: r.tag });
        return;
    }
    res.status(201).send({
        message: 'ok',
        data: {
            access_token: access_token,
            refresh_token: refresh_token
        }
    });
};

export const signinController = async (req: Request, res: Response) => {
    const data = await signinData(req, res);

    if (!data) return;

    const si = await SigninAction(data);
    if (!si.success) {
        res.status(si.code).send({ message: 'ko', error: si.error, tag: si.tag });
        return;
    }

    const durationRefreshToken: number = API_CNF.API.getInstance().Security.RefreshTokenDuration;
    const durationAccessToken: number = API_CNF.API.getInstance().Security.AccessTokenDuration;
    const secret: string = API_CNF.API.getInstance().Security.Secret;

    let access_token: string = createToken(secret, durationAccessToken, { id: si.id });
    let refresh_token: string = createToken(secret, durationRefreshToken, {});

    let exp: string | number | Date = new Date();
    exp.setHours(24 * API_CNF.API.getInstance().Security.RefreshTokenDuration);

    const payload: refreshParams = {
        ip: req.ip,
        token: refresh_token,
        user_agent: req.headers['user-agent'] ? req.headers['user-agent'] : '',
        user_id: si.id,
        expiron: exp.toISOString()
    };

    const dt = await DeleteRefreshTokenByUserIDAction(si.id);
    if (!dt.success) {
        res.status(dt.code).send({ message: 'ko', error: dt.error, tag: dt.tag });
        return;
    }

    const r = await StoreRefreshTokenAction(payload);
    if (!r.success) {
        res.status(r.code).send({ message: 'ko', error: r.error, tag: r.tag });
        return;
    }
    res.status(201).send({
        message: 'ok',
        data: {
            access_token: access_token,
            refresh_token: refresh_token
        }
    });
};
