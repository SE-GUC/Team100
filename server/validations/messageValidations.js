const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      sender: Joi.string()
        .min(4)
        .required(),
      committee: Joi.string().required(),
      text: Joi.string().required(),
      replied: Joi.boolean(),
      time: Joi.date()
    };
    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const createSchema = {
      replied: Joi.boolean()
        .required()
        .default(false)
    };
    return Joi.validate(request, createSchema);
  }
};
