const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      question: Joi.string()
        .min(1)
        .max(3000)
        .required(),
      answer: Joi.string()
        .min(1)
        .max(3000)
        .required()
    };
    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      question: Joi.string()
        .min(1)
        .max(3000),
      answer: Joi.string()
        .min(1)
        .max(3000)
    };
    return Joi.validate(request, updateSchema);
  }
};
