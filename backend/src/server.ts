import express from 'express';
import routes from './routes';
import path from 'path'
import cors from 'cors';



import 'express-async-errors';
import './database/connection'


import errorHandler from './errors/handle';


const app  = express();
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);


app.listen(8882, ()=>{
  console.log('Server is runing')
});