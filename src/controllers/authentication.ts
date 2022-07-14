import { Request, Response } from 'express';
import authService from '../services/authentication.js';

async function signup(req: Request, res: Response) {

    const { name, email, password }: { name: string, email: string, password: string } = req.body;
    await authService.signup(name, email, password);

    res.sendStatus(201);
};

async function signin(req: Request, res: Response) {

    const { email, password }: { email: string, password: string } = req.body;
    const token = await authService.signin(email, password);

    res.status(200).send(token);
};

const authenticationControllers = {
    signup,
    signin
};

export default authenticationControllers;