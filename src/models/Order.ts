import { DatabaseResponse } from "../types/interfaces";
import pool from "../utils/database";
import logger from "../utils/log/logger";

export type OrderStatus = "ACTIVE" | "COMPLETE";

export interface OrderResponse extends DatabaseResponse {
  items?: {
    id: number;
    userId: number;
    productId: number;
    productName: string;
    quantity: number;
    status: OrderStatus;
  }[];
}

export const findOrdersByUserId = async (
  id: number,
  status: OrderStatus | null
): Promise<OrderResponse> => {
  try {
    const client = await pool.connect();

    const resultSet = await client.query(
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

    client.release();

    return { items: resultSet.rows };
  } catch (err) {
    logger.error(`Error while fetching orders data due to ${err}`);

    return {
      error: {
        message: `Error while fetching orders data due to ${err}`,
      },
    };
  }
};
