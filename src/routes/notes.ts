import { Router } from 'express';

import controllers from '../controllers/notes.js';
import { validateSchema } from '../middlewares/schema.js';
import schema from '../schemas/notes.js';

const notesRouter = Router();

notesRouter.post('/create/notes', validateSchema(schema.create), controllers.create); // Create new note
notesRouter.get('/list/notes', controllers.list); // list all notes
notesRouter.get('/notes/:id', controllers.get); // get note by id
notesRouter.delete('/delete/notes/:id', controllers.exclude); // delete a note

export default notesRouter;