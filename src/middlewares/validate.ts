import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
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
  const validation = await userSchema.validateAsync(req.body, VALIDATE_OPTIONS);

  const validationError: JoiValidationError[] = prettifyJoiError(
    validation?.error
  );

  if (validationError.length !== 0) {
    logger.info(`user info is invalid.`);
    return res.status(StatusCodes.BAD_REQUEST).json(validationError);
  }

  logger.info(`user data is validated correctly.`);
  return next();
};

export const validateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validation = await productSchema.validateAsync(req.body, VALIDATE_OPTIONS);

  const validationError: JoiValidationError[] = prettifyJoiError(
    validation?.error
  );

  if (validationError.length !== 0) {
    logger.info(`user info is invalid.`);
    return res.status(StatusCodes.BAD_REQUEST).json(validationError);
  }

  logger.info(`user data is validated correctly.`);
  return next();
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
  if (typeof req.params?.id === "undefined") {
    logger.error("ProductId is not supplied in the query params");
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
  if (typeof req.params?.id === "undefined") {
    logger.error("UserId is not supplied in the query params");
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        message:
          "Please provide 'id' of the user as it is not supplied in the query params.",
      },
    });
  }
  return next();
};
