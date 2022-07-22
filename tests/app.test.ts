import supertest from 'supertest';
import app from '../src/app.js';
import db from '../src/config/db.js';

import userFactory from '../tests/factory/auth.js';

beforeAll(async () => {

    await db.$executeRaw`TRUNCATE TABLE users CASCADE;`;
    await db.$executeRaw`TRUNCATE TABLE sessions CASCADE;`;
    await db.$executeRaw`TRUNCATE TABLE notes CASCADE;`;
    await db.$executeRaw`TRUNCATE TABLE wifi CASCADE;`;
});

describe('authentication tests', () => {

    const user = { email: "dev@test.com", password: "1234567890" };
    const invalid_schema_error = 422;

    it('create new user', async () => {
        const response = await supertest(app).post('/signup').send({ ...user, name: "DevTest", });
        expect(response.status).toBe(201);
    });

    it('create new user with invalid email', async () => {
        const response = await supertest(app).post('/signup').send({ ...user, email: "invalidEmail", });
        expect(response.status).toBe(invalid_schema_error);
    });

    it('create new user with invalid password', async () => {
        const response = await supertest(app).post('/signup').send({ ...user, password: "min10", });
        expect(response.status).toBe(invalid_schema_error);
    });

    it('sigin user', async () => {
        const response = await supertest(app).post('/signin').send(user);
        expect(response.status).toBe(200);
    });
});

describe('notes test', () => {

    let global_token = '';
    let global_note_id = '';
    const invalid_schema_error = 422;

    const note = { title: "This is a nice note", annotation: "nice description" };

    it('create a new note', async () => {

        const token = await userFactory.createUserAndSession();
        global_token = token;

        const response = await supertest(app).post('/create/notes')
            .set('authorization', `Bearer ${token}`).send(note);

        expect(response.status).toBe(201);
    });

    it('create a new note with invalid title', async () => {

        const response = await supertest(app).post('/create/notes')
            .set('authorization', `Bearer ${global_token}`).send({ ...note, title: "min5" });

        expect(response.status).toBe(invalid_schema_error);
    });

    it('create a new note with invalid annotation', async () => {

        const response = await supertest(app).post('/create/notes')
            .set('authorization', `Bearer ${global_token}`).send({ ...note, annotation: "min5" });

        expect(response.status).toBe(invalid_schema_error);
    });

    it('list user notes', async () => {

        const response = await supertest(app).get('/list/notes')
            .set('authorization', `Bearer ${global_token}`);

        global_note_id = response.body[0].id;
        expect(response.status).toBe(200);
    });

    it('list user notes with invalid token', async () => {

        const response = await supertest(app).get('/list/notes')
            .set('authorization', `Bearer invalid_token`);

        expect(response.status).toBe(401);
    });

    it('get note by id', async () => {

        const response = await supertest(app).get(`/notes/${global_note_id}`)
            .set('authorization', `Bearer ${global_token}`);

        expect(response.status).toBe(200);
    });

    it('get note by invalid id', async () => {

        const response = await supertest(app).get(`/notes/invalid_id`)
            .set('authorization', `Bearer ${global_token}`);

        expect(response.status).toBe(400);
    });

    it('get note by id with not found', async () => {

        const response = await supertest(app).get(`/notes/99999`)
            .set('authorization', `Bearer ${global_token}`);

        expect(response.status).toBe(404);
    });

    it('delete note by id', async () => {

        const response = await supertest(app).delete(`/delete/notes/${global_note_id}`)
            .set('authorization', `Bearer ${global_token}`);

        expect(response.status).toBe(200);
    });

    it('delete note by invalid id', async () => {

        const response = await supertest(app).delete(`/delete/notes/999999`)
            .set('authorization', `Bearer ${global_token}`);

        expect(response.status).toBe(404);
    });
});

describe('card test', () => {

    let global_token = '';
    let global_card_id = '';

    it('create a new card', async () => {

        const card = {
            card_title: "electron",
            card_number: "1234567891011121",
            card_code: "123",
            card_expiration: "10/05/2022",
            card_password: "1234",
            card_type: "credit",
            card_virtual: false
        };

        const token = await userFactory.createUserAndSession();
        global_token = token;
        const response = await supertest(app).post('/create/card')
            .set('authorization', `Bearer ${token}`).send(card);

        expect(response.status).toBe(201);
    });

    it('get user cards', async () => {

        const response = await supertest(app).get('/list/cards')
            .set('authorization', `Bearer ${global_token}`);

        global_card_id = response.body[0].id;
        expect(response.status).toBe(200);
    });

    it('get card by id', async () => {

        const response = await supertest(app).get(`/cards/${global_card_id}`)
            .set('authorization', `Bearer ${global_token}`);

        expect(response.status).toBe(200);
    });

    it('delete card by id', async () => {

        const response = await supertest(app).delete(`/delete/card/${global_card_id}`)
            .set('authorization', `Bearer ${global_token}`);

        expect(response.status).toBe(200);
    });

});

describe('wifi tests', () => {

    let global_token = '';
    let global_wifi_id = '';

    it('create a new wifi', async () => {

        const wifi = {

            title: "wifi do vizinho 555",
            network: "claro1234",
            password: "123456",
        }

        const token = await userFactory.createUserAndSession();
        global_token = token;

        const response = await supertest(app).post('/create/wifi')
            .set('authorization', `Bearer ${token}`).send(wifi);

        expect(response.status).toBe(201);
    });

    it('get user wifi list', async () => {

        const response = await supertest(app).get('/get/wifi')
            .set('authorization', `Bearer ${global_token}`);

        global_wifi_id = response.body[0].id;
        expect(response.status).toBe(200);
    });

    it('get user wifi by id -> not found', async () => {

        const response = await supertest(app).get('/get/wifi/9999')
            .set('authorization', `Bearer ${global_token}`);

        expect(response.status).toBe(404);
    });

    it('get user wifi by id -> found', async () => {

        const response = await supertest(app).get(`/get/wifi/${global_wifi_id}`)
            .set('authorization', `Bearer ${global_token}`);

        expect(response.status).toBe(200);
    });

    it('delete user wifi by id', async () => {

        const response = await supertest(app).delete(`/exclude/wifi/${global_wifi_id}`)
            .set('authorization', `Bearer ${global_token}`);

        expect(response.status).toBe(200);
    });

});

describe('credentials tests', () => {

    let global_token = '';
    let global_credential_id = '';

    it('create new credential', async () => {

        const credential = {
            username: "Lucas",
            password: "1234567890",
            title: "Titulos",
            url: "https://www.google.com"
        }

        const token = await userFactory.createUserAndSession();
        global_token = token;

        const response = await supertest(app).post('/create/credential')
            .set('authorization', `Bearer ${token}`).send(credential);

        expect(response.status).toBe(201);
    });

    it('get user credentials', async () => {

        const response = await supertest(app).get('/list/credential')
            .set('authorization', `Bearer ${global_token}`);

        global_credential_id = response.body[0].id;
        expect(response.status).toBe(200);
    });

    it('get user credential by id', async () => {

        const response = await supertest(app).get(`/credential/${global_credential_id}`)
            .set('authorization', `Bearer ${global_token}`);

        expect(response.status).toBe(200);
    });

    it('delete user credential by id', async () => {

        const response = await supertest(app).delete(`/delete/credential/${global_credential_id}`)
            .set('authorization', `Bearer ${global_token}`);

        expect(response.status).toBe(200);
    });

    it('delete user credential by not found id', async () => {

        const response = await supertest(app).delete(`/delete/credential/9999`)
            .set('authorization', `Bearer ${global_token}`);

        expect(response.status).toBe(404);
    });

    it('get user credential by id not found', async () => {

        const response = await supertest(app).get(`/credential/9999`)
            .set('authorization', `Bearer ${global_token}`);

        expect(response.status).toBe(404);
    });

    it('get user credential by invalid token', async () => {

        const response = await supertest(app).get(`/credential/${global_credential_id}`)
            .set('authorization', `Bearer invalid_token`);

        expect(response.status).toBe(401);
    });
});