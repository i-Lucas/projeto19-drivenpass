import { Request, Response } from 'express';
import wifiServices from '../services/wifi.js';

async function create(req: Request, res: Response) {

    const token = req.headers.authorization;
    const wifi = req.body;

    await wifiServices.create({ wifi, token });
    res.sendStatus(201);
};

async function list(req: Request, res: Response) {

    const token = req.headers.authorization;
    const wifis = await wifiServices.list({ token });
    res.status(200).json(wifis);
};

async function get(req: Request, res: Response) {

    const token = req.headers.authorization;
    const wifi = await wifiServices.get(token, parseInt(req.params.id));
    res.status(200).json(wifi);
};

async function exclude(req: Request, res: Response) {

    const token = req.headers.authorization;
    await wifiServices.exclude(token, parseInt(req.params.id));
    res.sendStatus(200);
};

const wifiControllers = {
    create,
    list,
    get,
    exclude
};

export default wifiControllers;