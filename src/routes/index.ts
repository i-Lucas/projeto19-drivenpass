import { Router } from 'express';
import authenticationRoutes from './authentication.js';
import credentialsRoutes from './credentials.js';

const appRouter = Router();

appRouter.use(authenticationRoutes);
appRouter.use(credentialsRoutes);

export default appRouter;