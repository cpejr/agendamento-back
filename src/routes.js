require("dotenv").config();
const { Router } = require('express');
const routes = Router();
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });

var dynamodb = new AWS.DynamoDB();

routes.get('/', function (request, response) {
  var params = {};
  dynamodb.listTables(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      response.send(data);           // successful response
    }

  });

});
module.exports = routes;