import { StatusCodes } from "http-status-codes";
import { ListModelResponse, ModelResponse, User } from "../types/interfaces";
import pool from "../utils/database";
import logger from "../utils/log/logger";

export const findUsers = async (): Promise<
  ListModelResponse<Partial<User>>
> => {
  try {
    const resultSet = await pool.query(
      'SELECT id, first_name "firstName", last_name "lastName" FROM users'
    );

    return { items: resultSet.rows };
  } catch (err) {
    logger.error(`Error while fetching users data due to ${err}`);
    return {
      error: {
        message: `Couldn't fetch users due to ${err}`,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    };
  }
};

export const findUserById = async (
  id: number
): Promise<ModelResponse<Partial<User>>> => {
  try {
    const resultSet = await pool.query(
      'SELECT id, first_name "firstName", last_name "lastName" FROM users WHERE id = $1',
      [id]
    );

    if (typeof resultSet.rows[0] === "undefined") {
      return {
        error: {
          message: `User with id: ${id} is not found.`,
          status: StatusCodes.NOT_FOUND,
        },
      };
    }

    return { data: resultSet.rows[0] };
  } catch (err) {
    logger.error(
      `Error while fetching user's data with id [${id}] due to ${err}`
    );

    return {
      error: {
        message: `Couldn't fetch user with id: ${id} due to ${err}`,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    };
  }
};

export const addUser = async (
  user: Partial<User>
): Promise<ModelResponse<Partial<User>>> => {
  try {
    const resultSet = await pool.query(
      "INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING id;",
      [user.firstName, user.lastName, user.password]
    );

    return {
      data: {
        id: resultSet.rows[0].id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  } catch (err) {
    logger.error(
      `Error while inserting user's data into database due to ${err}`
    );

    return {
      error: {
        message: `Couldn't insert user due to ${err}`,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    };
  }
};
