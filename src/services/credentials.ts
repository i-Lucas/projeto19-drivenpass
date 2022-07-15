import sessionsService from './sessions.js';
import credentialsRepo from '../repositories/credentials.js';
import cryptrService from './cryptr.js';
import timeUtils from '../utils/time.js';

async function create({ username, password, title, url, token }) {

    const user = await sessionsService.getUserByToken(token);
    const credential = await credentialsRepo.findByTitleAndUserId(title, user.id);
    if (credential) throw { status: 400, message: 'Credential already exists' };

    const encryptedPassword = cryptrService.encrypt(password);
    await credentialsRepo.insert({
        username, password: encryptedPassword, title, url, userId: user.id,
        updatedAt: timeUtils.formatedTime()
    });
};

async function list({ token }) {

    const user = await sessionsService.getUserByToken(token);
    const credentials = await credentialsRepo.findByUserId(user.id);

    return credentials.map(credential => {
        //return { ...credential, password: cryptrService.decrypt(credential.password) };
        return {
            username: credential.username,
            password: cryptrService.decrypt(credential.password),
            title: credential.title,
            url: credential.url
        };
    });
};

async function get(token: string, id: number) {

    if (isNaN(id)) throw { status: 400, message: 'Invalid id' };
    const user = await sessionsService.getUserByToken(token);
    const credential = await credentialsRepo.findUserCredentialsById(user.id, id);
    if (!credential) throw { status: 404, message: 'Credential not found' };

    return {
        username: credential.username,
        password: cryptrService.decrypt(credential.password),
        title: credential.title,
        url: credential.url
    };
};

async function exclude(token: string, id: number) {

    if (isNaN(id)) throw { status: 400, message: 'Invalid id' };
    const user = await sessionsService.getUserByToken(token);
    const credential = await credentialsRepo.findUserCredentialsById(user.id, id);
    if (!credential) throw { status: 404, message: 'Credential not found' };
    await credentialsRepo.exclude(id);
};

const credentialsServices = {
    create,
    list,
    exclude,
    get
};

export default credentialsServices;