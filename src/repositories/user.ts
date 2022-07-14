import db from '../config/db.js';
import { users } from '@prisma/client';

type User = Omit<users, 'id' | 'createdAt'>;

async function insert(user_data: User) {
    await db.users.create({ data: { ...user_data } });
};

async function findByEmail(email: string) {
    return await db.users.findUnique({ where: { email } });
};

async function findById(id: number) {
    return await db.users.findUnique({ where: { id } });
};

const userRepository = {
    insert,
    findByEmail,
    findById
};

export default userRepository;
