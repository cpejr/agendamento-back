const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIAY5QI3RRLVJXUBP2C",
  secretAccessKey: "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",
  region: "sa-east-1",
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "User",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" }, //Partition key
    //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" }, //Partition key
    //Sort key
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error(
      "Não foi possível criar a tabela. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Tabela criada com sucesso. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
