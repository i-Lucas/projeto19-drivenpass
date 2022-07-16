import db from '../config/db.js';
import { wifi } from '@prisma/client';

type Wifi = Omit<wifi, 'id' | 'createdAt'>;

async function create(card_data: Wifi) {
    await db.wifi.create({ data: { ...card_data } });
};

async function findByTitleAndUserId(title: string, userId: number) {
    return await db.wifi.findFirst({ where: { title } });
};

async function findByUserId(userId: number) {
    return await db.wifi.findMany({ where: { userId } });
};

async function findUserWifiById(userId: number, id: number) {
    return await db.wifi.findFirst({ where: { id, userId } });
};

async function exclude(id: number) {
    await db.wifi.delete({ where: { id } });
};

const wifiRepo = {

    create,
    findByTitleAndUserId,
    findByUserId,
    findUserWifiById,
    exclude
};

export default wifiRepo;