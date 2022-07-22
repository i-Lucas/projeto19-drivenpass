import sessionsService from './sessions.js';
import notesRepo from '../repositories/notes.js';
import timeUtils from '../utils/time.js';

async function create({ title, annotation, token }) {

    const user = await sessionsService.getUserByToken(token);
    const note = await notesRepo.findByTitleAndUserId(title, user.userId);
    if (note) throw { status: 400, message: 'Note already exists' };

    await notesRepo.insert({
        title, annotation, userId: user.userId,
        updatedAt: timeUtils.formatedTime(),
    });
};

async function list({ token }) {

    const user = await sessionsService.getUserByToken(token);
    const notes = await notesRepo.findByUserId(user.userId);

    return notes.map(note => {
        return {
            id: note.id,
            title: note.title,
            annotation: note.annotation,
            //updatedAt: note.updatedAt,
        };
    });
};

async function get(token: string, id: number) {

    if (isNaN(id)) throw { status: 400, message: 'Invalid id' };
    const user = await sessionsService.getUserByToken(token);

    const note = await notesRepo.findUserNotesById(user.userId, id);
    if (!note) throw { status: 404, message: 'Note not found' };

    return {
        title: note.title,
        annotation: note.annotation,
        //updatedAt: note.updatedAt,
    };
};

async function exclude(token: string, id: number) {

    if (isNaN(id)) throw { status: 400, message: 'Invalid id' };
    const user = await sessionsService.getUserByToken(token);
    const note = await notesRepo.findUserNotesById(user.userId, id);
    if (!note) throw { status: 404, message: 'Note not found' };
    await notesRepo.exclude(id);
};

const noteService = {

    create,
    list,
    get,
    exclude
};

export default noteService;