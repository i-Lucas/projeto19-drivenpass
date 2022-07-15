import db from '../config/db.js';
import { credentials } from '@prisma/client';

type Credential = Omit<credentials, 'id' | 'createdAt'>;

async function insert(credential_data: Credential) {
    await db.credentials.create({ data: { ...credential_data } });
};

async function update(id: number, credential_data: Credential) {
    await db.credentials.update({ where: { id }, data: { ...credential_data } });
};

async function exclude(id: number) {
    await db.credentials.delete({ where: { id } });
};

async function findByUserId(userId: number) {
    return await db.credentials.findMany({ where: { userId } });
};

async function findByTitleAndUserId(title: string, userId: number) {
    return await db.credentials.findFirst({ where: { title, userId } });
};

async function findUserCredentialsById(userId: number, id: number) {
    return await db.credentials.findFirst({ where: { id, userId } });
};

const credentialsRepository = {
    insert,
    update,
    exclude,
    findByUserId,
    findByTitleAndUserId,
    findUserCredentialsById
};

export default credentialsRepository;