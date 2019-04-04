const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      Academic_paper: Joi.string()
        .min(10)
        .max(500)
        .required(),
      Resolution: Joi.string()
        .min(10)
        .max(500)
        .required(),
      Year: Joi.number()
        .min(5)
        .max(3000)
        .required()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      Academic_paper: Joi.string()
        .min(10)
        .max(500),
      Resolution: Joi.string()
        .min(10)
        .max(500),
      Year: Joi.number()
        .min(5)
        .max(3000)
    };

    return Joi.validate(request, updateSchema);
  }
};
