import { Request, Response } from 'express';
import noteService from '../services/notes.js';

async function create(req: Request, res: Response) {

    const token = req.headers.authorization;
    await noteService.create({ ...req.body, token });
    res.sendStatus(201);
};

async function list(req: Request, res: Response) {

    const result = await noteService.list({ token: req.headers.authorization });
    res.status(200).json(result);
};

async function get(req: Request, res: Response) {

    const token = req.headers.authorization;
    const result = await noteService.get(token, parseInt(req.params.id));
    res.status(200).json(result);
};

async function exclude(req: Request, res: Response) {

    const token = req.headers.authorization;
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