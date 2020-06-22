const dynamoose = require("dynamoose");
const uuid = require("uuid");

dynamoose.aws.sdk.config.update({
  region: process.env.REGION,
});

const userSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true, default: uuid.v1() },
    name: { type: String },
    nickname: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = dynamoose.model("User", userSchema);
