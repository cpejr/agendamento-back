const Client = require("../models/clientSchema");
const uuid = require("uuid");

module.exports = {

  // Criar Cliente
  async create(request, response) {
    try {
      const {
        name,
        birth,
        adress,
        cpf,
        email,
        phone,
        equipment,
      } = request.body;
      const id = uuid.v1();
      const condition = await Client.scan({ cpf: cpf }).exec();

      // A condição acima scaneou se o cpf já estava sendo utilizado no BD, abaixo utiliza-se o if para validar
      // A tabela PRECISA estar criada!
      if (condition.count === 0) {
        const client = await Client.create({
          id,
          name,
          birth,
          adress,
          cpf,
          email,
          phone,
          equipment,
        });
        return response.status(200).json({ notification: "Client created!" });
      } else {
        return response
          .status(400)
          .json({ notification: "CPF already in use" });

        console.log("Client creation failed: CPF already in use");
      }
    } catch (err) {
      if (err.message)
        return response.status(400).json({ notification: err.message });

      console.log("Client creation failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to register client",
      });
    }
  },

  // Buscar todos os clientes
  async index(request, response) {
    try {
      const client = await Client.scan().exec();

      return response.status(200).json({ client });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Error while trying to validate credentials" });
    }
  },

  // Buscar id
  async find(request, response) {
    try {
      const client = await Client.get(request.params.id);

      return response.status(200).json({ client });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Error while trying to validate credentials" });
    }
  },

  // Atualizar cliente
  async update(request, response) {
    try {
      const { id } = request.params;

      const {
        name,
        birth,
        adress,
        cpf,
        email,
        phone,
        equipment,
      } = request.body;

      const client = await Client.update(
        { id },
        {
          name,
          birth,
          adress,
          cpf,
          email,
          phone,
          equipment,
        }
      );

      return response.status(200).json({ client });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Error while trying to update items" });
    }
  },

  // Deletar cliente
  async delete(request, response) {
    try {
      const client = await Client.delete(request.params.id);

      return response
        .status(200)
        .json({ notification: "Sucessfully deleted item" });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ notification: "Error while trying to delete items" });
    }
  },
};
