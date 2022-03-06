import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { findOrdersByUserId } from "../models/Order";
import { OrderStatus } from "../types/interfaces";
import logger from "../utils/log/logger";

export const findOrdersByUserIdHandler = async (
  req: Request,
  res: Response
) => {
  const userId = Number(req.query.userId) || Number(req.params.id);

  const status: OrderStatus = req.query.status
    ? (req.query.status as OrderStatus)
    : undefined;

  try {
    const response = await findOrdersByUserId(userId, status);

    return res
      .status(response?.error ? response.error.status : StatusCodes.OK)
      .json(response);
      
  } catch (err) {
    logger.error(`Unexpected behavior:  ${err}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`Unexpected Behavior: ${err}`);
  }
};
