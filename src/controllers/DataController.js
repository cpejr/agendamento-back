const Data = require("../models/dataSchema");
const uuid = require("uuid");

module.exports = {
  async create(request, response) {
    try {
      const { id_equipament, temperature, voltage, current } = request.body;
      const id = uuid.v1();
      const data = await Data.create({
        id,
        id_equipament,
        temperature,
        voltage,
        current,
      });

      return response.status(200).json({ data });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification:
            "Internal server error while trying to register the new data",
        });
    }
  },

  async index(request, response) {
    try {
      const data = await Data.scan().exec();

      return response.status(200).json({ data });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to find the data",
        });
    }
  },

  async find_id(request, response) {
    try {
      const data = await Data.get(request.params.id);

      return response.status(200).json({ data });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to find the data",
        });
    }
  },

  async find_id_equipament(request, response) {
    try {
      const { id_equipament } = request.params;
      const data = await Data.scan({ id_equipament: id_equipament }).exec();
      return response.status(200).json({ data });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to find the data",
        });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const { id_equipament, temperature, voltage, current } = request.body;

      const data = await Data.update(
        { id },
        {
          id_equipament,
          temperature,
          voltage,
          current,
        }
      );

      return response.status(200).json({ data });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to update the data",
        });
    }
  },

  async delete(request, response) {
    try {
      const data = await Data.delete(request.params.id);

      return response
        .status(200)
        .json({ notification: "Successfully deleted item" });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to delete the data",
        });
    }
  },
};
