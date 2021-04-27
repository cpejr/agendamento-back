const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  region: process.env.REGION,
});

const equipmentSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true},
    id_equipment: { type: String, required: true},
    id_model: { type: String, required: true },
    cpf_client: { type: String, required: true },
    equipment_model: { type: String, required: true},
    instalation_date: { type: String, required: true },
    maintenance_date: { type: String},
    last_collect_date: { type: String},
    situation: { type: String, required: true },
    observation: { type: String},
    work_time: { type:Number, required: true, default: 0},
    installation_status: {type: String, default: "pendente"} ,
  },
  { timestamps: true }
);

module.exports = dynamoose.model("Equipment", equipmentSchema);