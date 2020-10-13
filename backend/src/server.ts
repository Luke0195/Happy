import express from 'express';

const app = express();
app.use(express.json());


app.get('/users', (request, response) =>{
 return response.json({message: 'Welcome to the next level week #03'})
})
app.listen(3333, ()=>{
  console.log(' O servidor está rodando na porta http://localhost:3333');
})