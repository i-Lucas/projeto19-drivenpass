import db from '../../src/config/db.js';
import bcrypt from 'bcrypt';
import timer from '../../src/utils/time.js';
import { faker } from '@faker-js/faker';

async function createUserAndSession() {

    const user = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: "1234567890"
    };

    const insertedUser = await db.users.create({
        data: {
            name: user.name,
            email: user.email,
            password: bcrypt.hashSync(user.password, 10),
            updatedAt: timer.formatedTime()
        }
    });

    const token = "valid_token";

    await db.sessions.create({
        data: {
            userId: insertedUser.id,
            token,
            expiration: timer.tokenExpiration(60),
            updatedAt: timer.formatedTime()
        }
    });

    return token;
};

const user_factory = {

    createUserAndSession
};

export default user_factory;