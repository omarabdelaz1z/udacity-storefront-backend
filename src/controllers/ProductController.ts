import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { addProduct, findProductById, findProducts } from "../models/Product";
import logger from "../utils/log/logger";

export const addProductHandler = async (req: Request, res: Response) => {
  try {
    const response = await addProduct(req.body);

    const statusCode = response?.error
      ? StatusCodes.INTERNAL_SERVER_ERROR
      : StatusCodes.CREATED;

    return res.status(statusCode).json(response);
  } catch (err) {
    logger.error(`Unexpected behavior:  ${err}`);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        message: err,
      },
    });
  }
};

export const findProductsHandler = async (_: Request, res: Response) => {
  try {
    const response = await findProducts();

    const statusCode = response?.error
      ? StatusCodes.INTERNAL_SERVER_ERROR
      : StatusCodes.CREATED;

    return res.status(statusCode).json(response);
  } catch (err) {
    logger.error(`Unexpected behavior:  ${err}`);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        message: err,
      },
    });
  }
};

export const findProductByIdHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const response = await findProductById(id);

    const statusCode = response?.error
      ? StatusCodes.INTERNAL_SERVER_ERROR
      : StatusCodes.CREATED;

    return res.status(statusCode).json(response);
  } catch (err) {
    logger.error(`Unexpected behavior:  ${err}`);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        message: err,
      },
    });
  }
};
