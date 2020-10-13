import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import orphanageView from '../views/orphanages_view';

import Orphange from '../models/Orphanage';

export default{
  async create(request:Request , response: Response){
    console.log(request.files);
    const{ 
      name, 
      latitude,
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends } = request.body;
  
      const orphanagesRepository = getRepository(Orphange);

      const requestImages = request.files as Express.Multer.File[];
      const images = requestImages.map(image =>{
        return { path: image.filename}
      })


      const orphanage = orphanagesRepository.create({ 
        name,latitude, longitude,about, instructions, opening_hours, open_on_weekends, images
      });
  
      await orphanagesRepository.save(orphanage);
      
     return response.status(201).json(orphanage);

  },

  async index(request:Request, response:Response){
    const orphanagesRepository = getRepository(Orphange);
    const orphanages = await orphanagesRepository.find({relations:['images']});
    return response.json(orphanageView.renderMany(orphanages));
  },

  async show(request:Request, response:Response){
    const { id } = request.params;
    const orphanagesRepository = getRepository(Orphange);
    const orphanage = await orphanagesRepository.findOneOrFail(id, {relations:['images']});
    if(!orphanage) return response.status(400).json({message: 'Orphanage not found'});
    return response.json(orphanageView.render(orphanage));
  }
}