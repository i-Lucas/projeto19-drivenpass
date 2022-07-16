import { Router } from 'express';
import { validateSchema } from '../middlewares/schema.js';

import controllers from '../controllers/credentials.js';
import schema from '../schemas/credentials.js';

const credentialsRouter = Router();

credentialsRouter.post('/create/credential', validateSchema(schema.create), controllers.create); // Create new credential
credentialsRouter.get('/list/credential', controllers.list); // list all credentials
credentialsRouter.get('/credential/:id', controllers.get); // get credential by id
credentialsRouter.delete('/delete/credential/:id', controllers.exclude); // delete a credential

export default credentialsRouter;