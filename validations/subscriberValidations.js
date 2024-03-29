const Joi = require("joi")

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string().required(),
      email: Joi.string().required()
    }

    return Joi.validate(request, createSchema)
  },
  updateValidation: request => {
    const updateSchema = {
      name: Joi.string(),
      email: Joi.string()
    }

    return Joi.validate(request, updateSchema)
  }
}
