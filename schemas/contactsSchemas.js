import Joi from "joi";
import { phoneRegexp } from "../constants/regexp.js";

export const createContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required and cannot be empty",
    "any.required": "Name field is required",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required and cannot be empty",
    "string.email": "Email must be a valid email address",
    "any.required": "Email field is required",
  }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "string.empty": "Phone is required and cannot be empty",
    "string.pattern.base": "Phone must be in format XXX XXX XX XX",
    "any.required": "Phone field is required",
  }),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().messages({
    "string.empty": "Name cannot be empty",
  }),
  email: Joi.string().email().messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email",
  }),
  phone: Joi.string().pattern(phoneRegexp).messages({
    "string.empty": "Phone cannot be empty",
    "string.pattern.base": "Phone must be in format XXX XXX XX XX",
  }),
  favorite: Joi.boolean(),
})
  .min(1)
  .messages({
    "object.min": "Body must have at least one field",
  });

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Favorite field is required",
  }),
});
