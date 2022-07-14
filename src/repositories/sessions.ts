import db from '../config/db.js';
import { sessions } from '@prisma/client';

type Session = Omit<sessions, 'id' | 'createdAt'>;

async function insert(session_data: Session) {
    await db.sessions.create({ data: { ...session_data } });
};

async function update(id: number, session_data: Session) {
    await db.sessions.update({ where: { id }, data: { ...session_data } });
};

async function findByToken(token: string) {
    return await db.sessions.findFirst({ where: { token } });
};

async function findByUserId(userId: number) {
    return await db.sessions.findFirst({ where: { userId } });
};

const sessionsRepository = {
    insert,
    update,
    findByToken,
    findByUserId
};

export default sessionsRepository;