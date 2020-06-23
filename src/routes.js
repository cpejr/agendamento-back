const { Router } = require("express");
const routes = Router();
const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.REGION });
const { celebrate, Segments, Joi } = require("celebrate");

var userSchema = require("./models/userSchema");
const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const ClientController = require("./controllers/ClientController");

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

// routes.post("/test", async (req, res) => {
//   const user = await userSchema.create(req.body);
//   return res.json(user);
// });

routes.post("/client/create", ClientController.create);
routes.get("/client/index", ClientController.index);
routes.get("/client/:id", ClientController.find);
routes.put("/client/:id", ClientController.update);
routes.delete("/client/:id", ClientController.delete);

module.exports = routes;
