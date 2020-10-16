const Data = require("../models/dataSchema");
const uuid = require("uuid");

module.exports = {
  async create(request, response) {
    try {
      const { id_equipment, temperature, voltage, current } = request.body;
      const id = uuid.v1();
      const data = await Data.create({
        id,
        id_equipment,
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

  async testCreate(request, response) {
    const id_equipment = "bd23d030-0414-11eb-a5d4-d9a33cd11de3"
    const voltage = 0;
    const current = 0;
    try {
      var { temperature } = request.body;
      if (request.query.temperature) temperature = request.query.temperature;
      const id = uuid.v1();
      const data = await Data.create({
        id,
        id_equipment,
        temperature: Number(temperature),
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

  async find_id_equipment(request, response) {
    try {
      const { id_equipment } = request.params;
      const data = await Data.scan({ id_equipment: id_equipment }).exec();
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
      const { id_equipment, temperature, voltage, current } = request.body;

      const data = await Data.update(
        { id },
        {
          id_equipment,
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
