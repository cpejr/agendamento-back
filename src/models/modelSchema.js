const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  region: process.env.REGION,
});

const modelSchema = new dynamoose.Schema(
  {
    modelName: { type: String, required: true },
    type: { type: String, required: true },
    manufacturer: { type: String, required: true },
    releaseYear: { type: String, required: true },
    temperatureLimit: { type: Number, required: true }, 
    currentLimit: { type: Number, required: true },
    voltageLimit: { type: Number, required: true },
    id: { type: String, hashKey: true },
  },
  { timestamps: true }
);

module.exports = dynamoose.model("Models", modelSchema);
