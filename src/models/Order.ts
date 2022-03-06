import { StatusCodes } from "http-status-codes";
import { OrderResponse, OrderStatus } from "../types/interfaces";
import pool from "../utils/database";
import logger from "../utils/log/logger";

export const findOrdersByUserId = async (
  id: number,
  status: OrderStatus | null
): Promise<OrderResponse> => {
  try {
    const resultSet = await pool.query(
      `
      SELECT O.ID ID,
          O.PRODUCT_ID "productId",
          P.NAME "productName",
          O.QUANTITY QUANTITY,
          O.USER_ID "userId",
          O.STATUS STATUS
      FROM ORDERS O
          INNER JOIN PRODUCTS P ON O.PRODUCT_ID = P.ID
          INNER JOIN USERS U ON U.ID = O.USER_ID
      WHERE O.USER_ID = $1 AND O.STATUS = COALESCE($2, O.STATUS)`,
      [id, status]
    );

    return { items: resultSet.rows };
  } catch (err) {
    logger.error(`Error while fetching orders data due to ${err}`);

    return {
      error: {
        message: `Couldn't fetch ${status} orders with id ${id} orders data due to ${err}`,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    };
  }
};
