import { Router } from 'express';

import { validateSchema } from '../middlewares/schema.js';
import schema from '../schemas/authentication.js';
import controller from '../controllers/authentication.js';

const authenticationRouter = Router();

authenticationRouter.post('/signup', validateSchema(schema.signup), controller.signup);
authenticationRouter.post('/signin', validateSchema(schema.signin), controller.signin);

export default authenticationRouter;