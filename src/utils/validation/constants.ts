import { ValidationOptions } from "joi";

export const REQUIRED_FIELD = "{{#label}} must be provided";
export const MAX_LENGTH = "{{#label}} must have at most {#limit} characters";
export const POSITIVE_VALUE = "{{#label}} must be greater than zero";
export const MIN_LENGTH = "{{#label}} must have at least {#limit} characters";

export const VALIDATE_OPTIONS: ValidationOptions = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
