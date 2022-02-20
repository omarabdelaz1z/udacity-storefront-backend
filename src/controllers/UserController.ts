import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../utils/log/logger";
import { addUser, findUsers, findUserById } from "../models/User";

export const addUserHandler = async (req: Request, res: Response) => {
  const { firstName, lastName, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 14);

    const response = await addUser({
      firstName,
      lastName,
      password: hashedPassword,
    });

    if (response?.error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);

    const token = jwt.sign(response, process.env.JWT_ACCESS);

    return res.status(StatusCodes.CREATED).json({ ...response.data, token });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        message: err,
      },
    });
  }
};

export const findUsersHandler = async (_: Request, res: Response) => {
  try {
    const response = await findUsers();

    return res.status(StatusCodes.OK).json(response);
  } catch (err) {
    logger.error(`Unexpected behavior:  ${err}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`Unexpected Behavior: ${err}`);
  }
};

export const findUsersByIdHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const response = await findUserById(id);

    return res.status(StatusCodes.OK).json(response);
  } catch (err) {
    logger.error(`Unexpected behavior:  ${err}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`Unexpected Behavior: ${err}`);
  }
};
