import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import logger from "../utils/log/logger";

export const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const [, token] = authHeader?.split(" ");
    jwt.verify(token, process.env.JWT_ACCESS);

    logger.info("Authorized Access");

    return next();
  } catch (error) {
    logger.error("Unauthorized Access");
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: {
        message:
          "Unauthorized Access: Token is required in the authorization headers: Bearer <token>",
      },
    });
  }
};
