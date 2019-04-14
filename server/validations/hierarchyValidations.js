const Joi = require("joi");

module.exports = {
 createValidation: request => {
   const createSchema = {
     position: Joi.string().required(),
     office: Joi.string(),
     name: Joi.string(),
     major: Joi.string(),
   experience: Joi.string(),
   photo: Joi.string()
   };
   return Joi.validate(request, createSchema);
 },
 updateValidation: request => {
   const updateSchema = {
       position: Joi.string().required(),
       office: Joi.string(),
       name: Joi.string(),
       major: Joi.string(),
     experience: Joi.string(),
     photo: Joi.string()
   }

   return Joi.validate(request, updateSchema)
 }
};
