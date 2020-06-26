const Equipment = require("../models/equipmentSchema");
const uuid = require("uuid");

module.exports = {
  async create(request, response) {
    try {
      const {
        model,
        lozalization,
        address,
        instalation_date,
        maintenance_date,
        last_collect_date,
        situation,
        cpf_client,
        observation,
      } = request.body;

      const id = uuid.v1();

      // A condição acima scaneou se o cpf já estava sendo utilizado no BD, abaixo utiliza-se o if para validar
      // A tabela PRECISA estar criada!
      console.log(model);
        const equipment = await Equipment.create({
            id,
            lozalization,
            address,
            instalation_date,
            maintenance_date,
            last_collect_date,
            situation,
            cpf_client,
            observation,
            model,    
        });
        return response.status(200).json({ notification: "Equipment created!" });
      
    } catch (err) {
      if (err.message)
        return response.status(400).json({ notification: err.message });

      console.log("Equipment creation failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to register equipment",
      });
    }
  },

  async index(request, response) {
    try {
      const equipment = await Equipment.scan().exec();

      return response.status(200).json({ equipment });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Error while trying to validate credentials" });
    }
  },

  async find_id(request, response) {
    try {
      const { id } = request.params;
      const equipment = await Equipment.scan({ id: id }).exec();
      return response.status(200).json({ equipment });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to find the manufacturer",
        });
    }
  },

  async find_model(request, response) {
    try {
      const { model } = request.params;
      const equipment = await Equipment.scan({ model: model }).exec();
      return response.status(200).json({ equipment });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to find the manufacturer",
        });
    }
  },


  async find_situation(request, response) {
    try {
      const { situation } = request.params;
      const equipment = await Equipment.scan({ situation: situation }).exec();
      return response.status(200).json({ equipment });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to find the manufacturer",
        });
    }
  },


  async find_cpf_client(request, response) {
    try {
      const { cpf_client } = request.params;
      const equipment = await Equipment.scan({ cpf_client: cpf_client }).exec();
      return response.status(200).json({ equipment });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to find the manufacturer",
        });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;

      const {
        model,
        lozalization,
        address,
        instalation_date,
        maintenance_date,
        last_collect_date,
        situation,
        cpf_client,
        observation,
      } = request.body;

      const equipment = await Equipment.update(
        { id },
        {
            model,
            lozalization,
            address,
            instalation_date,
            maintenance_date,
            last_collect_date,
            situation,
            cpf_client,
            observation,
        }
      );

      return response.status(200).json({ equipment });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Error while trying to update items" });
    }
  },

  async delete(request, response) {
    try {
      const equipment = await Equipment.delete(request.params.id);

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
