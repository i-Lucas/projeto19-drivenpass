import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userRepository from '../repositories/user.js';
import sessionsService from './sessions.js';
import timeUtils from '../utils/time.js';

async function signup(name: string, email: string, password: string) {

    if (await userRepository.findByEmail(email))
        throw { status: 409, message: 'User already exists' };

    await userRepository.insert({
        name, email,
        password: await bcrypt.hash(password, 10),
        updatedAt: timeUtils.formatedTime()
    });
};

async function signin(email: string, password: string) {

    const user = await userRepository.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password))
        throw { status: 401, message: 'Invalid credentials' };

    const token = jwt.sign({
        userId: user.id,
        email: user.email,
        loggedAt: timeUtils.formatedTime()
    }, 'teste');

    const session = await sessionsService.findByUserId(user.id);
    const token_expiration_minutes = 30;

    if (!session) {

        console.log('new session created');
        await sessionsService.create(user.id, token);

    } else {

        console.log('session updated');
        await sessionsService.update(session.id, {
            token,
            userId: user.id,
            expiration: timeUtils.tokenExpiration(token_expiration_minutes),
            updatedAt: timeUtils.formatedTime()
        });
    }

    //console.log(jwt.decode(token));
    return { token };
};

const authenticationServices = {
    signup,
    signin
};

export default authenticationServices;