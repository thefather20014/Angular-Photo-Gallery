const Joi = require('@hapi/joi');

// Register Validation
const updateValidation = (data) => {

    const schema = Joi.object({
        Title: Joi.string().min(3).required(),
        Duration: Joi.number().required(),
        Director: Joi.string().required(),
        Resolution: Joi.string().required(),
        Genre: Joi.string().required(),
        Price: Joi.number().required(),
        Rating: Joi.string().required(),
        Date: Joi.date().required(),
        Description: Joi.string().min(6).required(),
        Stars: Joi.number().required(),
        Country: Joi.string().required(),
        Languague: Joi.string().required()
    });
    return schema.validate(data);
};

module.exports = {updateValidation};