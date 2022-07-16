import { Router } from 'express';

import { validateSchema } from '../middlewares/schema.js';
import wifiSchema from '../schemas/wifi.js';
import wifiControllers from '../controllers/wifi.js';

const wifiRouter = Router();

wifiRouter.post('/create/wifi', validateSchema(wifiSchema.create), wifiControllers.create);
wifiRouter.get('/get/wifi', wifiControllers.list);
wifiRouter.get('/get/wifi/:id', wifiControllers.get);
wifiRouter.delete('/exclude/wifi/:id', wifiControllers.exclude);

export default wifiRouter;