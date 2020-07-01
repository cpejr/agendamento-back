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

// Rota criar clientes
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
      equipment: Joi.number(),
    }),
  }),
  ClientController.create
);

// Rota listar todos os clientes
routes.get("/client/index", ClientController.index);

// Rota buscar por id
routes.get(
  "/client/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  ClientController.find
);

// Rota atualizar cliente
routes.put(
  "/client/:id",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      birth: Joi.string(),
      adress: Joi.string(),
      cpf: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
      equipment: Joi.number(),
    }),
  }),
  ClientController.update
);

// Rota deletar cliente
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

// Rota criar modelos
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

// Rota listar todos os modelos
routes.get("/model/index", ModelController.index);

// Rota buscar id
routes.get(
  "/model/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  ModelController.find_id
);

// Rota buscar por modelo
routes.get(
  "/model/find_model/:model",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      model: Joi.string().required(),
    }),
  }),
  ModelController.find_model
);

// Rota buscar por fabricante
routes.get(
  "/model/find_manufacturer/:manufacturer",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      manufacturer: Joi.string().required(),
    }),
  }),
  ModelController.find_manufacturer
);

// Rota atualizar modelo
routes.put(
  "/model/:id",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      modelName: Joi.string(),
      type: Joi.string(),
      manufacturer: Joi.string(),
      releaseYear: Joi.string(),
      temperatureLimit: Joi.number(),
      currentLimit: Joi.number(),
      voltageLimit: Joi.number(),
    }),
  }),
  ModelController.update
);

// Rota deletar modelo
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

// Rota criar Equipamentos
routes.post(
  "/equipment/create",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id_model: Joi.string().required(),
      id_equipment: Joi.string().required(),
      equipment_model: Joi.string().required(),
      instalation_date:Joi.string().required(),
      maintenance_date: Joi.string(),
      last_collect_date: Joi.string(),
      situation: Joi.string().required(),
      cpf_client:Joi.string().required(),
      observation:Joi.string(),
      work_time:Joi.number(),
    }),
  }),
  EquipmentController.create
);

// Rota listar todos os equipamentos
routes.get(
  "/equipment/index", 
  EquipmentController.index
);

// Rota buscar por id
routes.get(
  "/equipment/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  EquipmentController.find_id
);

// Rota buscar por modelo 
routes.get(
  "/equipment/find_model/:equipment_model",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      equipment_model: Joi.string().required(),
    }),
  }),
  EquipmentController.find_model
);

// Rota buscar por situação
routes.get(
  "/equipment/find_situation/:situation",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      situation: Joi.string().required(),
    }),
  }),
  EquipmentController.find_situation
);

// Rota buscar por CPF
routes.get(
  "/equipment/find_cpf_client/:cpf_client",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cpf_client: Joi.string().required(),
    }),
  }),
  EquipmentController.find_cpf_client
);

// Rota atualizar dados
routes.put(
  "/equipment/:id",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id_model: Joi.string(),
      id_equipment: Joi.string(),
      equipment_model: Joi.string(),
      instalation_date:Joi.string(),
      maintenance_date: Joi.string(),
      last_collect_date: Joi.string(),
      situation: Joi.string(),
      cpf_client:Joi.string(),
      observation:Joi.string(),
      work_time:Joi.number(),
    }),
  }),
  EquipmentController.update
);

// Rota deletar dados
routes.delete(
  "/equipment/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  EquipmentController.delete
);

// Rota tempo de funcionamento
routes.post(
  '/equipment/worktime', 
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id_equipment: Joi.string().required(), 
      worktime: Joi.number().required(),
    })
  }),
  EquipmentController.set_work_time
);

module.exports = routes;
