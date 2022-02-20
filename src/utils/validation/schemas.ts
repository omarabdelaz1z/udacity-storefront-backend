import Joi from "joi";
import {
  MAX_LENGTH,
  MIN_LENGTH,
  POSITIVE_VALUE,
  REQUIRED_FIELD,
} from "./constants";

export const userSchema = Joi.object({
  firstName: Joi.string().min(2).max(20).required().label("First Name"),
  lastName: Joi.string().min(2).max(20).required().label("Last Name"),
  password: Joi.string().required().label("Password"),
}).messages({
  "any.required": REQUIRED_FIELD,
  "string.min": MIN_LENGTH,
  "string.max": MAX_LENGTH,
});

export const productSchema = Joi.object({
  name: Joi.string().max(20).required().label("Product Name"),
  price: Joi.number()
    .positive()
    .message(POSITIVE_VALUE)
    .required()
    .label("Product Price"),
  category: Joi.string().optional().label("Product Category"),
}).messages({
  "any.required": REQUIRED_FIELD,
  "string.min": MIN_LENGTH,
  "string.max": MAX_LENGTH,
});
