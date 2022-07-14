import { Router } from 'express';
import authenticationRoutes from './authentication.js';
import tokenValidate from '../middlewares/token.js';

const appRouter = Router();
appRouter.use(authenticationRoutes);

appRouter.post('/test', tokenValidate, (req, res) => {

    res.sendStatus(200);
});

export default appRouter;