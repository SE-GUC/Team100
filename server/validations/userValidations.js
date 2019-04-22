const Joi = require('joi')

module.exports = {
    updateValidation: request => {
        const updateSchema = {
            name: Joi.string().min(3).max(500),
            email: Joi.string().min(5).max(100),
            birth_date: Joi.date(),
            password: Joi.string().min(8),
            major: Joi.string(),
            telephone: Joi.number(),
            photo: Joi.string(),
            gucian: Joi.boolean(),
        }
        return Joi.validate(request, updateSchema)
    },

    updateUserValidation: request => {
        const updateSchema = {
            club: Joi.string(),
            committee_type: Joi.string(),
            control: Joi.boolean(),
            user_type: Joi.string()
        }
        return Joi.validate(request, updateSchema)
    },

    registerValidation: request => {
        const registerSchema = {
            name: Joi.string().min(3).max(500),
            email: Joi.string().min(5).max(100),
            birth_date: Joi.date(),
            password: Joi.string().min(3),
            major: Joi.string(),
            telephone: Joi.number(),
            photo: Joi.string(),
            gucian: Joi.boolean(),
            club: Joi.string(),
            committee_type: Joi.string(),
            control: Joi.boolean(),
            user_type: Joi.string()
        }

        return Joi.validate(request, registerSchema)
    },

    loginValidation: request => {
        const loginSchema = {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
        return Joi.validate(request, loginSchema)
    }

}