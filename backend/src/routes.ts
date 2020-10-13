import {Router} from 'express';
import multer from 'multer';

import orphaneController from './controller/OrphanagesController';
import multerConfig from './config/upload';
const routes = Router();
const uploads = multer(multerConfig);

routes.get('/orphanages',orphaneController.index);
routes.get('/orphanages/:id', orphaneController.show);
routes.post('/orphanages',uploads.array('images') ,orphaneController.create);

export default routes;