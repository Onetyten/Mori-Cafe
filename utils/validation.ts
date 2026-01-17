import Joi from "joi";

export const OrderSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.base": "Your name must be a text value",
    "string.empty": "Please enter your name",
    "string.min": "Name must be at least 3 characters long",
    "any.required": "Please enter your name",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Your email must be a text value",
      "string.email": "Your email must be a valid email address",
      "string.empty": "Please enter your email address",
      "any.required": "Please enter your email address",
    }),
  address: Joi.string().required().messages({
    "string.base": "Your address must be a text value",
    "string.empty": "Your address is required to complete this order",
    "any.required": "Your address is required to complete this order",
  }),
  phone_number: Joi.string()
    .pattern(/^[+0-9]{7,15}$/)
    .required()
    .messages({
      "string.base": "Your phone number must be a text value",
      "string.empty": "Please enter your phone number",
      "string.pattern.base": "Your phone number must contain only digits",
      "any.required": "Please enter your phone number",
    }),
  items: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string(),
        quantity: Joi.number().integer(),
        totalPrice: Joi.number().integer(),
        foodId: Joi.object({
          name: Joi.string(),
          imageUrl: Joi.string(),
        }).unknown(true),
      }),
    )
    .optional()
    .error(
      () => new Error("Looks like we have an invalid order, plese try again"),
    ),
});
