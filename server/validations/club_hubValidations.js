const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string().required(),
      brief_description: Joi.string().required(),
      logo: Joi.string().required(),
      mission:Joi.string(),
      vision:Joi.string()

    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      name: Joi.string(),
      brief_description: Joi.string(),
      logo: Joi.string(),
      mission:Joi.string(),
      vision:Joi.string()
    };

    return Joi.validate(request, updateSchema);
  }
};
