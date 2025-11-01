import Joi from 'joi';

export const OrderSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.base': 'Name must be a text value',
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 3 characters long',
      'any.required': 'Name is required'
    }),
  email: Joi.string().email({tlds:{allow:false}}).required()
    .messages({
      'string.base': 'Email must be a text value',
      'string.email': 'Email must be a valid email address',
      'string.empty': 'Email is required',
      'any.required': 'Email is required'
    }),
  address: Joi.string()
    .required()
    .messages({
      'string.base': 'Address must be a text value',
      'string.empty': 'Address is required',
      'any.required': 'Address is required'
    }),
  phone_number: Joi.string()
    .pattern(/^[+0-9]{7,15}$/)
    .required()
    .messages({
      'string.base': 'Phone number must be a text value',
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Phone number must contain only digits and may start with +',
      'any.required': 'Phone number is required'
    }),
    items: Joi.array()
      .items(
        Joi.object({
          _id: Joi.string(),
          quantity: Joi.number().integer(),
          totalPrice: Joi.number().integer(),
          foodId: Joi.object({
            name: Joi.string(),
            imageUrl: Joi.string()
          }).unknown(true)
        })
      )
      .required()
      .error(() => new Error('Malformed order'))

});