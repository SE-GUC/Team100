const Joi = require("joi")

module.exports = {
  createValidation: request => {
    const createSchema = {
      mission: Joi.string()
        .min(3)
        .max(5000)
        .required(),
      vision: Joi.string()
        .min(3)
        .max(5000)
        .required(),
      description: Joi.string()
        .min(1)
        .max(5000)
        .required(),
      logo: Joi.string()
        .min(1)
        .max(1000)
        .required()
    }
    return Joi.validate(request, createSchema)
  },
  updateValidation: request => {
    const createSchema = {
      mission: Joi.string()
        .min(3)
        .max(5000),
      vision: Joi.string()
        .min(3)
        .max(5000),
      description: Joi.string()
        .min(1)
        .max(5000),
      logo: Joi.string()
        .min(1)
        .max(1000)
    }
    return Joi.validate(request, createSchema)
  }
}
