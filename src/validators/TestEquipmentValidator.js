const { Segments, Joi } = require('celebrate');

let testTemperatureValidate = new Object();

testTemperatureValidate.createTestEquipment = {
    [Segments.BODY]: Joi.object().keys({
        temparature: Joi.number().required(),
    })
}

module.exports = testTemperatureValidate;  