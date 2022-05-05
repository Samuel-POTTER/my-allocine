import API_CNF from '../config/config';
import { ErrorCode, ErrorDB, ErrorMessage, newErrorDB } from '../database/errors';
import { DatabaseError } from 'pg';
import knex from '../database/database';
import { IKnexRaw } from '../types/auth.types';

const GetUserProfileSQL = `
SELECT
    id,
    firstname,
    lastname,
    email
FROM users
WHERE id = ?
AND deleted_at IS NULL;
`;

export type GetProfileUserRow = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    success: true;
};

export const GetProfileAction = async(user_id: string) => {
    const res: ErrorDB | GetProfileUserRow = await knex
        .raw(GetUserProfileSQL, [user_id])
        .then((res: IKnexRaw) => ({ ...res.rows[0], success: true } as GetProfileUserRow))
        .catch((e: DatabaseError) => {
            if (e.code === ErrorCode.INVALID_TEXT_REPRESENTATION) {
                return newErrorDB(ErrorMessage.ERROR_22P02, 'GET_USER_INFOS_22P02', 400, e);
            }
            if (e.code === ErrorCode.UNDEFINED_TABLE) {
                return newErrorDB(ErrorMessage.ERROR_TABLE_42P01, 'GET_USER_INFOS_42P01', 500, e);
            }
            if (e.code === ErrorCode.UNDEFINED_FUNCTION) {
                return newErrorDB(ErrorMessage.ERROR_FUNCTION_42883, 'GET_USER_INFOS_42883', 500, e);
            }
            return newErrorDB(e.detail ? e.detail : ErrorMessage.ERROR_UNKNOWN, 'GET_USER_INFOS_500', 500, e);
        });
    return res;
};
