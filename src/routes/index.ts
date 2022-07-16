import { Router } from 'express';
import authenticationRoutes from './authentication.js';
import cardsRouter from './cards.js';
import credentialsRoutes from './credentials.js';
import notesRouter from './notes.js';

const appRouter = Router();

appRouter.use(authenticationRoutes);
appRouter.use(credentialsRoutes);
appRouter.use(notesRouter);
appRouter.use(cardsRouter);

export default appRouter;