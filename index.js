const express = require('express');

const server = express();

server.use(express.json());

// query params = ?nome=NodeJS
// Route params = /curso/2
// Request params = {nome: 'NodeJS', tipo: 'Backend'}

//# crud - create, read, update, delete

const cursos = ['Node JS', 'Javascript', 'react', 'react native'];

//@ middleware global
server.use((req, res, next) => {
  console.log(`URL chamada: ${req.url}`);

  return next();
});

function checkCurso(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Nome do curso é obrigatório' });
  }

  return next();
}

function checkIndex(req, res, next) {
  const curso = cursos[req.params.index];
  if (!curso) {
    return res.status(400).json({ error: 'O curso não existe' });
  }

  return next();
}

//localhost:3333/cursos //_ listando todos os cursos
server.get('/cursos/', (req, res) => {
  return res.json(cursos);
});

//localhost:3333/cursos/:id //_ buscando um curso por index
server.get('/cursos/:index', checkIndex, (req, res) => {
  const { index } = req.params;

  return res.json(cursos[index]);
});

//localhost:3333/cursos //_ adicionando um curso
server.post('/cursos', checkCurso, (req, res) => {
  const { name } = req.body;

  cursos.push(name);

  return res.json(cursos);
});

//localhost:3333/cursos //_ atualizando um curso
server.put('/cursos/:index', checkCurso, checkIndex, (req, res) => {
  const { name } = req.body;
  const { index } = req.params;

  cursos[index] = name;

  return res.json(cursos);
});

//localhost:3333/cursos //_ deletando um curso
server.delete('/cursos/:index', checkIndex, (req, res) => {
  const { index } = req.params;
  cursos.splice(index, 1);

  return res.json('Curso deletado com sucesso');
});

server.listen(3333);
