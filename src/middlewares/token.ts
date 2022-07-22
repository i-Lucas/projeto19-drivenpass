import { NextFunction, Request, Response } from 'express';
import sessionsService from '../services/sessions.js';

export default async function tokenValidate(req: Request, res: Response, next: NextFunction) {

    const { authorization } = req.headers;
    const token = authorization ? authorization.replace('Bearer ', '') : null;

    if (!token) throw { status: 401, message: 'No token provided' };
    await sessionsService.validate(token);

    res.locals.token = token;
    next();
};