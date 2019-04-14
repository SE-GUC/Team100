const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      description: Joi.string().required(),
      date: Joi.date(),
      title: Joi.string().required(),
      created_by: Joi.string().required(),
      videos: Joi.string(),
      photos: Joi.string()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      description: Joi.string(),
      date: Joi.date(),
      title: Joi.string(),
      created_by: Joi.string(),
      videos: Joi.string(),
      photos: Joi.string()
    };

    return Joi.validate(request, updateSchema);
  }
};
