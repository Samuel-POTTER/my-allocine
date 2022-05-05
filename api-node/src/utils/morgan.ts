import { Request, Response } from 'express';
//import chalk from "chalk";
//const colors = require('colors/safe');
import colors from 'colors/safe';

export const tokenDate = () => {
    return new Date().toISOString().slice(0, 10);
};

export const tokenTime = () => {
    return new Date().toTimeString().slice(0, 8);
};

export const tokenStatus = (req: Request, res: Response) => {
    let code: string = '-';

    if (res.statusCode >= 100 && res.statusCode < 200) {
        code = colors.gray(`${res.statusCode} 💡`);
    } else if (res.statusCode >= 200 && res.statusCode < 300) {
        code = colors.green(`${res.statusCode} ✅`);
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
        code = colors.magenta(`${res.statusCode} 🪃`);
    } else if (res.statusCode >= 400 && res.statusCode < 500) {
        code = colors.yellow(`${res.statusCode} 😵‍💫`);
    } else if (res.statusCode >= 500 && res.statusCode < 600) {
        code = colors.red(`${res.statusCode} ❌`);
    }
    return code;
};

export const tokenMethod = (req: Request) => {
    let method = '-';

    if (req.method === 'GET') {
        method = colors.green('GET    ');
    } else if (req.method === 'POST') {
        method = colors.magenta('POST   ');
    } else if (req.method === 'PUT') {
        method = colors.yellow('PUT    ');
    } else if (req.method === 'PATCH') {
        method = colors.blue('PATCH  ');
    } else if (req.method === 'DELETE') {
        method = colors.red('DELETE ');
    } else if (req.method === 'OPTIONS') {
        method = colors.gray('OPTIONS');
    } else if (req.method === 'HEAD') {
        method = colors.cyan('HEAD   ');
    }

    return method;
};
