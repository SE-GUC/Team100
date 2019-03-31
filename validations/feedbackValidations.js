const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      text: Joi.string().required(),
      event: Joi.string()
        .hex()
        .required(),
      user: Joi.string().hex(),
      anonymous: Joi.boolean()
    };
    return Joi.validate(request, createSchema);
  }
};
