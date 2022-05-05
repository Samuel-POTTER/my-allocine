import { DatabaseError } from 'pg';

export class ErrorDB {
    public constructor(tag: string, msg: string, code: number, err?: DatabaseError) {
        this.details = err;
        this.error = msg;
        this.tag = tag;
        this.success = false;
        this.code = code;
    }
    public details: DatabaseError | undefined;
    public error: string;
    public tag: string;
    public success: false;
    public code: number;
}

export let newErrorDB = (msg: string, tag: string = '', code: number = 500, details?: DatabaseError): ErrorDB => {
    return new ErrorDB(tag, msg, code, details);
};

export enum ErrorCode {
    INVALID_TEXT_REPRESENTATION = '22P02',
    UNIQUE_VIOLATION = '23505',
    UNDEFINED_TABLE = '42P01',
    UNDEFINED_FUNCTION = '42883'
}

export enum ErrorMessage {
    ERROR_NOT_FOUND = 'resources not found.',
    ERROR_22P02 = 'one of the resources is incorrectly formatted.',
    ERROR_UNIQUE_23505 = 'this resources is already exist please choose another one.',
    ERROR_TABLE_42P01 = 'the table that was triggered is undefined or the migration failed.',
    ERROR_FUNCTION_42883 = 'undefined function.',
    ERROR_UNKNOWN = 'something went wrong with the db.'
}
