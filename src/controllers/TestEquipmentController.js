const TestTemperature = require("../models/modelTestEquipment");

module.exports = {
    async create(request, response) {
        try {
            const {
                temperature
            } = request.body;

            const testEquipment = await TestTemperature.create({
                id_equipment,
                temperature
            });
            return response.status(200).json({ notification: "Test equipment created!" });

        } catch (err) {
            if (err.message)
                return response.status(400).json({ notification: err.message });

            console.log("Test equipment creation failed: " + err);
            return response.status(500).json({
                notification: "Internal server error while trying to register the test equipment",
            });
        }
    },

    // Buscar todos os clientes
    async index(request, response) {
        try {
            const testEquipment = await TestTemperature.scan().exec();

            return response.status(200).json({ testEquipment });
        } catch (err) {
            console.log(err);
            return response
                .status(500)
                .json({ message: "Error while trying to show the test equipments" });
        }
    },
}