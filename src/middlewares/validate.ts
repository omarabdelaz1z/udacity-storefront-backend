import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ValidationError } from "joi";
import { VALIDATE_OPTIONS } from "../utils/validation/constants";
import { productSchema, userSchema } from "../utils/validation/schemas";
import { prettifyJoiError } from "../utils/general";
import { JoiValidationError } from "../types/interfaces";
import logger from "../utils/log/logger";

export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userSchema.validateAsync(req.body, VALIDATE_OPTIONS);
    logger.info(`user data is validated correctly.`);
    return next();
  } catch (e) {
    logger.info(`Error while validating UserSchema ${req.body}`);

    if (e instanceof ValidationError) {
      const validationError: JoiValidationError[] = prettifyJoiError(e);
      return res.status(StatusCodes.BAD_REQUEST).json(validationError);
    }
    return res.status(StatusCodes.BAD_REQUEST).send(e);
  }
};

export const validateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await productSchema.validateAsync(req.body, VALIDATE_OPTIONS);
    logger.info(`Product Data is validated Correctly`);
    return next();
  } catch (e) {
    logger.info(`Error while validating ProductSchema ${req.body}`);

    if (e instanceof ValidationError) {
      const validationError: JoiValidationError[] = prettifyJoiError(e);
      return res.status(StatusCodes.BAD_REQUEST).json(validationError);
    }
    return res.status(StatusCodes.BAD_REQUEST).send(e);
  }
};

export const validateOrderParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (typeof req.query?.userId === "undefined") {
    logger.error("UserId is not supplied in the query params");

    return res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        message:
          "Please provide userId as it is not supplied in the query params.",
      },
    });
  }

  if (typeof req.query?.status !== "undefined") {
    const { status } = req.query;

    if (status !== "COMPLETE" && status !== "ACTIVE") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: {
          message:
            "If you provided the status; it should be either 'ACTIVE' or 'COMPLETE'.",
        },
      });
    }
    return next();
  }
  return next();
};

export const validateUserOrdersParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (typeof req.params?.id === "undefined") {
    logger.error("UserId is not supplied in the query params");

    return res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        message:
          "Please provide userId as it is not supplied in the query params.",
      },
    });
  }

  if (typeof req.query?.status !== "undefined") {
    const { status } = req.query;

    if (status !== "COMPLETE" && status !== "ACTIVE") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: {
          message:
            "If you provided the status; it should be either 'ACTIVE' or 'COMPLETE'.",
        },
      });
    }
    return next();
  }
  return next();
};

export const validateProductParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (typeof req.params?.id === "undefined" || isNaN(Number(req.params?.id))) {
    logger.error("please provide a valid product id");
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        message:
          "Please provide 'id' of the product as it is not supplied in the query params.",
      },
    });
  }
  return next();
};

export const validateUserParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (typeof req.params?.id === "undefined" || isNaN(Number(req.params?.id))) {
    logger.error("please supply a valid userId");
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        message:
          "Please provide 'id' of the user as it is not supplied in the query params.",
      },
    });
  }
  return next();
};
