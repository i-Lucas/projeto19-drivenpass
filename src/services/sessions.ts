import sessionRepo from '../repositories/sessions.js';
import timeUtils from '../utils/time.js';
import { sessions } from '@prisma/client';

type Session = Omit<sessions, 'id' | 'createdAt'>;

async function create(userId: number, token: string) {

    const minutes_for_token_expiration = 30;
    const expiration = timeUtils.tokenExpiration(minutes_for_token_expiration);

    await sessionRepo.insert({ userId, token, updatedAt: timeUtils.formatedTime(), expiration });
};

async function validate(token: string) {

    const session = await sessionRepo.findByToken(token);
    if (!session) throw { status: 401, message: 'Invalid token' };

    if (BigInt(Date.now()) > session.expiration)
        throw { status: 401, message: 'Token expired' };
};

async function update(id: number, session_data: Session) {
    await sessionRepo.update(id, session_data);
};

async function findByUserId(userId: number) {
    return await sessionRepo.findByUserId(userId);
};

async function getUserByToken(token: string) {
    return await sessionRepo.findByToken(token);
};

const sessionsService = {
    validate,
    create,
    findByUserId,
    update,
    getUserByToken
};

export default sessionsService;