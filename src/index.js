require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const routes = require("./routes");

const { errors } = require("celebrate");

const app = express();
const AWS = require('aws-sdk');
const server = http.Server(app);

const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(port, () => {
  console.log("Listening on port: " + port);
});

var bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));
// Metodos HTTP Get, post, put, delete

// Tipos de parametros

// query params: req.query  (filtros, orednação, paginação, ...)
// route params: req.params (identificar um recurso na alteração ou remoção)
// body: req.body (dados para criação e alteração de registro)
