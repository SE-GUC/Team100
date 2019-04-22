const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      sender: Joi.string()
        .min(11)
        .required(),
      committee: Joi.string().required(),
      text: Joi.string().required(),
      replied: Joi.string().required(),
      time: Joi.date()
    };
    return Joi.validate(request, createSchema);
  }
};
