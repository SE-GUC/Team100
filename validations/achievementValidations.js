const Joi = require("joi")

module.exports = {
  createValidation: request => {
    const createSchema = {
      description: Joi.string()
        .min(3)
        .max(500)
        .required(),
      photo: Joi.string()
        .min(3)
        .max(100),
      tag: Joi.string()
        .min(1)
        .max(3000)
    }

    return Joi.validate(request, createSchema)
  },
  updateValidation: request => {
    const updateSchema = {
      description: Joi.string()
        .min(3)
        .max(500),
      photo: Joi.string()
        .min(3)
        .max(100),
      tag: Joi.string()
        .min(1)
        .max(3000)
    }

    return Joi.validate(request, updateSchema)
  }
}
