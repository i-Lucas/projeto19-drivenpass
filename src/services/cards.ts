import cardsRepo from '../repositories/cards.js';
import sessionsService from './sessions.js';
import cryptrService from './cryptr.js';
import timeUtils from '../utils/time.js';

async function create({ card, token }) {

    const user = await sessionsService.getUserByToken(token);
    const validate = await cardsRepo.findByTitleAndUserId(card.card_title, user.id);
    if (validate) throw { status: 400, message: 'Card title already exists' };

    if (card.card_type !== 'credit' && card.card_type !== 'debit' && card.card_type !== 'both')
        throw { status: 400, message: 'Card type must be credit, debit or both' };

    await cardsRepo.create({

        title: card.card_title,
        number: card.card_number,
        expiration: card.card_expiration,
        password: cryptrService.encrypt(card.card_password),
        type: card.card_type,
        virtual: card.card_virtual,
        code: cryptrService.encrypt(card.card_code),
        userId: user.id,
        updatedAt: timeUtils.formatedTime(),
    });
};

async function list({ token }) {

    const user = await sessionsService.getUserByToken(token);
    const cards = await cardsRepo.findByUserId(user.id);

    return cards.map(card => {
        return {
            title: card.title,
            number: card.number,
            expiration: card.expiration,
            type: card.type,
            virtual: card.virtual,
            code: cryptrService.decrypt(card.code),
            password: cryptrService.decrypt(card.password),
            //updatedAt: note.updatedAt,
        };
    });
};

async function get(token: string, id: number) {

    const user = await sessionsService.getUserByToken(token);
    if (isNaN(id)) throw { status: 400, message: 'Invalid id' };

    const card = await cardsRepo.findUserCardById(user.id, id);
    if (!card) throw { status: 404, message: 'Card not found' };

    return {
        title: card.title,
        number: card.number,
        expiration: card.expiration,
        type: card.type,
        virtual: card.virtual,
        code: cryptrService.decrypt(card.code),
        password: cryptrService.decrypt(card.password),
        //updatedAt: note.updatedAt,
    };
};

async function exclude(token: string, id: number) {

    const user = await sessionsService.getUserByToken(token);
    if (isNaN(id)) throw { status: 400, message: 'Invalid id' };
    const card = await cardsRepo.findUserCardById(user.id, id);
    if (!card) throw { status: 404, message: 'Card not found' };
    await cardsRepo.exclude(id);
};

const cardServices = {
    create,
    list,
    get,
    exclude
};

export default cardServices;