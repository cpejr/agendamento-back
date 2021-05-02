// const AWS = require("aws-sdk");

// AWS.config.update({

// });

// var dynamodb = new AWS.DynamoDB();

// var params = {
//   TableName: "Equipment",
//   Item: [
//     {
//         work_time: {
//             N: "0"
//         },
//         cpf_client: {
//             S: "987.654.321-33"
//         },
//         situation: {
//             S: "RevisÒo"
//         },
//         id_equipment: {
//             S: "1651651645"
//         },
//         updatedAt: {
//             N: "1618429334374"
//         },
//         observation: {
//             S: "Equipamento de Teste"
//         },
//         equipment_model: {
//             S: "Pressurizador de ┴gua Teste"
//         },
//         createdAt: {
//             N: "1618429334374"
//         },
//         id_model: {
//             S: "teste"
//         },
//         id: {
//             S: "teste"
//         },
//         instalation_date: {
//             S: "2020-11-12"
//         },
//         equipment_status: {
//             S: "pendente"
//         },
//         maintenance_date: {
//             S: "teste"
//         },
//       },
//     ]
// };
// dynamodb.putItem(params, function (err, data) {
//   if (err) {
//     console.error(
//       "Foi impossível atualizar a tabela. Error JSON:",
//       JSON.stringify(err, null, 2)
//     );
//   } else {
//     console.log(
//       "Tabela Atualizada. Table description JSON:",
//       JSON.stringify(data, null, 2)
//     );
//   }
// });