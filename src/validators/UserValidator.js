const { Segments, Joi } = require("celebrate");

let userValidate = new Object();

userValidate.create = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    firebaseUid: Joi.string().optional(),
    address: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    type: Joi.string().valid("PJ", "PF", "Funcionario").required(),
    cpf: Joi.string().optional(),
    cnpj: Joi.string().optional(),
    birthdate: Joi.string().optional(),
    zipcode: Joi.string().optional(),
    phonenumber: Joi.string().optional(),
    state: Joi.string().optional(),
    city: Joi.string().optional(),
    neighborhood: Joi.string().optional(),
    street: Joi.string().optional(),
    number: Joi.string().optional(),
    complement: Joi.string().optional(),
  }),
};

module.exports = userValidate;
