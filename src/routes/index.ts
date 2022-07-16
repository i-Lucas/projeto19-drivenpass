import { Router } from 'express';
import tokenValidate from '../middlewares/token.js';

import authenticationRoutes from './authentication.js';
import cardsRouter from './cards.js';
import credentialsRoutes from './credentials.js';
import notesRouter from './notes.js';
import wifiRouter from './wifi.js';

// all routes that require authentication
const authenticatedRoutes = Router();
authenticatedRoutes.use(tokenValidate);
authenticatedRoutes.use(credentialsRoutes);
authenticatedRoutes.use(notesRouter);
authenticatedRoutes.use(cardsRouter);
authenticatedRoutes.use(wifiRouter);

const appRouter = Router();

appRouter.use(authenticationRoutes); // signup and signin
appRouter.use(authenticatedRoutes);

export default appRouter;