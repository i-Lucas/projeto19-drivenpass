import wifiRepo from '../repositories/wifi.js';
import sessionsService from './sessions.js';
import cryptrService from './cryptr.js';
import timeUtils from '../utils/time.js';

async function create({ wifi, token }) {

    const user = await sessionsService.getUserByToken(token);
    const validate = await wifiRepo.findByTitleAndUserId(wifi.title, user.userId);
    if (validate) throw { status: 400, message: 'Wifi title already exists' };

    await wifiRepo.create({

        title: wifi.title,
        password: cryptrService.encrypt(wifi.password),
        network: wifi.network,
        userId: user.userId,
        updatedAt: timeUtils.formatedTime(),
    });
};

async function list({ token }) {

    const user = await sessionsService.getUserByToken(token);
    const wifi = await wifiRepo.findByUserId(user.userId);

    return wifi.map(wifi => {

        return {
            id: wifi.id,
            title: wifi.title,
            network: wifi.network,
            password: cryptrService.decrypt(wifi.password),
            //updatedAt: wifi.updatedAt,
        };
    });
};

async function get(token: string, id: number) {

    const user = await sessionsService.getUserByToken(token);
    if (isNaN(id)) throw { status: 400, message: 'Invalid id' };

    const wifi = await wifiRepo.findUserWifiById(user.userId, id);
    if (!wifi) throw { status: 404, message: 'Wifi not found' };

    return {
        id: wifi.id,
        title: wifi.title,
        network: wifi.network,
        password: cryptrService.decrypt(wifi.password),
        //updatedAt: wifi.updatedAt,
    };
};

async function exclude(token: string, id: number) {

    const user = await sessionsService.getUserByToken(token);
    if (isNaN(id)) throw { status: 400, message: 'Invalid id' };
    const wifi = await wifiRepo.findUserWifiById(user.userId, id);
    if (!wifi) throw { status: 404, message: 'Wifi not found' };
    await wifiRepo.exclude(id);
};

const wifiServices = {
    create,
    list,
    get,
    exclude
};

export default wifiServices;