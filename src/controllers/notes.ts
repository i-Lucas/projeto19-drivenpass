import { Request, Response } from 'express';
import noteService from '../services/notes.js';

async function create(req: Request, res: Response) {

    const token = res.locals.token;
    await noteService.create({ ...req.body, token });
    res.sendStatus(201);
};

async function list(req: Request, res: Response) {

    const result = await noteService.list({ token: res.locals.token });
    res.status(200).json(result);
};

async function get(req: Request, res: Response) {

    const token = res.locals.token;
    const result = await noteService.get(token, parseInt(req.params.id));
    res.status(200).json(result);
};

async function exclude(req: Request, res: Response) {

    const token = res.locals.token;
    await noteService.exclude(token, parseInt(req.params.id));
    res.sendStatus(200);
};

const notesControllers = {
    
    create,
    list,
    get,
    exclude
};

export default notesControllers;