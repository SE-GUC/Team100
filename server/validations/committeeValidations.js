const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string()
        .min(2)
        .max(500)
        .required(),
      description: Joi.string()
        .min(3)
        .max(100)
        .required(),
      page: Joi.string()
        .max(3000)
        .required(),
      events: Joi.array(),
      team_members: Joi.array().required()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      name: Joi.string()
        .min(2)
        .max(500),
      description: Joi.string()
        .min(3)
        .max(100),
      page: Joi.string()
        .min(50)
        .max(3000),
      events: Joi.array(),
      team_members: Joi.array()
    };

    return Joi.validate(request, updateSchema);
  }
};
