import bcrypt from "bcrypt";
import { sign, SignOptions } from "jsonwebtoken";
import { ValidationError } from "joi";
import { JoiValidationError, JwtPayload } from "../types/interfaces";

export const prettifyJoiError = (
  error: ValidationError
): JoiValidationError[] => {
  if (typeof error === "undefined") return [];

  return error.details.map(({ message, context: { key, value, label } }) => {
    return { key, label, message, value };
  });
};

export const hashPassword = async (password: string, salt: number) => {
  return bcrypt.hash(password, salt);
};

export const generateToken = (
  payload: JwtPayload,
  JWT_ACCESS: string,
  options?: SignOptions
) => {
  if (typeof options !== "undefined") return sign(payload, JWT_ACCESS, options);
  return sign(payload, JWT_ACCESS);
};
