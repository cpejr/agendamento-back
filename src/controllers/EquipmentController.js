const Equipment = require("../models/equipmentSchema");
const uuid = require("uuid");

module.exports = {

  // Criar equipamentos
  async create(request, response) {
    try {
      const {
        id_model,
        id_equipment,
        cpf_client,
        equipment_model,
        instalation_date,
        maintenance_date,
        last_collect_date,
        situation,
        observation,
      } = request.body;

      const id = uuid.v1();

      const equipment = await Equipment.create({
        id,
        id_model,
        id_equipment,
        cpf_client,
        equipment_model,
        instalation_date,
        maintenance_date,
        last_collect_date,
        situation,
        observation,
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

  // Buscar todos os equipamentos
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

// Buscar ID
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

  // Buscar modelo
  async find_model(request, response) {
    try {
      const { equipment_model } = request.params;
      const equipment = await Equipment.scan({ equipment_model: equipment_model }).exec();
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

// Buscar situação
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

// Buscar cpf
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

// Atualizar dados
  async update(request, response) {
    try {
      const { id } = request.params;

      const {
        id_model,        
        id_equipment,
        cpf_client,
        equipment_model,
        instalation_date,
        maintenance_date,
        last_collect_date,
        situation,
        observation,
        work_time,
      } = request.body;

      const equipment = await Equipment.update(
        { id },
        {
          id_model,
          id_equipment,
          cpf_client,
          equipment_model,
          instalation_date,
          maintenance_date,
          last_collect_date,
          situation,
          observation,
          work_time,
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

  //  Deletar equipamento
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

// Salvar tempo de funcionamento
  async set_work_time(request, response) {
    try {
      const { 
        id_equipment, 
        worktime,
      } = request.body;

      let equipment = await Equipment.scan({ id_equipment: id_equipment }).exec();
      let update = equipment[0];
      update.work_time += worktime;
      let {id, work_time } = update;

      const update_work_time = await Equipment.update(
        { id },
        {
          work_time
        }
      );
      return response.status(200).json({ update_work_time });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ notification: "Error while trying to set work time" });
    }
  }




};
