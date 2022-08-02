const express = require('express');

const server = express();

// query params = ?nome=NodeJS
// Route params = /curso/2
// Request params = {nome: 'NodeJS', tipo: 'Backend'}

//localhost:3000/curso
server.get('/curso/:id', (req, res) => {
  const nome = req.query.nome;
  const id = req.params.id;

  return res.json({ msg: `Hello ${nome} - curso ${id}` });
});

server.listen(3333);
