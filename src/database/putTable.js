const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIAY5QI3RRLVJXUBP2C",
  secretAccessKey: "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",
  region: "sa-east-1",
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "User",
  Item: {
    id: {
      S: "1243",
    },
    name: {
      S: "teste",
    },
    email: {
      S: "teste",
    },
    password: {
      S: "teste",
    },
    type: {
      S: "teste",
    },
    cpf: {
      S: "123",
    },
    cnpj: {
      S: "321",
    },
    birthdate: {
      S: "teste]",
    },
    zipcode: {
      S: "teste]",
    },
    phonenumber: {
      S: "teste]",
    },
    address: {
      S: "teste]",
    },
    active: {
      S: "teste]",
    },
    complement: {
      S: "teste]",
    },
  },
};
dynamodb.putItem(params, function (err, data) {
  if (err) {
    console.error(
      "Foi impossível atualizar a tabela. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Tabela Atualizada. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
