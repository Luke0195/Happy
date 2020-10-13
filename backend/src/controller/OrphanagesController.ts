import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Orphange from '../models/Orphanage';

export default{
  async create(request:Request , response: Response){
    const{ 
      name, 
      latitude,
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends } = request.body;
  
      const orphanagesRepository = getRepository(Orphange);
      const orphanage = orphanagesRepository.create({ 
        name,latitude, longitude,about, instructions, opening_hours, open_on_weekends
      });
  
      await orphanagesRepository.save(orphanage);
      
     return response.status(201).json(orphanage);

  },

  async index(request:Request, response:Response){
    const orphanagesRepository = getRepository(Orphange);
    const orphanages = await orphanagesRepository.find();
    return response.status(200).json(orphanages);
  },

  async show(request:Request, response:Response){
    const { id } = request.params;
    const orphanagesRepository = getRepository(Orphange);
    const orphanage = await orphanagesRepository.findOneOrFail(id);
    if(!orphanage) return response.status(400).json({message: 'Orphanage not found'});
    return response.json(orphanage);
  }
}