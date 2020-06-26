const Model = require("../models/modelSchema");
//const { index } = require("./UserController");
const uuid = require("uuid");

module.exports = {
  async create(request, response) {
    try {
      const {
        modelName,
        type,
        manufacturer,
        releaseYear,
        temperatureLimit,
        currentLimit,
        voltageLimit,
      } = request.body;
      const id = uuid.v1();
      const model = await Model.create({
        modelName,
        type,
        manufacturer,
        releaseYear,
        temperatureLimit,
        currentLimit,
        voltageLimit,
        id,
      });

      return response.status(200).json({ notification: "Modelo criado!" });
    } catch (err) {
      if (err.message)
        return response.status(400).json({ notification: err.message });

      console.log("Client creation failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to register model",
      });
    }
  },

  async index(request, response) {
    try{
        const data = await Model.scan().exec();

        return response.status(200).json({ data });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ notification: "Internal server error" });
    }
},

async create

async delete(request, response) {
  try {
    const model = await Model.delete(request.params.id);

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