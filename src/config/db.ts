import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const db = new PrismaClient();

connect();

export default db;

async function connect() {
    try {
        await db.$connect(), console.log(`Connected to database ${new Date()}`);
    } catch (err) { console.error(`\n\nError connecting to database:\n\n${err}\n\n${new Date()}\n\n`) };
};