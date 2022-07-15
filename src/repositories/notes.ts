import db from '../config/db.js';
import { notes } from '@prisma/client';

type Note = Omit<notes, 'id' | 'createdAt'>;

async function insert(note_data: Note) {
    await db.notes.create({ data: { ...note_data } });
};

async function update(id: number, credential_data: Note) {
    await db.notes.update({ where: { id }, data: { ...credential_data } });
};

async function exclude(id: number) {
    await db.notes.delete({ where: { id } });
};

async function findByUserId(userId: number) {
    return await db.notes.findMany({ where: { userId } });
};

async function findByTitleAndUserId(title: string, userId: number) {
    return await db.notes.findFirst({ where: { title, userId } });
};

async function findUserNotesById(userId: number, id: number) {
    return await db.notes.findFirst({ where: { id, userId } });
};

const notesRepository = {

    insert,
    update,
    exclude,
    findByUserId,
    findByTitleAndUserId,
    findUserNotesById
};

export default notesRepository;