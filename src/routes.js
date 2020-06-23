const { Router } = require("express");
const routes = Router();
const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.REGION });
const { celebrate, Segments, Joi } = require("celebrate");

const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const DataController = require("./controllers/DataController");

var dynamodb = new AWS.DynamoDB();

routes.get("/", function (request, response) {
  var params = {};
  dynamodb.listTables(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      response.send(data); // successful response
    }
  });
});
routes.get("/users", UserController.index);
routes.post(
  "/user",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      // name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().min(6).required(),
      //   type: Joi.string().valid("admin", "retailer", "wholesaler").required(),
      //   cpf: Joi.string().required(),
      //   birthdate: Joi.string().optional(),
      //   zipcode: Joi.string().optional(),
      //   phonenumber: Joi.string().optional(),
      //   state: Joi.string().optional(),
      //   city: Joi.string().optional(),
      //   neighborhood: Joi.string().optional(),
      //   street: Joi.string().optional(),
      //   number: Joi.string().optional(),
      //   complement: Joi.string().optional(),
    }),
  }),
  UserController.create
);

//Session
routes.post(
  "/login",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  SessionController.signin
);


routes.get('/data/index', DataController.index);
routes.get('/data/:id', DataController.find_id);
routes.put('/data/:id', DataController.update);
routes.delete('/data/:id', DataController.delete);
routes.get('/data/equipament/:id_equipament', DataController.find_id_equipament);
routes.post('/data/create', DataController.create);


module.exports = routes;
