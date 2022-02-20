import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { findOrdersByUserId } from "../models/Order";
import logger from "../utils/log/logger";

export const findOrdersByUserIdHandler = async (
  req: Request,
  res: Response
) => {
  const userId = Number(req.query.userId) || Number(req.params.id);

  try {
    const response = await findOrdersByUserId(userId);

    if (response?.error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response.error);

    return res.status(StatusCodes.OK).json(response);
  } catch (err) {
    logger.error(`Unexpected behavior:  ${err}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`Unexpected Behavior: ${err}`);
  }
};
