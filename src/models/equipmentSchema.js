const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  region: process.env.REGION,
});

const equipmentSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true},
    equipment_code: { type: String, required: true},
    id_model: { type: String, required: true },
    installation_date: { type: String, required: true },
    situation: { type: String, required: true },
    initial_work: { type: String, required: true },
    maintenance: { type: Object },
    address: { type: String, required: false },
    zipcode: { type: String, required: false },
    last_visit: { type:Number, required: false, default: 0},
  },
  { timestamps: true }
);

module.exports = dynamoose.model("Equipment", equipmentSchema);