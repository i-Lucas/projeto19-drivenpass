import db from '../config/db.js';
import { cards } from '@prisma/client';

type Card = Omit<cards, 'id' | 'createdAt'>;

async function create(card_data: Card) {
    await db.cards.create({ data: { ...card_data } });
};

async function findByTitleAndUserId(title: string, userId: number) {
    return await db.cards.findFirst({ where: { title } });
};

async function findByUserId(userId: number) {
    return await db.cards.findMany({ where: { userId } });
};

async function findUserCardById(userId: number, id: number) {
    return await db.cards.findFirst({ where: { id, userId } });
};

async function exclude(id: number) {
    await db.cards.delete({ where: { id } });
};

const cardsRepo = {
    create,
    findByTitleAndUserId,
    findByUserId,
    findUserCardById,
    exclude
};

export default cardsRepo;