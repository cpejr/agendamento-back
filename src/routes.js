const { Router } = require("express");
const routes = Router();
const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.REGION });
const { celebrate, Segments, Joi } = require("celebrate");

const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const ClientController = require("./controllers/ClientController");
const DataController = require("./controllers/DataController");
const ModelController = require("./controllers/ModelController");
const EquipmentController = require("./controllers/EquipmentController");

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

routes.get("/data/index", DataController.index);
routes.get("/data/:id", DataController.find_id);
routes.put("/data/:id", DataController.update);
routes.delete("/data/:id", DataController.delete);
routes.get(
  "/data/equipament/:id_equipment",
  DataController.find_id_equipment
);
routes.post("/data/create", DataController.create);

//Clients
routes.post(
  "/client/create",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      birth: Joi.string().required(),
      adress: Joi.string().required(),
      cpf: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      equipment: Joi.number().required(),
    }),
  }),
  ClientController.create
);

routes.get("/client/index", ClientController.index);
routes.get(
  "/client/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  ClientController.find
);
routes.put(
  "/client/:id",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      birth: Joi.string().required(),
      adress: Joi.string().required(),
      cpf: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      equipment: Joi.number().required(),
    }),
  }),
  ClientController.update
);
routes.delete(
  "/client/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  ClientController.delete
);

//Models
routes.post(
  "/model/create",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      modelName: Joi.string().required(),
      type: Joi.string().required(),
      manufacturer: Joi.string().required(),
      releaseYear: Joi.string().required(),
      temperatureLimit: Joi.number().required(),
      currentLimit: Joi.number().required(),
      voltageLimit: Joi.number().required(),
    }),
  }),
  ModelController.create
);

routes.get("/model/index", ModelController.index);
routes.get(
  "/model/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  ModelController.find_id
);
routes.get(
  "/model/find_model/:model",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      model: Joi.string().required(),
    }),
  }),
  ModelController.find_model
);
routes.get(
  "/model/find_manufacturer/:manufacturer",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      manufacturer: Joi.string().required(),
    }),
  }),
  ModelController.find_manufacturer
);
routes.put(
  "/model/:id",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      modelName: Joi.string().required(),
      type: Joi.string().required(),
      manufacturer: Joi.string().required(),
      releaseYear: Joi.string().required(),
      temperatureLimit: Joi.number().required(),
      currentLimit: Joi.number().required(),
      voltageLimit: Joi.number().required(),
    }),
  }),
  ModelController.update
);
routes.delete(
  "/model/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  ModelController.delete
);

// Equipment
routes.post(
  "/equipment/create",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      equipment_model: Joi.string().required(),
      localization:Joi.string().required(),
      address:Joi.string().required(),
      instalation_date:Joi.string().required(),
      maintenance_date: Joi.string().required(),
      last_collect_date: Joi.string().required(),
      situation: Joi.string().required(),
      cpf_client:Joi.string().required(),
      observation:Joi.string().required(),
    }),
  }),
  EquipmentController.create
);

routes.get("/equipment/index", EquipmentController.index);

routes.get(
  "/equipment/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  EquipmentController.find_id
);

routes.get(
  "/equipment/find_model/:equipment_model",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      equipment_model: Joi.string().required(),
    }),
  }),
  EquipmentController.find_model
);

routes.get(
  "/equipment/find_situation/:situation",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      situation: Joi.string().required(),
    }),
  }),
  EquipmentController.find_situation
);

routes.get(
  "/equipment/find_cpf_client/:cpf_client",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cpf_client: Joi.string().required(),
    }),
  }),
  EquipmentController.find_cpf_client
);

routes.put(
  "/equipment/:id",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      equipment_model: Joi.string().required(),
      localization:Joi.string().required(),
      address:Joi.string().required(),
      instalation_date:Joi.string().required(),
      maintenance_date: Joi.string().required(),
      last_collect_date: Joi.string().required(),
      situation: Joi.string().required(),
      cpf_client:Joi.string().required(),
      observation:Joi.string().required(),
    }),
  }),
  EquipmentController.update
);
routes.delete(
  "/equipment/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  EquipmentController.delete
);

module.exports = routes;
