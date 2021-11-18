import * as Joi from '@hapi/joi';

export default {
    login: {
        payload: {
            email: Joi.string()
                .email()
                .required()
                .messages({
                    'string.empty': 'Email can not be empty',
                    'any.required': 'Email can not be empty',
                }),
            password: Joi.string()
                .required()
                .messages({
                    'string.empty': 'Password can not be empty',
                    'any.required': 'Password can not be empty',
                }),
        },
    },
    resetPassword: {
        payload: {
            resetPasswordToken: Joi.string()
                .required()
                .messages({
                    'string.empty': 'Reset password token can not be empty',
                    'any.required': 'Reset password token can not be empty',
                }),
            password: Joi.string()
                .required()
                .messages({
                    'string.empty': 'Password can not be empty',
                    'any.required': 'Password can not be empty',
                }),
            confirmedPassword: Joi.any()
                .valid(Joi.ref('password'))
                .required()
                .messages({
                    'string.empty': 'Password confirmation can not be empty',
                    'any.required': 'Password confirmation can not be empty',
                    'any.only': 'Password confirmation does not match',
                }),
        },
    },
    updatePassword: {
        payload: {
            password: Joi.string()
                .required()
                .messages({
                    'string.empty': 'Password can not be empty',
                    'any.required': 'Password can not be empty',
                }),
            confirmedPassword: Joi.any()
                .valid(Joi.ref('password'))
                .required()
                .messages({
                    'string.empty': 'Password confirmation can not be empty',
                    'any.required': 'Password confirmation can not be empty',
                    'any.only': 'Password confirmation does not match',
                }),
        },
    },
    forgotPassword: {
        payload: {
            email: Joi.string()
                .email()
                .required()
                .messages({
                    'string.empty': 'Email can not be empty',
                    'any.required': 'Email can not be empty',
                }),
        },
    },
};
