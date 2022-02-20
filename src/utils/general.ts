import { ValidationError } from "joi";
import { JoiValidationError } from "../types/interfaces";

export const prettifyJoiError = (
  error: ValidationError
): JoiValidationError[] => {
  if (typeof error === "undefined") return [];

  return error.details.map(({ message, context: { key, value, label } }) => {
    return { key, label, message, value };
  });
};
