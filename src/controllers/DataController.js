const Data = require('../models/dataSchema');
const uuid = require("uuid");


module.exports = {
    async create(request, response) {
        try{
            const {  id_equipament, temperature, voltage, current } = request.body;
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
            return response.status(500).json({ notification: "Internal server error while trying to register the new data" });
        }
    },

    async index(request, response) {
        try{
            const data = await Data.scan().exec();

            return response.status(200).json({ data });
        } catch (err) {
            console.log(err);
            return response.status(500).json({ notification: "Internal server error while trying to find the data" });
        }
    },

    async find_id(request, response) {
        try{
            const data = await Data.get(request.params.id);

            return response.status(200).json({ data });
        } catch (err) {
            console.log(err);
            return response.status(500).json({ notification: "Internal server error while trying to find the data" });
        }
    },

    async find_id_equipament(request, response) {
        try{
            const id_equipament = request.params.id_equipament;
            console.log(id_equipament);
            const data = await Data.query("id_equipament").contains(id_equipament).exec();
            return response.status(200).json({ data });
        } catch (err) {
            console.log(err);
            return response.status(500).json({ notification: "Internal server error while trying to find the data" });
        }
    },

};
