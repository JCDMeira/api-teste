const express = require('express');

const server = express();

// query params = ?nome=NodeJS
// Route params = /curso/2
// Request params = {nome: 'NodeJS', tipo: 'Backend'}

const cursos = ['Node JS', 'Javascript', 'react', 'react native'];

//localhost:3000/curso
server.get('/curso/:index', (req, res) => {
  const { index } = req.params;

  return res.json(cursos[index]);
});

server.listen(3333);
