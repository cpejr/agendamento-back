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
    cpf: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    equipment: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = dynamoose.model("Clients", clientSchema);
