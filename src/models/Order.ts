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
  status: OrderStatus = "COMPLETE"
): Promise<OrderResponse> => {
  try {
    const client = await pool.connect();
    
    const resultSet = await client.query(
      `SELECT o.id id, o.product_id "productId", p.name "productName", o.quantity quantity,
        o.user_id "userId", o.status status
      FROM orders o INNER JOIN products p ON o.product_id = p.id 
      INNER JOIN users u ON u.id = o.user_id
      WHERE o.user_id = $1 AND o.status = $2;`,
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
