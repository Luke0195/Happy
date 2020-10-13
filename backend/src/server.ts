import express from 'express';

const app = express();

app.listen(8881, ()=>{
  console.log(' O servidor está rodando na porta http://localhost:8881');
})