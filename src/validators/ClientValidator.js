const { Segments, Joi } = require('celebrate');

let clientValidate = new Object();

clientValidate.createClient = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    birth: Joi.string().required(),
    adress: Joi.string().required(),
    cpf: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    role: Joi.string().required(),
    equipment: Joi.number(),
  })
}

clientValidate.getClientbyId = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  })
}

clientValidate.updateClient = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    birth: Joi.string(),
    adress: Joi.string(),
    cpf: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    role: Joi.string(),
    equipment: Joi.number(),
  })
}

clientValidate.deleteClient = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  })
}

module.exports = clientValidate;  