import { Request, Response } from 'express';
import cardServices from '../services/cards.js';

async function create(req: Request, res: Response) {

    const token = req.headers.authorization;
    const card = req.body;

    await cardServices.create({ card, token });
    res.sendStatus(201);
};

async function list(req: Request, res: Response) {

    const token = req.headers.authorization;
    const cards = await cardServices.list({ token });
    res.status(200).json(cards);
};

async function get(req: Request, res: Response) {

    const token = req.headers.authorization;
    const card = await cardServices.get(token, parseInt(req.params.id));
    res.status(200).json(card);
};

async function exclude(req: Request, res: Response) {

    const token = req.headers.authorization;
    await cardServices.exclude(token, parseInt(req.params.id));
    res.sendStatus(200);
};

const cardsControllers = {
    create,
    list,
    get,
    exclude
};

export default cardsControllers;