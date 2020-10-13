import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

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
    
      const data ={ 
        name,
        latitude,
        longitude,
        about, 
        instructions, 
        opening_hours, 
        open_on_weekends, 
        images
      }

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome Obrigatório'),
        latitude: Yup.number().required('Latitude  Obrigatóra'),
        longitude: Yup.number().required('Longitude Obrigatória'),
        about: Yup.string().required('Campo obrigatório, deve ter no máximo 300 caracteres').max(300),
        instructions: Yup.string().required('Instruções obrigátorias'),
        opening_hours: Yup.string().required(),
        open_on_weekends: Yup.boolean().required(),
        images: Yup.array(Yup.object().shape({
          path:Yup.string().required()
        }))
      })

      await schema.validate(data,{
        abortEarly: false,
      });

      const orphanage = orphanagesRepository.create(data);
  
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