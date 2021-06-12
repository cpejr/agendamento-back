const { Segments, Joi } = require('celebrate');

let equipmentValidate = new Object();

equipmentValidate.create = {
  [Segments.BODY]: Joi.object().keys({
    equipment_code: Joi.string().required(),
    id_model: Joi.string().required(),
    installation_date: Joi.string().required(),
    situation:Joi.string().required(),
    initial_work: Joi.string().required(),
    maintenance: Joi.object().optional(),
    address: Joi.string().optional(),
    zipcode:Joi.string().optional(),
    last_visit:Joi.string().optional(),
  })
}

equipmentValidate.getEquipmentById = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  })
}

equipmentValidate.getEquipmentByModel = {
  [Segments.PARAMS]: Joi.object().keys({
    equipment_model: Joi.string().required(),
  })
}

equipmentValidate.getEquipmentBySituation = {
  [Segments.PARAMS]: Joi.object().keys({
    situation: Joi.string().required(),
  })
}

equipmentValidate.getEquipmentByCPF = {
  [Segments.PARAMS]: Joi.object().keys({
    cpf_client: Joi.string().required(),
  })
}


equipmentValidate.updateEquipment = {
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
  })
}

equipmentValidate.deleteEquipment = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  })
}

equipmentValidate.equipmentWorkTime = {
  [Segments.BODY]: Joi.object().keys({
    id_equipment: Joi.string().required(), 
    worktime: Joi.number().required(),
  })
}

module.exports = equipmentValidate;  