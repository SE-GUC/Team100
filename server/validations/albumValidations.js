const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      title: Joi.string().required(),
      description: Joi.string(),
      photo: Joi.array()
    };
    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      title: Joi.string(),
      description: Joi.string(),
      photo: Joi.array()
    };

    return Joi.validate(request, updateSchema);
  }
};
