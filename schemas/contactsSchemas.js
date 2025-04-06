import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "name should be a text",
    "string.min": "name should be at least {#limit} characters long",
    "string.max": "name should not be more than {#limit} characters long",
    "any.required": "name is a required field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "email should be a text",
    "string.email": "enter a valid email",
    "any.required": "email is a required field",
  }),
  phone: Joi.string()
    .pattern(/^\d{3}-\d{3}-\d{4}$/)
    .required()
    .messages({
      "string.base": "phone should be a text",
      "string.pattern.base": "phone must be in format XXX-XXX-XXXX",
      "any.required": "phone is a required field",
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().messages({
    "string.base": "name should be a text",
  }),
  email: Joi.string().email().messages({
    "string.base": "email should be a text",
    "string.email": "email must be a valid email",
  }),
  phone: Joi.string()
    .pattern(/^\d{3}-\d{3}-\d{4}$/)
    .messages({
      "string.base": "phone should be a text",
      "string.pattern.base": "phone must be in format XXX-XXX-XXXX",
    }),
})
  .min(1)
  .messages({
    "object.min": "Body must have at least one field",
  });
