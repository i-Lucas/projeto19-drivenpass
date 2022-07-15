import { Request, Response } from 'express';
import credentialService from '../services/credentials.js';

async function create(req: Request, res: Response) {

    const token = req.headers.authorization;
    await credentialService.create({ ...req.body, token });
    res.sendStatus(201);
};

async function list(req: Request, res: Response) {

    const token = req.headers.authorization;
    const result = await credentialService.list({ token });
    res.status(200).json(result);
};

async function exclude(req: Request, res: Response) {

    const token = req.headers.authorization;
    await credentialService.exclude(token, parseInt(req.params.id));
    res.sendStatus(200);
};

async function get(req: Request, res: Response) {
    const token = req.headers.authorization;
    const result = await credentialService.get(token, parseInt(req.params.id));
    res.status(200).json(result);
};

const credentialsControllers = {
    create,
    list,
    exclude,
    get
};

export default credentialsControllers;