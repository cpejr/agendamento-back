const dynamoose = require("dynamoose");
const uuid = require("uuid");

dynamoose.aws.sdk.config.update({
  region: process.env.REGION,
});

const DataSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true },
    id_equipament: {type: String, required: true},
    temperature: { type: Number, required: true },
    voltage: { type: Number, required: true },
    current: { type: Number, required: true},
  },
  { timestamps: true }
);

module.exports = dynamoose.model("Data", DataSchema);
