const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      album_ID: Joi.string()
        .min(1)
        .max(500)
        .required(),
      Link: Joi.string()
        .min(9)
        .max(100)
        .required(),
      Description: Joi.string()
        .min(9)
        .max(100)
        .required()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      album_ID: Joi.string()
        .min(1)
        .max(500),
      Link: Joi.string()
        .min(9)
        .max(100),
      Description: Joi.string()
        .min(9)
        .max(100)
        .required()
    };

    return Joi.validate(request, updateSchema);
  }
};
