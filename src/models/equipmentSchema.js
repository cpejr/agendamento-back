const dynamoose = require("dynamoose");
const uuid = require("uuid");

dynamoose.aws.sdk.config.update({
  region: process.env.REGION,
});

const equipmentSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true},
    model: { type: String, required: true},
    lozalization: { type: String, required: true },
    address: { type: String, required: true },
    instalation_date: { type: String, required: true },
    maintenance_date: { type: String, required: true },
    last_collect_date: { type: String, required: true },
    situation: { type: String, required: true },
    cpf_client: { type: String, required: true },
    observation: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = dynamoose.model("Equipment", equipmentSchema);