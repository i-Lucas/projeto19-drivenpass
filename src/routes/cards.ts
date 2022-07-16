import { Router } from 'express';

import tokenValidate from '../middlewares/token.js';
import { validateSchema } from '../middlewares/schema.js';
import cardSchema from '../schemas/card.js';
import cardsControllers from '../controllers/cards.js';

const cardsRouter = Router();

cardsRouter.use(tokenValidate);

cardsRouter.post('/create/card', validateSchema(cardSchema.create), cardsControllers.create);
cardsRouter.get('/list/cards', cardsControllers.list);
cardsRouter.get('/cards/:id', cardsControllers.get);
cardsRouter.delete('/delete/card/:id', cardsControllers.exclude);

export default cardsRouter;