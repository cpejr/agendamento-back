const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  region: process.env.REGION,
});

const clientSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true },
    name: { type: String, required: true },
    birth: { type: String, required: true },
    adress: { type: String, required: true },
    cpf: { type: String, required: true }, //CPF unico
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    // talvez equipment n seja util
    equipment: { type: Number },
  },
  { timestamps: true }
);

module.exports = dynamoose.model("Clients", clientSchema);
