const dynamoose = require("dynamoose");
const uuid = require("uuid");

dynamoose.aws.sdk.config.update({
  region: process.env.REGION,
});

const userSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    password: { type: String, required: true },
    birthdate: { type: String, required: true },
    address: { type: String, required: true },
    zipcode: { type: String, required: true },
    active: { type: String, optional: true },
    cpf: { type: String, optional: true },
    cnpj: { type: String, optional: true }, //CPF unico
    email: { type: String, required: true },
    phonenumber: { type: String, required: true },
    /*role: { type: String, required: true },
    // talvez equipment n seja util
    equipment: { type: Number },
    nickname: { type: String, required: true },*/
  },
  { timestamps: true }
);

module.exports = dynamoose.model("User", userSchema);
