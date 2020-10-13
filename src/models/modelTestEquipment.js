const dynamoose = require("dynamoose");

const TestTemperatureSchema = new dynamoose.Schema(
    {
        id_equipment: { type: String, hashKey: true },
        temperature: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = dynamoose.model("TestTemperature", TestTemperatureSchema);
