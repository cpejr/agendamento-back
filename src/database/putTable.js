/*const AWS = require("aws-sdk");

AWS.config.update({

});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "User",
  Item: {
    id: {
      N: "123",
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
      N: "123",
    },
    cnpj: {
      N: "321",
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
});*/
