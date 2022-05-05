import { validate } from 'indicative/validator';
import { sanitize } from 'indicative/sanitizer';
import { NextFunction, Request, Response } from 'express';

const messages = {
    required: (field: any) => `${field} is required`,
    alpha_numeric: (field: any) => `${field} contains unallowed characters`,
    alpha: (field: any) => `${field} contains unallowed characters`,
    email: (field: any) => `${field} enter a valid email address`,
    min: (field: any) => `${field} is too short`,
    max: (field: any) => `${field} is too long`,
    string: (field: any) => `${field} must be a string`,
    boolean: (field: any) => `${field} must be a boolean`
};

interface ErrorRequest {
    message: string;
    validation: string;
    field: string;
}

export let requestValidators = async (rules: any, req: Request, res: Response) => {
    return await validate(req.body, rules, messages)
        .then(() => true)
        .catch((e: ErrorRequest[]) => {
            let errs: { [key: string]: string };
            errs = { [e[0].field]: 'Bad request, ' + e[0].message + '.' };
            res.status(400).json({ message: 'ko', errors: errs });
            return false;
        });
};

export let requestSanitizer = (
    rules: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    sanitize(req.body, rules);
    next();
};
