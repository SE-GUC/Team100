const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string().required(),
      birthdate: Joi.date().required(),
      email: Joi.string()
        .email()
        .required(),
      major: Joi.string().required(),
      telephone_number: Joi.number().required(),
      Year_of_Study: Joi.number().required(),
      Means_of_Transportation: Joi.string().required(),
      Council_Office1: Joi.string().required(),
      Council_Office2: Joi.string(),
      Previous_Experience: Joi.string()
    };

    return Joi.validate(request, createSchema);
  }
};

