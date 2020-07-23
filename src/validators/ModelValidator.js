const { Segments, Joi } = require('celebrate');

let modelValidate = new Object();

modelValidate.createModel = {
  [Segments.BODY]: Joi.object().keys({
    modelName: Joi.string().required(),
    type: Joi.string().required(),
    manufacturer: Joi.string().required(),
    releaseYear: Joi.string().required(),
    temperatureLimit: Joi.number().required(),
    currentLimit: Joi.number().required(),
    voltageLimit: Joi.number().required(),
  })
}

modelValidate.getId = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  })
}

modelValidate.getModel = {
  [Segments.PARAMS]: Joi.object().keys({
    model: Joi.string().required(),
  })
}

modelValidate.findManufacturer = {
  [Segments.PARAMS]: Joi.object().keys({
    manufacturer: Joi.string().required(),
  })
}

modelValidate.updateModel = {
  [Segments.BODY]: Joi.object().keys({
    modelName: Joi.string(),
    type: Joi.string(),
    manufacturer: Joi.string(),
    releaseYear: Joi.string(),
    temperatureLimit: Joi.number(),
    currentLimit: Joi.number(),
    voltageLimit: Joi.number(),
  })
}

modelValidate.deleteModel = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  })
}



module.exports = modelValidate;  