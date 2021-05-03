// const AWS = require("aws-sdk");

// AWS.config.update({
//     accessKeyId: "",
//     secretAccessKey: "",
//     region: "",
// });

// var dynamodb = new AWS.DynamoDB();

// var params = {
//   TableName: "Equipment",
//   Item: {
//         id: {
//             S: "teste"
//         },
//         id_equipment: {
//             S: "1651651645"
//         },
//         id_model: {
//             S: "teste"
//         },
//         cpf_client: {
//             S: "987.654.321-33"
//         },
//         equipment_model: {
//             S: "Pressurizador de ┴gua Teste"
//         },
//         instalation_date: {
//             S: "2020-11-12"
//         },
//         maintenance_date: {
//             S: "teste"
//         },
//         last_collect_date: {
//             S: "teste"
//         },
//         situation: {
//             S: "RevisÒo"
//         },
//         observation: {
//             S: "Equipamento de Teste"
//         },
//         work_time: {
//             N: "0"
//         },    
//         installation_status: {
//             S: "pendente"
//         },
//     },
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