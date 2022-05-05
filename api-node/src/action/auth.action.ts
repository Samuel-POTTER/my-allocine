import knex from '../database/database';
import { newErrorDB, ErrorDB, ErrorMessage, ErrorCode } from '../database/errors';
import { DatabaseError } from 'pg';
import { IKnexRaw, refreshParams } from '../types/auth.types';
import API_CNF from '../config/config';
import { signupParams } from '../dataTransfertObject/signup.data';
import { signinParams } from '../dataTransfertObject/signin.data';

const GetRefreshTokenByTokenSQL = `
SELECT user_id, token FROM refresh_token
WHERE token = ?
AND deleted_at IS NULL;
`;

export type GetRefreshTokenByTokenRow = {
    user_id: string;
    token: string;
    success: true;
};

export const GetRefreshTokenByTokenAction = async (token: string): Promise<ErrorDB | GetRefreshTokenByTokenRow> => {
    const res: ErrorDB | GetRefreshTokenByTokenRow = await knex
        .raw(GetRefreshTokenByTokenSQL, [token])
        .then((res: IKnexRaw) => {
            if (!res.rowCount) return newErrorDB(ErrorMessage.ERROR_NOT_FOUND, 'GET_REFRESH_TOKEN_BY_TOKEN', 400);
            return { ...res.rows[0], success: true } as GetRefreshTokenByTokenRow;
        })
        .catch((e: DatabaseError) => {
            if (e.code === ErrorCode.INVALID_TEXT_REPRESENTATION) {
                return newErrorDB(ErrorMessage.ERROR_22P02, 'GET_REFRESH_TOKEN_BY_TOKEN_22P02', 400, e);
            }
            if (e.code === ErrorCode.UNDEFINED_TABLE) {
                return newErrorDB(ErrorMessage.ERROR_TABLE_42P01, 'GET_REFRESH_TOKEN_BY_TOKEN_42P01', 500, e);
            }
            return newErrorDB(e.detail ? e.detail : ErrorMessage.ERROR_UNKNOWN, 'GET_REFRESH_TOKEN_BY_TOKEN', 500, e);
        });
    return res;
};

const StoreRefreshTokenSQL = `
INSERT INTO refresh_token (ip, user_agent, token, expire_on, user_id)
VALUES (?, ?, ?, ?, ?);
`;

export type StoreRefreshTokenRow = {
    success: true;
};

export const StoreRefreshTokenAction = async (payload: refreshParams): Promise<ErrorDB | StoreRefreshTokenRow> => {
    const res: ErrorDB | StoreRefreshTokenRow = await knex
        .raw(StoreRefreshTokenSQL, [payload.ip, payload.user_agent, payload.token, payload.expiron, payload.user_id])
        .then(() => ({ success: true } as StoreRefreshTokenRow))
        .catch((e: DatabaseError) => {
            if (e.code === ErrorCode.INVALID_TEXT_REPRESENTATION) {
                return newErrorDB(ErrorMessage.ERROR_22P02, 'STORE_NEW_REFRESH_TOKEN_22P02', 400, e);
            }
            if (e.code === ErrorCode.UNDEFINED_TABLE) {
                return newErrorDB(ErrorMessage.ERROR_TABLE_42P01, 'STORE_NEW_REFRESH_TOKEN_42P01', 500, e);
            }
            return newErrorDB(e.detail ? e.detail : ErrorMessage.ERROR_UNKNOWN, 'STORE_NEW_REFRESH_TOKEN', 500, e);
        });
    return res;
};

const DeleteRefreshTokenByTokenSQL = `
UPDATE refresh_token
SET deleted_at = NOW()
WHERE token = ?
AND deleted_at IS NULL;
`;

export type DeleteRefreshTokenByTokenRow = {
    success: true;
};

export const DeleteRefreshTokenByTokenAction = async (
    token: string
): Promise<ErrorDB | DeleteRefreshTokenByTokenRow> => {
    const res: ErrorDB | DeleteRefreshTokenByTokenRow = await knex
        .raw(DeleteRefreshTokenByTokenSQL, [token])
        .then(() => ({ success: true } as DeleteRefreshTokenByTokenRow))
        .catch((e: DatabaseError) => {
            if (e.code === ErrorCode.INVALID_TEXT_REPRESENTATION) {
                return newErrorDB(ErrorMessage.ERROR_22P02, 'DELETE_REFRESH_TOKEN_22P02', 400, e);
            }
            if (e.code === ErrorCode.UNDEFINED_TABLE) {
                return newErrorDB(ErrorMessage.ERROR_TABLE_42P01, 'DELETE_REFRESH_TOKEN_42P01', 500, e);
            }
            return newErrorDB(e.detail ? e.detail : ErrorMessage.ERROR_UNKNOWN, 'DELETE_REFRESH_TOKEN', 500, e);
        });
    return res;
};

const VerifyIfUserExistSQL = `
SELECT EXISTS(
    SELECT * FROM users
    WHERE email = ?
    AND deleted_at IS NULL
);
`;

export type VerifyIfUserExistRow = {
    user: boolean;
    success: true;
};

export const VerifyIfUserExistAction = async (email: string): Promise<ErrorDB | VerifyIfUserExistRow> => {
    const res: ErrorDB | VerifyIfUserExistRow = await knex
        .raw(VerifyIfUserExistSQL, [email])
        .then((res: IKnexRaw) => ({ success: true, user: res.rows[0].exists } as VerifyIfUserExistRow))
        .catch((e: DatabaseError) => {
            if (e.code === ErrorCode.UNDEFINED_TABLE) {
                return newErrorDB(ErrorMessage.ERROR_TABLE_42P01, 'IS_USER_EXIST_42P01', 500, e);
            }
            if (e.code === ErrorCode.UNDEFINED_FUNCTION) {
                return newErrorDB(ErrorMessage.ERROR_FUNCTION_42883, 'IS_USER_EXIST_42883', 500, e);
            }
            return newErrorDB(e.detail ? e.detail : ErrorMessage.ERROR_UNKNOWN, 'IS_USER_EXIST_500', 500, e);
        });
    return res;
};

const SignupSQL = `
INSERT INTO users (email, password)
VALUES (?, crypt(?, gen_salt('bf')))
RETURNING id, email;
`;

export type SignupRow = {
    id: string;
    email: string;
    success: true;
};

export const SignupAction = async (payload: signupParams): Promise<ErrorDB | SignupRow> => {
    const res: ErrorDB | SignupRow = await knex
        .raw(SignupSQL, [payload.email, payload.password])
        .then((res: IKnexRaw) => ({ ...res.rows[0], success: true } as SignupRow))
        .catch((e: DatabaseError) => {
            if (e.code === ErrorCode.UNDEFINED_TABLE) {
                return newErrorDB(ErrorMessage.ERROR_TABLE_42P01, 'SIGNUP_42P01', 500, e);
            }
            if (e.code === ErrorCode.UNDEFINED_FUNCTION) {
                return newErrorDB(ErrorMessage.ERROR_FUNCTION_42883, 'SIGNUP_42883', 500, e);
            }
            return newErrorDB(e.detail ? e.detail : ErrorMessage.ERROR_UNKNOWN, 'SIGNUP_500', 500, e);
        });
    return res;
};

const SigninSQL = `
SELECT id, email FROM users
WHERE email = ?
AND password = crypt(?, password)
AND deleted_at IS NULL;
`;

export type SigninRow = {
    id: string;
    email: string;
    success: true;
};

export const SigninAction = async (payload: signinParams): Promise<ErrorDB | SigninRow> => {
    const res: ErrorDB | SigninRow = await knex
        .raw(SigninSQL, [payload.email, payload.password])
        .then((res: IKnexRaw) => ({ ...res.rows[0], success: true } as SigninRow))
        .catch((e: DatabaseError) => {
            if (e.code === ErrorCode.UNDEFINED_TABLE) {
                return newErrorDB(ErrorMessage.ERROR_TABLE_42P01, 'SIGNIN_42P01', 500, e);
            }
            if (e.code === ErrorCode.UNDEFINED_FUNCTION) {
                return newErrorDB(ErrorMessage.ERROR_FUNCTION_42883, 'SIGNIN_42883', 500, e);
            }
            return newErrorDB(e.detail ? e.detail : ErrorMessage.ERROR_UNKNOWN, 'SIGNIN_500', 500, e);
        });
    return res;
};

const DeleteRefreshTokenByUserIDSQL = `
UPDATE refresh_token
SET deleted_at = NOW()
WHERE user_id = ?
AND deleted_at IS NULL;
`;

export type DeleteRefreshTokenByUserRow = {
    success: true;
};

export const DeleteRefreshTokenByUserIDAction = async (
    user_id: string
): Promise<ErrorDB | DeleteRefreshTokenByUserRow> => {
    const res: ErrorDB | DeleteRefreshTokenByUserRow = await knex
        .raw(DeleteRefreshTokenByUserIDSQL, [user_id])
        .then(() => ({ success: true } as DeleteRefreshTokenByUserRow))
        .catch((e: DatabaseError) => {
            if (e.code === ErrorCode.INVALID_TEXT_REPRESENTATION) {
                return newErrorDB(ErrorMessage.ERROR_22P02, 'DELETE_REFRESH_TOKEN_22P02', 500, e);
            }
            if (e.code === ErrorCode.UNDEFINED_TABLE) {
                return newErrorDB(ErrorMessage.ERROR_TABLE_42P01, 'DELETE_REFRESH_TOKEN_42P01', 500, e);
            }
            return newErrorDB(e.detail ? e.detail : ErrorMessage.ERROR_UNKNOWN, 'DELETE_REFRESH_TOKEN_500', 500, e);
        });
    return res;
};
