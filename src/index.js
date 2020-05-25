const express = require('express');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');

const app = express();
const server = http.Server(app);


app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3333);

// Metodos HTTP Get, post, put, delete

// Tipos de parametros

// query params: req.query  (filtros, orednação, paginação, ...)
// route params: req.params (identificar um recurso na alteração ou remoção)
// body: req.body (dados para criação e alteração de registro)



