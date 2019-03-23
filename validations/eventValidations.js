const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      name_event: Joi.string().required(),
      club: Joi.string().required(),
      year: Joi.number().required(),
      month: Joi.number().required(),
      day: Joi.number().required(),
      photo: Joi.string(),
      location: Joi.string(),
      description: Joi.string().default("coming soon"),
      rating: Joi.number(),
      committee: Joi.string(),
      rating: Joi.number(),
      ratingcount: Joi.number(),
      rate: Joi.number()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      name_event: Joi.string(),
      club: Joi.string(),
      year: Joi.number(),
      month: Joi.number(),
      day: Joi.number(),
      photo: Joi.string(),
      location: Joi.string(),
      description: Joi.string().default("coming soon"),
      rating: Joi.number(),
      committee: Joi.string(),
      rating: Joi.number(),
      ratingcount: Joi.number(),
      rate: Joi.number()
    };

    return Joi.validate(request, updateSchema);
  }
};
