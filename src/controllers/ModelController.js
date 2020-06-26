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

      return response.status(200).json({ model });
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

async find_id(request, response) {
  try {
    const model = await Model.get(request.params.id);

    return response.status(200).json({ model });
  } catch (err) {
    console.log(err);
    return response
      .status(500)
      .json({ message: "Internal server error while trying to find the model" });
  }
},

async find_model(request, response) {
  try {
    const { model } = request.params;
    const models = await Model.scan({ modelName: model }).exec();
    return response.status(200).json({ models });
  } catch (err) {
    console.log(err);
    return response
      .status(500)
      .json({
        notification: "Internal server error while trying to find the model",
      });
  }
},

async find_manufacturer(request, response) {
  try {
    const { manufacturer } = request.params;
    const models = await Model.scan({ manufacturer: manufacturer }).exec();
    return response.status(200).json({ models });
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
      modelName,
      type,
      manufacturer,
      releaseYear,
      temperatureLimit,
      currentLimit,
      voltageLimit,
    } = request.body;

    const model = await Model.update(
      { id },
      {
        modelName,
        type,
        manufacturer,
        releaseYear,
        temperatureLimit,
        currentLimit,
        voltageLimit,
      }
    );

    return response.status(200).json({ model });
  } catch (err) {
    console.log(err);
    return response
      .status(500)
      .json({ message: "Error while trying to update items" });
  }
},

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