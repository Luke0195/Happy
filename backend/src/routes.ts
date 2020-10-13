import {Router} from 'express';

import orphaneController from './controller/OrphanagesController';
const routes = Router();

routes.post('/orphanages',orphaneController.create);
routes.get('/orphanages',orphaneController.index);
routes.get('/orphanages/:id', orphaneController.show);

export default routes;