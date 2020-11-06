const { Router } = require("express");
const routes = Router();
const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.REGION });
const { celebrate, Segments, Joi } = require("celebrate");

const UserController = require("./controllers/UserController");
const userValidate = require("./validators/UserValidator");

const SessionController = require("./controllers/SessionController");
const loginValidate = require("./validators/LoginValidator");

const ClientController = require("./controllers/ClientController");
const clientValidate = require("./validators/ClientValidator");

const DataController = require("./controllers/DataController");

const ModelController = require("./controllers/ModelController");
const modelValidate = require("./validators/ModelValidator");

const EquipmentController = require("./controllers/EquipmentController");
const equipmentValidate = require("./validators/EquipmentValidator");

//Teste Eletronica
const TestEquipmentController = require("./controllers/TestEquipmentController");
const testEquipmentValidate = require("./validators/TestEquipmentValidator");

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

//Users
routes.get("/users", UserController.index);
routes.post('/user', celebrate(userValidate.create), UserController.create);

//Login
routes.post("/login", celebrate(loginValidate.signin), SessionController.signin);

//Data
routes.get("/data/index", DataController.index);
routes.get("/data/:id", DataController.find_id);
routes.put("/data/:id", DataController.update);
routes.delete("/data/:id", DataController.delete);
routes.get("/data/equipament/:id_equipment", DataController.find_id_equipment);
routes.get("/data/equipamentDate/:id_equipment", DataController.find_id_equipment_date);
routes.post("/data/create", DataController.create);

//teste eletronica na rota data
routes.post("/data/teste", DataController.testCreate);

//Clients
routes.post("/client/create", celebrate(clientValidate.createClient), ClientController.create);
routes.get("/client/index", ClientController.index);
routes.get("/client/:id", celebrate(clientValidate.getClientbyId), ClientController.find);
routes.put("/client/:id", celebrate(clientValidate.updateClient), ClientController.update);
routes.delete("/client/:id", celebrate(clientValidate.deleteClient), ClientController.delete);

//Models
routes.post("/model/create", celebrate(modelValidate.createModel), ModelController.create);
routes.get("/model/index", ModelController.index);
routes.get("/model/:id", celebrate(modelValidate.getId), ModelController.find_id);
routes.get("/model/find_model/:model", celebrate(modelValidate.getModel), ModelController.find_model);
routes.get("/model/find_manufacturer/:manufacturer", celebrate(modelValidate.findManufacturer), ModelController.find_manufacturer);
routes.put("/model/:id", celebrate(modelValidate.updateModel), ModelController.update);
routes.delete("/model/:id", celebrate(modelValidate.deleteModel), ModelController.delete);

// Equipment
routes.post("/equipment/create", celebrate(equipmentValidate.create), EquipmentController.create);
routes.get("/equipment/index", EquipmentController.index);
routes.get("/equipment/:id", celebrate(equipmentValidate.getEquipmentById), EquipmentController.find_id);
routes.get("/equipment/find_model/:equipment_model", celebrate(equipmentValidate.getEquipmentByModel), EquipmentController.find_model);
routes.get("/equipment/find_situation/:situation", celebrate(equipmentValidate.getEquipmentBySituation), EquipmentController.find_situation);
routes.get("/equipment/find_cpf_client/:cpf_client", celebrate(equipmentValidate.getEquipmentByCPF), EquipmentController.find_cpf_client);
routes.put("/equipment/:id", celebrate(equipmentValidate.updateEquipment), EquipmentController.update);
routes.delete("/equipment/:id", celebrate(equipmentValidate.deleteEquipment), EquipmentController.delete);
routes.post('/equipment/worktime', celebrate(equipmentValidate.equipmentWorkTime), EquipmentController.set_work_time);

//TestTemperature - rotas de teste
routes.post("/testequipment/create", celebrate(testEquipmentValidate.createTestEquipment), TestEquipmentController.create);
routes.get("/testequipment/index", TestEquipmentController.index);

module.exports = routes;
