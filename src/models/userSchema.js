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
    birth: { type: String, required: true },
    adress: { type: String, required: true },
    zipcode: { type: String, required: true },
    cpf: { type: String, required: true },
    cnpj: { type: String, required: true }, //CPF unico
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    // talvez equipment n seja util
    equipment: { type: Number },
    nickname: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = dynamoose.model("User", userSchema);
